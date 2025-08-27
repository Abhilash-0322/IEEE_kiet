'use client'; // Required for GSAP animations (Client Component)

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, LayoutDashboard, Database, Calendar, BookOpen, Paintbrush, ExternalLink, Users, Lightbulb, Zap, Globe, Rocket, Shield, Cpu, Award, Brain, Smartphone, Cloud, ArrowRight, Mail } from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Featured gallery images
const featuredGalleryImages = [
  {
    id: "featured-1",
    src: "/1.jpg",
    alt: "IEEE Technical Workshop",
    title: "Technical Workshop",
    category: "Workshop"
  },
  {
    id: "featured-2",
    src: "/2.jpg",
    alt: "IEEE Coding Competition",
    title: "Coding Competition",
    category: "Competition"
  },
  {
    id: "featured-3",
    src: "/3.jpg",
    alt: "IEEE Innovation Summit",
    title: "Innovation Summit",
    category: "Summit"
  },
  {
    id: "featured-4", 
    src: "/4.jpg",
    alt: "IEEE Research Symposium",
    title: "Research Symposium",
    category: "Research"
  }
];

// IEEE Statistics
const ieeeStats = [
  { number: "100+", label: "Active Members", icon: Users, color: "blue" },
  { number: "15+", label: "Technical Events", icon: Calendar, color: "blue" },
  { number: "8+", label: "Research Papers", icon: BookOpen, color: "blue" },
  { number: "5+", label: "IEEE Awards", icon: Award, color: "blue" }
];

// IEEE Societies
const ieeeSocieties = [
  {
    name: "Computer Society",
    description: "Focus on computer science, software engineering, and emerging technologies.",
    icon: Cpu,
    color: "blue",
    features: ["Coding Competitions", "Hackathons", "AI Workshops"]
  },
  {
    name: "Power & Energy Society",
    description: "Advancing technology for electric energy generation and distribution.",
    icon: Zap,
    color: "blue",
    features: ["Energy Projects", "Smart Grid", "Renewable Energy"]
  },
  {
    name: "Robotics & Automation",
    description: "Promoting robotics research, development, and education.",
    icon: Rocket,
    color: "blue",
    features: ["Robotics Competitions", "Automation", "IoT Projects"]
  },
  {
    name: "Communications Society",
    description: "Advancing communications technology and network systems.",
    icon: Globe,
    color: "blue",
    features: ["5G Technology", "Network Security", "Wireless Systems"]
  },
  {
    name: "Women in Engineering",
    description: "Promoting women engineers and inspiring future generations.",
    icon: Shield,
    color: "blue",
    features: ["Mentorship Programs", "Leadership Training", "Career Development"]
  },
  {
    name: "Research & Development",
    description: "Fostering research culture and innovation in technology.",
    icon: Brain,
    color: "blue",
    features: ["Paper Publications", "International Conferences", "Innovation Labs"]
  }
];

