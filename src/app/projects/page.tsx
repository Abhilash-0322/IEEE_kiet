'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Lightbulb, Bug, Globe, Award, BookOpen, Zap, Rocket, Shield, Cpu, Database, Users } from "lucide-react";


// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// IEEE Projects Data
const projects = [
  {
    id: "smart-energy-management",
    title: "Smart Energy Management System",
    description: "An IoT-based energy management system that optimizes power consumption in smart buildings using machine learning algorithms.",
    category: "Power & Energy",
    icon: Zap,
    creator: {
      name: "IEEE Power & Energy Society",
      avatar: "/raj.png"
    },
    status: "In Progress",
    progress: 75,
    team: 8,
    duration: "6 months",
    technologies: ["IoT", "Machine Learning", "Python", "React"]
  },
  {
    id: "ai-robotics-platform",
    title: "AI-Powered Robotics Platform",
    description: "A modular robotics platform with AI capabilities for educational and research purposes in automation and control systems.",
    category: "Robotics & Automation",
    icon: Bug,
    creator: {
      name: "IEEE Robotics Society",
      avatar: "/devansh.png"
    },
    status: "Completed",
    progress: 100,
    team: 12,
    duration: "8 months",
    technologies: ["AI", "Robotics", "ROS", "Python"]
  },
  {
    id: "5g-network-simulation",
    title: "5G Network Simulation Tool",
    description: "A comprehensive simulation tool for testing and optimizing 5G network performance and coverage in urban environments.",
    category: "Communications",
    icon: Globe,
    creator: {
      name: "IEEE Communications Society",
      avatar: "/sunny.png"
    },
    status: "In Progress",
    progress: 60,
    team: 10,
    duration: "10 months",
    technologies: ["5G", "Network Simulation", "C++", "MATLAB"]
  },
  {
    id: "blockchain-supply-chain",
    title: "Blockchain Supply Chain Solution",
    description: "A decentralized supply chain management system using blockchain technology for transparency and traceability.",
    category: "Computer Society",
    icon: Cpu,
    creator: {
      name: "IEEE Computer Society",
      avatar: "/arpit.png"
    },
    status: "Completed",
    progress: 100,
    team: 6,
    duration: "4 months",
    technologies: ["Blockchain", "Smart Contracts", "Solidity", "Web3"]
  },
  {
    id: "women-engineering-mentorship",
    title: "Women in Engineering Mentorship Program",
    description: "A comprehensive mentorship program connecting female engineering students with industry professionals and role models.",
    category: "Women in Engineering",
    icon: Shield,
    creator: {
      name: "IEEE WIE",
      avatar: "/shalu.png"
    },
    status: "Active",
    progress: 85,
    team: 15,
    duration: "Ongoing",
    technologies: ["Mentorship", "Leadership", "Career Development"]
  },
  {
    id: "research-paper-publishing",
    title: "Research Paper Publication Initiative",
    description: "Supporting students in publishing their research papers in IEEE conferences and journals with mentorship and guidance.",
    category: "Research & Development",
    icon: Rocket,
    creator: {
      name: "IEEE R&D Team",
      avatar: "/yash.png"
    },
    status: "Ongoing",
    progress: 90,
    team: 20,
    duration: "Continuous",
    technologies: ["Research", "Publication", "Academic Writing"]
  }
];

