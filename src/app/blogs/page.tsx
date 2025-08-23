'use client';

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Code, Lightbulb, Bug, Globe, Award, BookOpen, Zap, Rocket, Shield, Cpu, Database, Users, Calendar, Clock, ArrowRight } from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// IEEE Technical Articles and Research Papers
const blogs = [
  {
    id: 1,
    title: "Advancements in 5G Network Architecture",
    excerpt: "Exploring the latest developments in 5G network infrastructure and their implications for future communication systems. Learn about the cutting-edge technologies driving the next generation of wireless communication.",
    date: "March 15, 2025",
    readTime: "8 min read",
    author: "IEEE Communications Society",
    category: "Communications",
    icon: Globe,
    image: "https://ext.same-assets.com/812608780/849522504.jpeg",
    tags: ["5G", "Network Architecture", "Wireless Communication"]
  },
  {
    id: 2,
    title: "Machine Learning in Power Systems",
    excerpt: "How AI and ML are revolutionizing power grid management and energy distribution systems. Discover innovative approaches to smart grid optimization and renewable energy integration.",
    date: "March 5, 2025",
    readTime: "12 min read",
    author: "IEEE Power & Energy Society",
    category: "Power & Energy",
    icon: Zap,
    image: "https://ext.same-assets.com/812608780/849522504.jpeg",
    tags: ["Machine Learning", "Power Systems", "Smart Grid"]
  },
  {
    id: 3,
    title: "Robotics and Automation in Industry 4.0",
    excerpt: "The role of robotics and automation in the fourth industrial revolution and smart manufacturing. Explore how collaborative robots are transforming modern industrial processes.",
    date: "February 20, 2025",
    readTime: "10 min read",
    author: "IEEE Robotics & Automation Society",
    category: "Robotics",
    icon: Bug,
    image: "https://ext.same-assets.com/812608780/849522504.jpeg",
    tags: ["Robotics", "Automation", "Industry 4.0"]
  },
  {
    id: 4,
    title: "Blockchain Technology in Supply Chain Management",
    excerpt: "Implementing blockchain solutions for transparent and secure supply chain operations. Learn about decentralized systems and their impact on global trade and logistics.",
    date: "February 10, 2025",
    readTime: "15 min read",
    author: "IEEE Computer Society",
    category: "Computer Science",
    icon: Cpu,
    image: "https://ext.same-assets.com/812608780/849522504.jpeg",
    tags: ["Blockchain", "Supply Chain", "Decentralization"]
  },
  {
    id: 5,
    title: "Women in Engineering: Breaking Barriers",
    excerpt: "Celebrating the achievements of women engineers and promoting diversity in the engineering field. Discover inspiring stories and initiatives driving gender equality in STEM.",
    date: "February 5, 2025",
    readTime: "6 min read",
    author: "IEEE Women in Engineering",
    category: "WIE",
    icon: Shield,
    image: "https://ext.same-assets.com/812608780/849522504.jpeg",
    tags: ["Women in Engineering", "Diversity", "STEM"]
  },
  {
    id: 6,
    title: "Research Methodologies in Engineering",
    excerpt: "A comprehensive guide to conducting research and publishing papers in IEEE conferences and journals. Master the art of academic writing and research presentation.",
    date: "January 25, 2025",
    readTime: "20 min read",
    author: "IEEE Research & Development",
    category: "Research",
    icon: Rocket,
    image: "https://ext.same-assets.com/812608780/849522504.jpeg",
    tags: ["Research", "Academic Writing", "Publications"]
  }
];

