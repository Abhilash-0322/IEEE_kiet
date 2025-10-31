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
      avatar: "/rehan.png"
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
        return 'bg-green-100 text-green-700 border border-green-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'Active':
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'Ongoing':
        return 'bg-purple-100 text-purple-700 border border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

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
              {/* <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl flex items-center 
              justify-center shadow-xl border border-blue-200/30">
                <Rocket className="text-white h-10 w-10" />
              </div> */}
              {/* <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full border-2 border-white animate-pulse"></div> */}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              Research <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Projects</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Explore innovative research projects and technical initiatives led by IEEE societies 
              that advance technology for humanity and drive innovation forward.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Project Stats */}
      {/* <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="ieee-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Rocket className="text-white h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2 font-mono">6</div>
              <div className="text-slate-600 font-medium">Active Projects</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Users className="text-white h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2 font-mono">71</div>
              <div className="text-slate-600 font-medium">Team Members</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Award className="text-white h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2 font-mono">85%</div>
              <div className="text-slate-600 font-medium">Avg. Progress</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Globe className="text-white h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2 font-mono">6</div>
              <div className="text-slate-600 font-medium">IEEE Societies</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="ieee-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              Featured <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover cutting-edge research initiatives across multiple IEEE societies
            </p>
          </div>

          <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const IconComponent = project.icon;
              return (
                <Card key={project.id} className="project-card bg-white border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden rounded-3xl">
                  <CardContent className="p-8">
                    {/* Project Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                        <IconComponent className="h-7 w-7 text-white" />
                      </div>
                      <span className={`px-4 py-2 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>

                    {/* Project Title and Description */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">{project.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Project Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-slate-600 mb-2">
                        <span className="font-medium">Progress</span>
                        <span className="font-mono font-semibold">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="text-lg font-bold text-blue-600">{project.team}</div>
                        <div className="text-xs text-slate-600 font-medium">Team Size</div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="text-lg font-bold text-blue-600">{project.duration}</div>
                        <div className="text-xs text-slate-600 font-medium">Duration</div>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <div className="text-sm text-slate-600 mb-3 font-medium">Technologies</div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Category */}
                    <div className="mb-6">
                      <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-xs font-semibold">
                        {project.category}
                      </span>
                    </div>

                    {/* Creator */}
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200">
                        <Image
                          src={project.creator.avatar}
                          alt={project.creator.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-semibold text-slate-900">{project.creator.name}</div>
                        <div className="text-xs text-slate-600">Project Lead</div>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Link href={`/projects/${project.id}`} className="w-full">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl py-3 text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
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
          <div className="text-center mt-20">
            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200 max-w-2xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                Want to Start Your Own Project?
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                Join our research community and collaborate with fellow IEEE members on innovative projects that advance technology for humanity.
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                <Users className="mr-3 h-5 w-5" />
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
