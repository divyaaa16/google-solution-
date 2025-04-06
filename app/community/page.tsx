"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquare,
  ThumbsUp,
  Award,
  Users,
  PenToolIcon as Tool,
  SproutIcon as Seed,
  Send,
  ImageIcon,
  User,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("tips")
  const [newPostContent, setNewPostContent] = useState("")

  const handleSubmitPost = () => {
    if (!newPostContent.trim()) return
    alert("In a real app, your post would be submitted to the community forum.")
    setNewPostContent("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Community Forum</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Profile" />
                  <AvatarFallback>RS</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-lg">Ramesh Singh</h3>
                  <p className="text-sm text-muted-foreground">Farmer from Nashik</p>
                </div>
              </div>

              <div className="flex justify-between mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-xs text-muted-foreground">Likes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">Badges</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Your Badges</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Award className="h-3 w-3 text-sun-dark" />
                    <span>Helpful Farmer</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Award className="h-3 w-3 text-leaf-dark" />
                    <span>Tomato Expert</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Award className="h-3 w-3 text-sky-dark" />
                    <span>Active Member</span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Share your farming tips, questions, or success stories..."
                  className="min-h-[120px]"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Add Photo
                  </Button>
                  <Button onClick={handleSubmitPost} disabled={!newPostContent.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Members</span>
                  <span className="font-medium">1,245</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Posts This Week</span>
                  <span className="font-medium">328</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Questions Answered</span>
                  <span className="font-medium">892</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Success Stories</span>
                  <span className="font-medium">156</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardContent className="p-0">
              <Tabs defaultValue="tips" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="tips">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Tips
                  </TabsTrigger>
                  <TabsTrigger value="tools">
                    <Tool className="h-4 w-4 mr-2" />
                    Tool Exchange
                  </TabsTrigger>
                  <TabsTrigger value="seeds">
                    <Seed className="h-4 w-4 mr-2" />
                    Seed Sharing
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {activeTab === "tips" && (
              <>
                <ForumPost
                  author="Sunita Patil"
                  location="Pune, Maharashtra"
                  time="2 hours ago"
                  content="I've been using neem oil mixed with a little soap as a natural pesticide for my vegetable garden. It's working great against aphids and whiteflies! Has anyone else tried this?"
                  likes={24}
                  comments={8}
                  avatar="SP"
                />
                <ForumPost
                  author="Vijay Kumar"
                  location="Nagpur, Maharashtra"
                  time="Yesterday"
                  content="Question for wheat farmers: I'm noticing some yellow spots on my wheat leaves. Could this be a fungal infection or nutrient deficiency? Attaching photos for reference."
                  likes={18}
                  comments={12}
                  avatar="VK"
                  image="/placeholder.svg?height=300&width=600"
                />
                <ForumPost
                  author="Anita Sharma"
                  location="Nashik, Maharashtra"
                  time="3 days ago"
                  content="Success story! I increased my tomato yield by 30% this season by using drip irrigation and mulching. Happy to share more details if anyone is interested."
                  likes={56}
                  comments={23}
                  avatar="AS"
                />
              </>
            )}

            {activeTab === "tools" && (
              <>
                <ForumPost
                  author="Rajesh Patel"
                  location="Amravati, Maharashtra"
                  time="1 day ago"
                  content="I have an extra sprayer that I'm not using anymore. It's in good condition. Anyone in the Amravati area interested in borrowing or exchanging for other tools?"
                  likes={12}
                  comments={5}
                  avatar="RP"
                  image="/placeholder.svg?height=300&width=600"
                />
                <ForumPost
                  author="Ganesh Mane"
                  location="Kolhapur, Maharashtra"
                  time="2 days ago"
                  content="Looking to borrow a seed drill for 2-3 days next week. Can offer my rotavator in exchange or pay reasonable rent."
                  likes={8}
                  comments={10}
                  avatar="GM"
                />
                <ForumPost
                  author="Priya Desai"
                  location="Solapur, Maharashtra"
                  time="4 days ago"
                  content="Our farmer group has purchased a mini tractor that members can use on rotation. If you're in Solapur district and interested in joining our group, please comment below."
                  likes={32}
                  comments={18}
                  avatar="PD"
                />
              </>
            )}

            {activeTab === "seeds" && (
              <>
                <ForumPost
                  author="Manoj Jadhav"
                  location="Aurangabad, Maharashtra"
                  time="12 hours ago"
                  content="I have extra okra seeds (local variety) from this season's harvest. They've performed really well in our climate. Happy to share with 5-6 farmers. Let me know if interested."
                  likes={28}
                  comments={15}
                  avatar="MJ"
                />
                <ForumPost
                  author="Lakshmi Patil"
                  location="Satara, Maharashtra"
                  time="3 days ago"
                  content="Looking for drought-resistant wheat varieties for the upcoming season. Anyone have experience with the new HI-1544 variety? Or have seeds to share?"
                  likes={14}
                  comments={7}
                  avatar="LP"
                />
                <ForumPost
                  author="Suresh Kale"
                  location="Jalgaon, Maharashtra"
                  time="5 days ago"
                  content="Seed exchange event happening in Jalgaon on the 15th of this month at the Krishi Vigyan Kendra. Bring your native seeds to exchange with other farmers. Let's preserve our traditional varieties!"
                  likes={42}
                  comments={11}
                  avatar="SK"
                  image="/placeholder.svg?height=300&width=600"
                />
              </>
            )}

            <div className="flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ForumPost({
  author,
  location,
  time,
  content,
  likes,
  comments,
  avatar,
  image,
}: {
  author: string
  location: string
  time: string
  content: string
  likes: number
  comments: number
  avatar: string
  image?: string
}) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar>
            <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={author} />
            <AvatarFallback>{avatar}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-medium">{author}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{location}</span>
                <span>•</span>
                <span>{time}</span>
              </div>
            </div>
            <p className="mt-2">{content}</p>
            {image && (
              <div className="mt-4">
                <img
                  src={image || "/placeholder.svg"}
                  alt="Post attachment"
                  className="rounded-lg w-full max-h-[300px] object-cover"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 ${liked ? "text-primary" : ""}`}
              onClick={handleLike}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{likeCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{comments}</span>
            </Button>
          </div>
          <Button variant="ghost" size="sm">
            Share
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <Input placeholder="Write a comment..." className="flex-1" />
          <Button size="sm" variant="ghost">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