export default function BlogsPage() {
  const blogsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero section animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          ease: "power3.out"
        }
      );
    }

    // Blogs grid animation
    if (blogsRef.current) {
      const blogCards = blogsRef.current.querySelectorAll('.blog-card');
      gsap.fromTo(
        blogCards,
        { opacity: 0, y: 50, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: blogsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <>
      <Navbar />

      {/* Enhanced Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 min-h-screen relative overflow-hidden"
      >
        {/* IEEE Gradient Balls */}
        <div className="ieee-gradient-ball blue" style={{ top: '20%', left: '10%' }}></div>
        <div className="ieee-gradient-ball orange" style={{ top: '60%', right: '15%' }}></div>
        <div className="ieee-gradient-ball light-blue" style={{ bottom: '30%', left: '20%' }}></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#00629B] to-[#0077CC] rounded-2xl mb-8 shadow-lg">
              <BookOpen className="text-white h-10 w-10" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold ieee-text-gradient mb-6">
              IEEE Technical Articles
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Stay updated with the latest research, technical articles, and insights from IEEE societies. 
              Explore cutting-edge technologies and engineering innovations that shape the future.
            </p>
          </div>

          {/* Blog Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
            <div className="text-center p-6 ieee-glass rounded-2xl border border-[#00629B]/20">
              <div className="text-3xl font-bold ieee-text-gradient-blue mb-2">6</div>
              <div className="text-gray-300 text-sm">Articles</div>
            </div>
            <div className="text-center p-6 ieee-glass rounded-2xl border border-[#FF6B35]/20">
              <div className="text-3xl font-bold text-[#FF6B35] mb-2">6</div>
              <div className="text-gray-300 text-sm">IEEE Societies</div>
            </div>
            <div className="text-center p-6 ieee-glass rounded-2xl border border-[#0077CC]/20">
              <div className="text-3xl font-bold text-[#0077CC] mb-2">71</div>
              <div className="text-gray-300 text-sm">Avg. Read Time</div>
            </div>
            <div className="text-center p-6 ieee-glass rounded-2xl border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-300 text-sm">Peer Reviewed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Blogs Grid */}
      <section className="py-16 md:py-24 bg-black relative overflow-hidden">
        <div className="ieee-gradient-ball blue" style={{ top: '10%', right: '10%' }}></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div ref={blogsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => {
              const IconComponent = blog.icon;
              return (
                <Card
                  key={blog.id}
                  className="blog-card ieee-card-hover bg-gray-900/80 border border-[#00629B]/20 rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-gradient-to-r from-[#00629B] to-[#0077CC] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        {blog.category}
                      </span>
                    </div>
                    
                    {/* Read Time */}
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center bg-black/50 text-white px-3 py-1 rounded-full text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {blog.readTime}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Date and Author */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        {blog.date}
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-br from-[#00629B] to-[#0077CC] rounded-lg flex items-center justify-center">
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold mb-3 ieee-text-gradient-blue leading-tight">{blog.title}</h2>

                    {/* Excerpt */}
                    <p className="text-gray-300 mb-4 leading-relaxed text-sm line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-[#FF6B35]/10 text-[#FF6B35] text-xs rounded-full border border-[#FF6B35]/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Author */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#00629B] font-medium">{blog.author}</span>
                    </div>
                  </CardContent>

                  <CardFooter className="px-6 pb-6 pt-0">
                    <Button 
                      className="w-full ieee-button bg-gradient-to-r from-[#00629B] to-[#FF6B35] hover:from-[#004D7A] hover:to-[#E55A2B] text-white rounded-xl py-3 text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                    >
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Read Article
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="ieee-glass rounded-2xl p-8 border border-[#00629B]/20 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold ieee-text-gradient-blue mb-4">
                Contribute to IEEE Knowledge Base
              </h3>
              <p className="text-gray-300 mb-6">
                Share your research and technical insights with the global IEEE community. Submit your articles and contribute to advancing technology for humanity.
              </p>
              <Button className="ieee-button bg-gradient-to-r from-[#00629B] to-[#0077CC] hover:from-[#004D7A] hover:to-[#00629B] text-white rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
                <BookOpen className="mr-2 h-5 w-5" />
                Submit Article
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