export default function Home() {
  // GSAP animation refs
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRefs = useRef<HTMLParagraphElement[]>([]);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const societiesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // GSAP animation logic
  useEffect(() => {
    // Hero section animations
    const heroTl = gsap.timeline({ 
      defaults: { ease: "power3.out" }
    });

    heroTl
      .fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 }
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        textRefs.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        "-=0.4"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5 },
        "-=0.3"
      );

    // Stats section animation
    if (statsRef.current) {
      const statElements = statsRef.current.querySelectorAll('.stat-item');
      gsap.fromTo(
        statElements,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Societies section animation
    if (societiesRef.current) {
      const societyCards = societiesRef.current.querySelectorAll('.society-card');
      gsap.fromTo(
        societyCards,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: societiesRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Gallery section animation
    if (galleryRef.current) {
      const galleryItems = galleryRef.current.querySelectorAll('.gallery-item');
      gsap.fromTo(
        galleryItems,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  // Collect paragraph refs
  const addToTextRefs = (el: HTMLParagraphElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="ieee-section relative overflow-hidden min-h-screen flex items-center bg-white"
      >
        {/* Subtle geometric background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-blue-50/40 to-white"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230066CC' fill-opacity='1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="ieee-container relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            {/* Logo and Brand */}
            <div className="relative inline-flex items-center justify-center mb-12">
              <div className="relative">
                <Image 
                  src="/Ieee_blue.png" 
                  alt="IEEE Logo" 
                  width={260} 
                  height={260} 
                  className="object-contain drop-shadow-lg"
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full border-3 border-white animate-pulse shadow-lg"></div>
              </div>
            </div>
            
            {/* Main Heading */}
            <div className="mb-8">
              <h1
                ref={titleRef}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-4"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                IEEE{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  KIET
                </span>
              </h1>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-600 tracking-tight">
                Student Branch
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto mt-6 rounded-full"></div>
            </div>
            
            {/* Description */}
            <div className="space-y-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto mb-12">
              <p ref={addToTextRefs} className="font-medium">
                Empowering the next generation of engineers through{" "}
                <span className="font-semibold text-slate-800">innovation</span>,{" "}
                <span className="font-semibold text-slate-800">collaboration</span>, and{" "}
                <span className="font-semibold text-slate-800">professional excellence</span>.
              </p>
              <p ref={addToTextRefs}>
                Join the world's largest technical professional organization and connect with industry leaders, 
                cutting-edge research, and global opportunities that advance technology for humanity.
              </p>
            </div>
            
            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link ref={buttonRef} href="/join-us">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold">
                  <Users className="mr-3 h-5 w-5" />
                  Become a Member
                </Button>
              </Link>
              <Link href="/events">
                <Button variant="outline" className="border-2 border-slate-300 hover:border-blue-600 hover:text-blue-700 text-slate-700 text-lg px-8 py-4 rounded-2xl transition-all duration-300 font-semibold">
                  <Calendar className="mr-3 h-5 w-5" />
                  Explore Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="ieee-section bg-white border-y border-slate-100">
        <div className="ieee-container">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Our <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Impact</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Building a community of excellence through technical innovation and professional development
            </p>
          </div>
          
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {ieeeStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index}
                  className="stat-item text-center group"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      <IconComponent className="text-white h-8 w-8 lg:h-10 lg:w-10" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-400 rounded-full border-3 border-white opacity-80"></div>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3 font-mono tracking-tight">{stat.number}</h3>
                  <p className="text-slate-600 font-medium text-base lg:text-lg">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      {/* <section className="ieee-section bg-slate-50">
        <div className="ieee-container">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Events & <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Activities</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Experience our technical workshops, innovation competitions, and professional development events 
              that shape the future of engineering.
            </p>
          </div>

          <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {featuredGalleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`gallery-item group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  index === 0 ? 'md:col-span-2 h-80' : 'h-64'
                }`}
              >
                <div className="relative h-full overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="mb-4">
                      <span className="bg-blue-600/90 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full">
                        {image.category}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-xl lg:text-2xl mb-2">{image.title}</h3>
                    <div className="w-12 h-1 bg-blue-400 rounded-full"></div>
                  </div> */}
                  {/* Hover overlay */}
                  {/* <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div> */}

          {/* <div className="text-center">
            <Link href="/gallery">
              <Button className="bg-white text-blue-700 border-2 border-blue-600 hover:bg-blue-600 hover:text-white text-lg px-10 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold">
                <ExternalLink className="mr-3 h-5 w-5" />
                View Full Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section> */}

      {/* IEEE Societies Section */}
      <section className="ieee-section bg-white">
        <div className="ieee-container">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              IEEE <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Societies</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Join specialized IEEE societies to advance your expertise and connect with professionals 
              in your field of interest.
            </p>
          </div>

          <div ref={societiesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ieeeSocieties.map((society, index) => {
              const IconComponent = society.icon;
              return (
                <Card key={index} className="society-card bg-white border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden rounded-3xl">
                  <CardContent className="p-8 relative">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                      <IconComponent className="w-full h-full text-blue-600" />
                    </div>
                    
                    {/* Icon */}
                    <div className="relative mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                        <IconComponent className="text-white h-8 w-8" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-400 rounded-full border-2 border-white"></div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight">{society.name}</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed line-clamp-3">
                      {society.description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-3">
                      {society.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Learn More Link */}
                    <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-blue-600 font-semibold text-sm flex items-center">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="ieee-section bg-slate-50">
        <div className="ieee-container">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                    Ready to Shape the 
                    <span className="block bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                      Future of Technology?
                    </span>
                  </h2>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    Join a global community of 420,000+ engineers and technologists 
                    advancing technology for humanity.
                  </p>
                </div>
                
                {/* Benefits */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-lg mb-1">Global Network</h4>
                      <p className="text-slate-600">Connect with industry leaders worldwide</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-lg mb-1">Knowledge Access</h4>
                      <p className="text-slate-600">Research papers, standards, and publications</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Rocket className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-lg mb-1">Career Growth</h4>
                      <p className="text-slate-600">Professional development and certification</p>
                    </div>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="pt-8 border-t border-slate-200">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <a 
                        href="mailto:ieee.kiet@kiet.edu" 
                        className="text-slate-700 hover:text-blue-700 transition-colors duration-200 font-medium"
                      >
                        ieee.kiet@kiet.edu
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-blue-600" />
                      <span className="text-slate-700">KIET Group of Institutions, Ghaziabad</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content - CTA Card */}
              <div className="relative">
                <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full transform translate-x-24 -translate-y-24"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-400 to-blue-500 rounded-full transform -translate-x-16 translate-y-16"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                        Begin Your IEEE Journey
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        Join IEEE KIET Student Branch and unlock opportunities in technology, 
                        innovation, and professional growth.
                      </p>
                    </div>
                    
                    {/* Membership Benefits */}
                    <div className="space-y-4 mb-8">
                      {[
                        "Access to exclusive IEEE resources",
                        "Networking with industry professionals", 
                        "Technical workshops and seminars",
                        "Research and publication opportunities"
                      ].map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex-shrink-0"></div>
                          <span className="text-slate-700 font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link href="/join-us">
                      <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white w-full text-lg py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold">
                        <Users className="mr-3 h-6 w-6" />
                        Join IEEE KIET Today
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}