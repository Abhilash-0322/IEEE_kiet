'use client';

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Code, Lightbulb, Bug, Globe, Award, BookOpen, Zap, Rocket, Shield, Cpu, Database, Users, Calendar, Clock, ArrowRight } from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// IEEE Technical Articles and Research Papers
const blogs = [
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

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 bg-white min-h-[60vh] flex items-center"
      >
        <div className="ieee-container">
          <div className="text-center max-w-4xl mx-auto">
            <div className="relative inline-flex items-center justify-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl flex items-center justify-center shadow-xl border border-blue-200/30">
                <BookOpen className="text-white h-10 w-10" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              Technical <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Articles</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Stay updated with the latest research, technical articles, and insights from IEEE societies. 
              Explore cutting-edge technologies and engineering innovations that shape the future.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Blog Stats */}
      {/* <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="ieee-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <BookOpen className="text-white h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2 font-mono">6</div>
              <div className="text-slate-600 font-medium">Articles</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Globe className="text-white h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2 font-mono">6</div>
              <div className="text-slate-600 font-medium">IEEE Societies</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Clock className="text-white h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2 font-mono">12m</div>
              <div className="text-slate-600 font-medium">Avg. Read Time</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Award className="text-white h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2 font-mono">100%</div>
              <div className="text-slate-600 font-medium">Peer Reviewed</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Blogs Grid */}
      <section className="py-20 bg-white">
        <div className="ieee-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              Latest <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Articles</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover insights and research from IEEE experts across multiple engineering disciplines
            </p>
          </div>

          <div ref={blogsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => {
              const IconComponent = blog.icon;
              return (
                <Card
                  key={blog.id}
                  className="blog-card bg-white border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden rounded-3xl"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        {blog.category}
                      </span>
                    </div>
                    
                    {/* Read Time */}
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-full text-xs font-medium">
                        <Clock className="h-3 w-3 mr-1" />
                        {blog.readTime}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-8">
                    {/* Date and Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-slate-500 text-sm font-medium">
                        <Calendar className="h-4 w-4 mr-2" />
                        {blog.date}
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold mb-3 text-slate-900 leading-tight group-hover:text-blue-700 transition-colors duration-300">{blog.title}</h2>

                    {/* Excerpt */}
                    <p className="text-slate-600 mb-6 leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {blog.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Author */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm text-blue-600 font-semibold">{blog.author}</span>
                    </div>

                    {/* Read Button */}
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl py-3 text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20">
            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200 max-w-2xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                Contribute to IEEE Knowledge Base
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                Share your research and technical insights with the global IEEE community. Submit your articles and contribute to advancing technology for humanity.
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                <BookOpen className="mr-3 h-5 w-5" />
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
