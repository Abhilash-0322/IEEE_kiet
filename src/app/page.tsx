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
import { Code, LayoutDashboard, Database, Calendar, BookOpen, Paintbrush, ExternalLink, Users, Lightbulb, Zap, Globe, Rocket, Shield, Cpu, Terminal, Brain, Smartphone, Cloud } from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Featured gallery images
const featuredGalleryImages = [
  {
    id: "featured-1",
    src: "/1.jpg",
    alt: "Tech Workshop Session",
    title: "Tech Workshop",
    category: "Workshop"
  },
  {
    id: "featured-2",
    src: "/2.jpg",
    alt: "Coding Bootcamp",
    title: "Coding Bootcamp",
    category: "Training"
  },
  {
    id: "featured-3",
    src: "/3.jpg",
    alt: "Innovation Showcase",
    title: "Innovation Showcase",
    category: "Event"
  },
  {
    id: "featured-4", 
    src: "/4.jpg",
    alt: "Project Demo Day",
    title: "Project Demo Day",
    category: "Demo"
  }
];

// Community Statistics
const communityStats = [
  { number: "50+", label: "Active Members", icon: Users, color: "blue" },
  { number: "25+", label: "Projects Built", icon: Code, color: "blue" },
  { number: "15+", label: "Tech Events", icon: Calendar, color: "blue" },
  { number: "5+", label: "Industry Partners", icon: Rocket, color: "blue" }
];

// Tech Focus Areas
const techFocusAreas = [
  {
    name: "Full-Stack Development",
    description: "Building complete web applications with modern frameworks and technologies.",
    icon: Code,
    color: "blue",
    features: ["React & Next.js", "Node.js & Express", "Database Design"]
  },
  {
    name: "Machine Learning & AI",
    description: "Exploring artificial intelligence and data science applications.",
    icon: Brain,
    color: "blue",
    features: ["Deep Learning", "Data Analytics", "Computer Vision"]
  },
  {
    name: "Mobile Development",
    description: "Creating innovative mobile applications for iOS and Android platforms.",
    icon: Smartphone,
    color: "blue",
    features: ["React Native", "Flutter", "Native Development"]
  },
  {
    name: "Cloud & DevOps",
    description: "Deploying and scaling applications using modern cloud technologies.",
    icon: Cloud,
    color: "blue",
    features: ["AWS & Azure", "Docker & Kubernetes", "CI/CD Pipelines"]
  },
  {
    name: "Cybersecurity",
    description: "Securing digital systems and understanding cybersecurity principles.",
    icon: Shield,
    color: "blue",
    features: ["Ethical Hacking", "Network Security", "Threat Analysis"]
  },
  {
    name: "Open Source",
    description: "Contributing to and maintaining open source projects and communities.",
    icon: Globe,
    color: "blue",
    features: ["GitHub Contributions", "Project Maintenance", "Community Building"]
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
        className="ieee-section bg-gradient-to-br from-blue-50 via-white to-slate-50 relative overflow-hidden min-h-screen flex items-center"
      >
        <div className="ieee-container">
          <div className="text-center max-w-5xl mx-auto">
            <div className="relative inline-flex items-center justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25 border border-blue-500/20">
                <Terminal className="text-white h-12 w-12" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white animate-pulse"></div>
            </div>
            
            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8"
            >
              Geek <span className="text-blue-600">Room</span>
              <div className="text-2xl sm:text-3xl font-medium text-slate-600 mt-2">
                KIET
              </div>
            </h1>
            
            <div className="space-y-6 text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              <p ref={addToTextRefs}>
                Where <span className="font-semibold text-blue-700">passion meets innovation</span>. 
                We're a vibrant tech community building the future through code, creativity, and collaboration.
              </p>
              <p ref={addToTextRefs}>
                From cutting-edge projects to industry connections, we empower the next generation 
                of tech leaders to <span className="font-semibold text-blue-700">create, innovate, and inspire</span>.
              </p>
            </div>
            
            <div className="pt-12">
              <Link ref={buttonRef} href="/join-us">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-4 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                  <Users className="mr-3 h-6 w-6" />
                  Join Our Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="ieee-section bg-white">
        <div className="ieee-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Community Impact
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Building a stronger tech ecosystem, one project at a time
            </p>
          </div>
          
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {communityStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index}
                  className="stat-item text-center"
                >
                  <div className="w-16 h-16 bg-[#0066CC] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <IconComponent className="text-white h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#0066CC] mb-2">{stat.number}</h3>
                  <p className="text-[#6B7280] font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="ieee-section bg-[#FAFBFC]">
        <div className="ieee-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0066CC] mb-4">
              IEEE Events Gallery
            </h2>
            <p className="text-lg text-[#6B7280] max-w-3xl mx-auto">
              Explore our technical workshops, competitions, and innovation events. 
              Visit our full gallery to see more of what we do at IEEE KIET Student Branch.
            </p>
          </div>

          <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredGalleryImages.map((image) => (
              <div
                key={image.id}
                className="gallery-item ieee-card ieee-card-hover overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="mb-2">
                      <span className="ieee-badge ieee-badge-primary">
                        {image.category}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/gallery">
              <Button className="ieee-button-outline text-lg px-8 py-4">
                <ExternalLink className="mr-2 h-5 w-5" />
                View Full Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* IEEE Societies Section */}
      <section className="ieee-section bg-white">
        <div className="ieee-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0066CC] mb-4">
              IEEE Societies & Chapters
            </h2>
            <p className="text-lg text-[#6B7280] max-w-3xl mx-auto">
              Join specialized IEEE societies to focus on your areas of interest and expertise
            </p>
          </div>

          <div ref={societiesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ieeeSocieties.map((society, index) => {
              const IconComponent = society.icon;
              return (
                <Card key={index} className="society-card ieee-card ieee-card-hover">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-[#0066CC] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <IconComponent className="text-white h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0066CC] mb-4">{society.name}</h3>
                    <p className="text-[#6B7280] mb-6 leading-relaxed">
                      {society.description}
                    </p>
                    <div className="space-y-2">
                      {society.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-[#6B7280]">
                          <div className="w-2 h-2 bg-[#0066CC] rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="ieee-section bg-[#FAFBFC]">
        <div className="ieee-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0066CC] mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-[#6B7280] mb-8 leading-relaxed">
                Have questions about IEEE membership or upcoming events? Contact us via email or social media, 
                and our team will get back to you as soon as possible!
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-[#6B7280]">
                  <Globe className="h-5 w-5 text-[#0066CC] mr-3" />
                  <span>ieee.kiet@kiet.edu</span>
                </div>
                <div className="flex items-center text-[#6B7280]">
                  <Users className="h-5 w-5 text-[#0066CC] mr-3" />
                  <span>Join our IEEE KIET community</span>
                </div>
              </div>
            </div>

            <div className="ieee-card p-8">
              <h3 className="text-2xl font-bold text-[#0066CC] mb-6">
                Ready to Join IEEE?
              </h3>
              <p className="text-[#6B7280] mb-6 leading-relaxed">
                Become part of the world's largest technical professional organization and advance your career in technology.
              </p>
              <Link href="/join-us">
                <Button className="ieee-button w-full text-lg py-4">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Your IEEE Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}