export default function ProjectsPage() {
  const projectsRef = useRef<HTMLDivElement>(null);
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

    // Projects grid animation
    if (projectsRef.current) {
      const projectCards = projectsRef.current.querySelectorAll('.project-card');
      gsap.fromTo(
        projectCards,
        { opacity: 0, y: 50, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Progress':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Active':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Ongoing':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <>
      <Navbar />

      {/* Enhanced Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 min-h-screen relative overflow-hidden"
      >
        {/* IEEE Gradient Balls */}
        <div className="ieee-gradient-ball blue" style={{ top: '15%', left: '10%' }}></div>
        <div className="ieee-gradient-ball orange" style={{ top: '65%', right: '10%' }}></div>
        <div className="ieee-gradient-ball light-blue" style={{ bottom: '25%', left: '15%' }}></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#00629B] to-[#0077CC] rounded-2xl mb-8 shadow-lg">
              <Rocket className="text-white h-10 w-10" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold ieee-text-gradient mb-6">
              IEEE Research Projects
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Explore innovative research projects and technical initiatives led by IEEE societies 
              that advance technology for humanity. Join our collaborative research community.
            </p>
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
            <div className="text-center p-6 ieee-glass rounded-2xl border border-[#00629B]/20">
              <div className="text-3xl font-bold ieee-text-gradient-blue mb-2">6</div>
              <div className="text-gray-300 text-sm">Active Projects</div>
            </div>
            <div className="text-center p-6 ieee-glass rounded-2xl border border-[#FF6B35]/20">
              <div className="text-3xl font-bold text-[#FF6B35] mb-2">71</div>
              <div className="text-gray-300 text-sm">Team Members</div>
            </div>
            <div className="text-center p-6 ieee-glass rounded-2xl border border-[#0077CC]/20">
              <div className="text-3xl font-bold text-[#0077CC] mb-2">85%</div>
              <div className="text-gray-300 text-sm">Avg. Progress</div>
            </div>
            <div className="text-center p-6 ieee-glass rounded-2xl border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">6</div>
              <div className="text-gray-300 text-sm">IEEE Societies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Projects Grid */}
      <section className="py-16 md:py-24 bg-black relative overflow-hidden">
        <div className="ieee-gradient-ball blue" style={{ top: '10%', right: '10%' }}></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const IconComponent = project.icon;
              return (
                <Card key={project.id} className="project-card ieee-card-hover bg-gray-900/80 border border-[#00629B]/20 rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-sm">
                  <CardContent className="p-6">
                    {/* Project Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#00629B] to-[#0077CC] rounded-xl flex items-center justify-center shadow-lg">
                        <IconComponent className="h-7 w-7 text-white" />
                      </div>
                      <span className={`px-4 py-2 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>

                    {/* Project Title and Description */}
                    <h3 className="text-xl font-bold ieee-text-gradient-blue mb-3">{project.title}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                      {project.description}
                    </p>

                    {/* Project Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[#00629B] to-[#FF6B35] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 ieee-glass rounded-xl border border-[#00629B]/10">
                        <div className="text-lg font-bold text-[#00629B]">{project.team}</div>
                        <div className="text-xs text-gray-400">Team Size</div>
                      </div>
                      <div className="text-center p-3 ieee-glass rounded-xl border border-[#FF6B35]/10">
                        <div className="text-lg font-bold text-[#FF6B35]">{project.duration}</div>
                        <div className="text-xs text-gray-400">Duration</div>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <div className="text-sm text-gray-400 mb-3">Technologies</div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-[#00629B]/10 text-[#00629B] text-xs rounded-full border border-[#00629B]/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Category */}
                    <div className="mb-6">
                      <span className="inline-block bg-gradient-to-r from-[#FF6B35] to-[#FF6B35] text-white px-4 py-2 rounded-full text-xs font-semibold">
                        {project.category}
                      </span>
                    </div>

                    {/* Creator */}
                    <div className="flex items-center mb-6">
                      <Avatar className="h-10 w-10 border-2 border-[#00629B]/20">
                        <AvatarImage src={project.creator.avatar} alt={project.creator.name} />
                        <AvatarFallback className="bg-[#00629B] text-white text-sm">
                          {project.creator.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-white">{project.creator.name}</div>
                        <div className="text-xs text-gray-400">Project Lead</div>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Link href={`/projects/${project.id}`} className="w-full">
                      <Button className="w-full ieee-button bg-gradient-to-r from-[#00629B] to-[#FF6B35] hover:from-[#004D7A] hover:to-[#E55A2B] text-white rounded-xl py-3 text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
                        <Rocket className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="ieee-glass rounded-2xl p-8 border border-[#00629B]/20 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold ieee-text-gradient-blue mb-4">
                Want to Start Your Own Project?
              </h3>
              <p className="text-gray-300 mb-6">
                Join our research community and collaborate with fellow IEEE members on innovative projects that advance technology for humanity.
              </p>
              <Button className="ieee-button bg-gradient-to-r from-[#00629B] to-[#0077CC] hover:from-[#004D7A] hover:to-[#00629B] text-white rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
                <Users className="mr-2 h-5 w-5" />
                Join Research Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
