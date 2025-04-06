import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDGKkw02CCaz13c4pxf_iqFMATm-Lz7IDU";
const MODEL_NAME = "gemini-pro";

const genAI = new GoogleGenerativeAI(API_KEY);

export async function getChatResponse(message: string) {
  try {
    if (!message.trim()) {
      throw new Error("Empty message");
    }

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    const prompt = `You are KisanBot, a farming assistant that helps farmers with agricultural queries. Please provide a helpful response to this farming-related question: ${message}`;

    const result = await model.generateContent(prompt);
    
    if (!result || !result.response) {
      throw new Error("No response from API");
    }

    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Empty response from API");
    }

    return text;
  } catch (error) {
    console.error("Error getting Gemini response:", error);
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return "There seems to be an issue with the API configuration. Please try again later.";
      }
      if (error.message.includes("Empty message")) {
        return "Please enter a question about farming.";
      }
    }
    return "I apologize, but I'm having trouble processing your request right now. Please try again later.";
  }
}
