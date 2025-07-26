"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Moon,
  Sun,
  Download,
  Mail,
  Instagram,
  Github,
  Linkedin,
  Building2,
  Send,
  Code,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true)
  const [currentTitle, setCurrentTitle] = useState("")
  const [titleIndex, setTitleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const titles = ["Full Stack Developer", "Machine Learner"]

  // Typewriter effect
  useEffect(() => {
    const currentFullTitle = titles[titleIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (charIndex < currentFullTitle.length) {
            setCurrentTitle(currentFullTitle.substring(0, charIndex + 1))
            setCharIndex(charIndex + 1)
          } else {
            // Finished typing, wait then start deleting
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          // Deleting
          if (charIndex > 0) {
            setCurrentTitle(currentFullTitle.substring(0, charIndex - 1))
            setCharIndex(charIndex - 1)
          } else {
            // Finished deleting, move to next title
            setIsDeleting(false)
            setTitleIndex((titleIndex + 1) % titles.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    ) // Faster deletion, slower typing

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, titleIndex, titles])

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      document.body.style.backgroundColor = "#000000"
    } else {
      document.documentElement.classList.remove("dark")
      document.body.style.backgroundColor = "#ffffff"
    }
  }, [darkMode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")
    setSubmitSuccess(false)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      // Check if response is ok first
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Check if response is JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON")
      }

      const result = await response.json()

      if (result.success) {
        setSubmitSuccess(true)
        setSubmitMessage(result.message)
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitSuccess(false)
        setSubmitMessage(result.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitSuccess(false)
      setSubmitMessage(
        "Sorry, there was an error sending your message. Please try again or contact me directly at himanimahajan2709@gmail.com",
      )
    }

    setIsSubmitting(false)
    setTimeout(() => setSubmitMessage(""), 10000) // Show message longer
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          background: ${darkMode ? "#000000" : "#ffffff"} !important;
          overflow-x: hidden;
        }
        
        @keyframes fadeInMove {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .typewriter-cursor::after {
          content: '|';
          animation: blink 1s infinite;
          color: #0ea5e9;
          font-weight: normal;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(15px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(14, 165, 233, 0.3); }
          50% { box-shadow: 0 0 40px rgba(14, 165, 233, 0.6); }
        }
        
        .animated-name {
          animation: fadeInMove 2s ease-out forwards;
        }
        
        .glass-effect {
          background: rgba(14, 165, 233, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(14, 165, 233, 0.3);
        }
        
        .glass-card {
          background: ${darkMode ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.8)"};
          backdrop-filter: blur(20px);
          border: 1px solid rgba(14, 165, 233, 0.2);
        }
        
        .glass-card-bright {
          background: rgba(14, 165, 233, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(14, 165, 233, 0.4);
        }
        
        .floating-badge-1 {
          animation: float 3s ease-in-out infinite, glow 2s ease-in-out infinite;
        }
        
        .floating-badge-2 {
          animation: floatReverse 2.5s ease-in-out infinite, glow 2s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        .floating-badge-3 {
          animation: float 3.5s ease-in-out infinite, glow 2s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .hover-lift {
          transition: all 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(14, 165, 233, 0.3);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #0ea5e9, #06b6d4, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .bright-glow {
          box-shadow: 0 0 30px rgba(14, 165, 233, 0.5);
        }
      `}</style>

      {/* Navigation */}
      <nav className="glass-effect fixed top-0 w-full z-50 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-sky-400 text-xl font-bold">{"<>"}</div>
            <span className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>MyPortfolio</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#about"
              className={`hover:text-sky-400 transition-colors duration-300 ${darkMode ? "text-white" : "text-black"}`}
            >
              About
            </Link>
            <Link
              href="#skills"
              className={`hover:text-sky-400 transition-colors duration-300 ${darkMode ? "text-white" : "text-black"}`}
            >
              Skills
            </Link>
            <Link
              href="#projects"
              className={`hover:text-sky-400 transition-colors duration-300 ${darkMode ? "text-white" : "text-black"}`}
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className={`hover:text-sky-400 transition-colors duration-300 ${darkMode ? "text-white" : "text-black"}`}
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)} className="hover-lift">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              className="bg-sky-500 hover:bg-sky-600 text-white hover-lift bright-glow"
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/1TTyrxEYsGVjrOYAOwjEO9nddPo6gLyGi/view?usp=drive_link",
                  "_blank",
                )
              }
            >
              <Download className="h-4 w-4 mr-2" />
              Resume
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-32 mt-16">
        <div className="max-w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
              <span className="animated-name">Hi, I'm </span>
              <span className="gradient-text animated-name">Himani Mahajan</span>
            </h1>
            <h2
              className={`text-2xl sm:text-3xl lg:text-5xl font-bold typewriter-cursor ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              {currentTitle}
            </h2>
            <p className={`text-lg sm:text-xl italic ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              "A learner, a thinker, and a builder"
            </p>
          </div>

          <div className="relative flex-shrink-0">
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-sky-400 hover-lift glass-effect bright-glow">
              <Image
                src="/profile-new.jpg"
                alt="Himani Mahajan"
                width={320}
                height={320}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* Floating animated badges */}
            <Badge className="absolute -top-4 -right-4 bg-sky-500 text-white floating-badge-1 glass-effect">
              React
            </Badge>
            <Badge className="absolute top-20 -left-8 bg-blue-500 text-white floating-badge-2 glass-effect">
              Python
            </Badge>
            <Badge className="absolute -bottom-4 right-8 bg-purple-500 text-white floating-badge-3 glass-effect">
              AI/ML
            </Badge>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-full mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className={`max-w-4xl mx-auto text-base sm:text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              I'm a passionate Computer Engineering student at Thapar Institute with a strong foundation in full-stack
              development and machine learning. I love solving complex problems and building innovative solutions.
            </p>
          </div>

          <Tabs defaultValue="experience" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 glass-effect">
              <TabsTrigger
                value="experience"
                className="data-[state=active]:bg-sky-500 transition-all duration-300 hover-lift"
              >
                Experience
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="data-[state=active]:bg-sky-500 transition-all duration-300 hover-lift"
              >
                Education
              </TabsTrigger>
              <TabsTrigger
                value="interests"
                className="data-[state=active]:bg-sky-500 transition-all duration-300 hover-lift"
              >
                Interests
              </TabsTrigger>
            </TabsList>

            <TabsContent value="experience" className="space-y-6 mt-8 animate-in slide-in-from-left duration-500">
              <div className="grid gap-6">
                <div className="flex flex-col sm:flex-row items-start gap-4 p-6 glass-card rounded-lg hover-lift">
                  <Building2 className="text-sky-400 mt-1 flex-shrink-0" size={24} />
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                      Mentor <span className="gradient-text">IETE SOCIETY</span>
                    </h3>
                    <p className="text-sky-400 mb-2">Graphic Design & Web Development Department | 2024 - Present</p>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Mentor in graphic design department and web development department, guiding students in creative
                      and technical skills.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-4 p-6 glass-card rounded-lg hover-lift">
                  <Building2 className="text-sky-400 mt-1 flex-shrink-0" size={24} />
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                      Core <span className="gradient-text">Member</span>
                    </h3>
                    <p className="text-sky-400 mb-2">Saturnalia Marketing Department | Oct 2024</p>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Core member in marketing department for Saturnalia, contributing to event promotion and brand
                      awareness campaigns.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-4 p-6 glass-card rounded-lg hover-lift">
                  <Building2 className="text-sky-400 mt-1 flex-shrink-0" size={24} />
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                      Contributor <span className="gradient-text">GirlScript Summer Of Code</span>
                    </h3>
                    <p className="text-sky-400 mb-2">Open Source Development | 2024 - Present</p>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Working as contributor in Open Source Development, contributing to various projects and learning
                      collaborative development.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-4 p-6 glass-card rounded-lg hover-lift">
                  <Building2 className="text-sky-400 mt-1 flex-shrink-0" size={24} />
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                      Summer <span className="gradient-text">Intern</span>
                    </h3>
                    <p className="text-sky-400 mb-2">ELC | June - July 2025</p>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Worked on invisible watermarking system using ML/DL techniques. Wrote a research paper documenting
                      the implementation and results.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="education" className="space-y-6 mt-8 animate-in slide-in-from-right duration-500">
              <div className="grid gap-6">
                <div className="flex flex-col sm:flex-row items-start gap-4 p-6 glass-card rounded-lg hover-lift">
                  <Building2 className="text-sky-400 mt-1 flex-shrink-0" size={24} />
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                      Bachelor of Engineering in <span className="gradient-text">Computer Engineering</span>
                    </h3>
                    <p className="text-sky-400 mb-2">
                      Thapar Institute of Engineering and Technology, Patiala | 2023 - 2027 (expected)
                    </p>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Currently pursuing Computer Engineering with CGPA: 8.25. Focus on full-stack development and
                      machine learning.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-4 p-6 glass-card rounded-lg hover-lift">
                  <Building2 className="text-sky-400 mt-1 flex-shrink-0" size={24} />
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                      Higher Secondary <span className="gradient-text">Education</span>
                    </h3>
                    <p className="text-sky-400 mb-2">Sri Aurobindo International School, Patiala | 2022 - 2023</p>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Completed Higher Secondary Education with 88.4% marks, building strong foundation in science and
                      mathematics.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-4 p-6 glass-card rounded-lg hover-lift">
                  <Building2 className="text-sky-400 mt-1 flex-shrink-0" size={24} />
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                      Secondary <span className="gradient-text">Education</span>
                    </h3>
                    <p className="text-sky-400 mb-2">Sri Aurobindo International School, Patiala | 2020 - 2021</p>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Completed Secondary Education with 90.4% marks, demonstrating consistent academic excellence.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interests" className="mt-8 animate-in slide-in-from-bottom duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 glass-card p-6 rounded-lg hover-lift">
                  <h3 className="text-xl font-bold gradient-text">Technical Interests</h3>
                  <ul className={`space-y-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <li>• Problem Solving & Competitive Programming</li>
                    <li>• Data Structures & Algorithms in C++</li>
                    <li>• Full Stack Web Development</li>
                    <li>• Machine Learning & AI</li>
                    <li>• UI/UX Design</li>
                  </ul>
                </div>
                <div className="space-y-4 glass-card p-6 rounded-lg hover-lift">
                  <h3 className="text-xl font-bold gradient-text">Creative Pursuits</h3>
                  <ul className={`space-y-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <li>• Graphic Design</li>
                    <li>• Digital Marketing</li>
                    <li>• Event Management</li>
                    <li>• Research & Technical Writing</li>
                    <li>• Open Source Contribution</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-full mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Featured Projects</h2>
            <p className={`max-w-4xl mx-auto text-base sm:text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              A selection of my recent work showcasing my skills in full stack development, AI/ML, and problem-solving.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* AQI Prediction App */}
            <Card className="glass-card overflow-hidden hover-lift">
              <div className="h-48 bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-xl font-bold">AQI PREDICTION</h3>
                  <p className="text-sm opacity-80">Air Quality Insights</p>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                  AQI Prediction App
                </h3>
                <p className={`mb-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Machine learning application that predicts Air Quality Index using environmental data and weather
                  parameters for better health awareness.
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full glass-effect hover-lift bg-transparent"
                    onClick={() => window.open("https://github.com/HimaniMahajan27/AQI-Prediction-App", "_blank")}
                  >
                    <Code className="h-4 w-4 mr-1" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Real Time Tracker */}
            <Card className="glass-card overflow-hidden hover-lift">
              <div className="h-48 bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-xl font-bold">REAL TIME TRACKER</h3>
                  <p className="text-sm opacity-80">Live Location Tracking</p>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                  Real Time Tracker
                </h3>
                <p className={`mb-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Real-time location tracking application with live updates, geofencing capabilities, and interactive
                  maps for monitoring and navigation.
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full glass-effect hover-lift bg-transparent"
                    onClick={() => window.open("https://github.com/HimaniMahajan27/real-time-tracker", "_blank")}
                  >
                    <Code className="h-4 w-4 mr-1" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Drowsiness Detection */}
            <Card className="glass-card overflow-hidden hover-lift">
              <div className="h-48 bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-xl font-bold">DROWSINESS DETECTION</h3>
                  <p className="text-sm opacity-80">Stay Alert, Stay Safe</p>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                  Drowsiness Detection System
                </h3>
                <p className={`mb-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Computer vision system using OpenCV to detect driver drowsiness through eye aspect ratio monitoring
                  and alert mechanisms for road safety.
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full glass-effect hover-lift bg-transparent"
                    onClick={() =>
                      window.open("https://github.com/HimaniMahajan27/Drowsiness-detection-Opencv-", "_blank")
                    }
                  >
                    <Code className="h-4 w-4 mr-1" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Fake News Detection */}
            <Card className="glass-card overflow-hidden hover-lift">
              <div className="h-48 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-xl font-bold">FAKE NEWS DETECTION</h3>
                  <p className="text-sm opacity-80">Truth Verification</p>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                  Fake News Detection by NLP
                </h3>
                <p className={`mb-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Natural Language Processing system to identify and classify fake news articles using machine learning
                  algorithms and text analysis techniques.
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full glass-effect hover-lift bg-transparent"
                    onClick={() => window.open("https://github.com/HimaniMahajan27/Fake_news_Detection-NLP-", "_blank")}
                  >
                    <Code className="h-4 w-4 mr-1" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-full mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-black"}`}>
              Skills & Technologies
            </h2>
            <p className={`max-w-4xl mx-auto text-base sm:text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              A comprehensive toolkit that enables me to build complete, scalable applications from frontend to
              AI-powered backends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* First Row - 3 cards */}
            <Card className="glass-card p-6 hover-lift">
              <h3 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                Frontend Development
              </h3>
              <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Building modern user interfaces</p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-orange-500/20 text-orange-300 glass-effect">HTML</Badge>
                <Badge className="bg-blue-500/20 text-blue-300 glass-effect">CSS</Badge>
                <Badge className="bg-sky-500/20 text-sky-300 glass-effect">Tailwind CSS</Badge>
                <Badge className="bg-cyan-500/20 text-cyan-300 glass-effect">React</Badge>
                <Badge className="bg-purple-500/20 text-purple-300 glass-effect">Redux</Badge>
                <Badge className="bg-yellow-500/20 text-yellow-300 glass-effect">JavaScript</Badge>
                <Badge className="bg-pink-500/20 text-pink-300 glass-effect">Vibe Coding</Badge>
              </div>
            </Card>

            <Card className="glass-card p-6 hover-lift">
              <h3 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                Backend Development
              </h3>
              <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Creating robust server-side applications
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-500/20 text-green-300 glass-effect">Node.js</Badge>
                <Badge className="bg-gray-500/20 text-gray-300 glass-effect">Express</Badge>
                <Badge className="bg-blue-500/20 text-blue-300 glass-effect">Python</Badge>
                <Badge className="bg-emerald-500/20 text-emerald-300 glass-effect">FastAPI</Badge>
                <Badge className="bg-sky-500/20 text-sky-300 glass-effect">REST API</Badge>
                <Badge className="bg-red-500/20 text-red-300 glass-effect">Authentication</Badge>
                <Badge className="bg-purple-500/20 text-purple-300 glass-effect">WebSockets</Badge>
                <Badge className="bg-orange-500/20 text-orange-300 glass-effect">Authorization</Badge>
              </div>
            </Card>

            <Card className="glass-card p-6 hover-lift">
              <h3 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                Database Management
              </h3>
              <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Managing and optimizing data storage
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-500/20 text-blue-300 glass-effect">MySQL</Badge>
                <Badge className="bg-gray-500/20 text-gray-300 glass-effect">DBMS</Badge>
                <Badge className="bg-sky-500/20 text-sky-300 glass-effect">PostgreSQL</Badge>
                <Badge className="bg-green-500/20 text-green-300 glass-effect">MongoDB</Badge>
              </div>
            </Card>

            {/* Second Row - 2 centered cards */}
            <div className="lg:col-start-1 lg:col-end-3 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass-card p-6 hover-lift">
                <h3 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                  Machine Learning & AI
                </h3>
                <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Building intelligent applications
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-500/20 text-blue-300 glass-effect">Python</Badge>
                  <Badge className="bg-purple-500/20 text-purple-300 glass-effect">ML Algorithms</Badge>
                  <Badge className="bg-pink-500/20 text-pink-300 glass-effect">Deep Learning</Badge>
                  <Badge className="bg-cyan-500/20 text-cyan-300 glass-effect">NLP</Badge>
                  <Badge className="bg-orange-500/20 text-orange-300 glass-effect">Chatbots</Badge>
                </div>
              </Card>

              <Card className="glass-card p-6 hover-lift">
                <h3 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                  Professional Skills
                </h3>
                <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Essential soft skills for collaboration
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-sky-500/20 text-sky-300 glass-effect">Communication</Badge>
                  <Badge className="bg-green-500/20 text-green-300 glass-effect">Teamwork</Badge>
                  <Badge className="bg-purple-500/20 text-purple-300 glass-effect">Problem-solving</Badge>
                  <Badge className="bg-orange-500/20 text-orange-300 glass-effect">Time Management</Badge>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-full mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-black"}`}>
              Get In Touch
            </h2>
            <p className={`max-w-3xl mx-auto text-base sm:text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-center gap-4 hover-lift">
                <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center glass-effect bright-glow">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>Email</h3>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>himanimahajan2709@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 hover-lift">
                <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center glass-effect bright-glow">
                  <Instagram className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>Instagram</h3>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>@inamih.2709</p>
                </div>
              </div>

              <Card className="glass-card-bright p-6 hover-lift">
                <h3 className={`text-xl font-bold mb-2 bright-glow ${darkMode ? "text-white" : "text-black"}`}>
                  Let's Work Together
                </h3>
                <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  I'm currently available for internships, freelance work, and collaborative projects. If you have an
                  exciting opportunity or project idea, don't hesitate to reach out.
                </p>
              </Card>
            </div>

            <Card className="glass-card p-6 hover-lift">
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-black"}`}>Send a Message</h3>
              <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Fill out the form below and I'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                    Name
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className={`glass-effect border-sky-500/30 ${darkMode ? "bg-black/50 text-white placeholder:text-gray-400" : "bg-white/50 text-black placeholder:text-gray-600"}`}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                    Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email"
                    className={`glass-effect border-sky-500/30 ${darkMode ? "bg-black/50 text-white placeholder:text-gray-400" : "bg-white/50 text-black placeholder:text-gray-600"}`}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message"
                    className={`glass-effect border-sky-500/30 min-h-[120px] ${darkMode ? "bg-black/50 text-white placeholder:text-gray-400" : "bg-white/50 text-black placeholder:text-gray-600"}`}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-sky-500 hover:bg-sky-600 hover-lift bright-glow"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>

                {submitMessage && (
                  <div
                    className={`flex items-center gap-2 p-3 rounded-lg ${
                      submitSuccess
                        ? "bg-green-500/20 border border-green-500/30"
                        : "bg-red-500/20 border border-red-500/30"
                    }`}
                  >
                    {submitSuccess ? (
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    )}
                    <p className={`text-sm ${submitSuccess ? "text-green-400" : "text-red-400"}`}>{submitMessage}</p>
                  </div>
                )}
              </form>
              {/* Add this after the form closing tag and before the Card closing tag */}
              <div className="mt-6 pt-6 border-t border-sky-500/30">
                <p className={`text-sm text-center mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Having trouble with the form? Contact me directly:
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full glass-effect hover-lift bg-transparent"
                  onClick={() => {
                    const subject = encodeURIComponent("Portfolio Contact")
                    const body = encodeURIComponent(`Hi Himani,

I'm interested in discussing:

[Your message here]

Best regards,
[Your name]`)
                    window.open(`mailto:himanimahajan2709@gmail.com?subject=${subject}&body=${body}`)
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Me Directly
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-effect border-t border-sky-500/30 py-8">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="text-sky-400 text-xl font-bold">{"<>"}</div>
              <span className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>MyPortfolio</span>
            </div>

            <div className="flex items-center gap-4">
              <Link href="https://github.com/HimaniMahajan27" className="text-gray-400 hover:text-sky-400 hover-lift">
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/himani-mahajan-9553732ab/"
                className="text-gray-400 hover:text-sky-400 hover-lift"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/inamih.2709"
                className="text-gray-400 hover:text-sky-400 hover-lift"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>

            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              © 2025 Himani Mahajan. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
