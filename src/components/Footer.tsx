import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Instagram, Mail, Globe, MapPin, Phone, Users, Award, Zap, Rocket, Shield, Cpu, Database } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-50 to-white border-t border-slate-200/60 py-20">
      <div className="ieee-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Logo and Address */}
          <div className="flex flex-col lg:col-span-2">
            <Link href="/" className="flex items-center mb-8 group">
              <div className="flex items-center space-x-3 transition-transform duration-300 group-hover:scale-105">
                <div className="relative">
                  <Image 
                    src="/Ieee_blue.png" 
                    alt="IEEE Logo" 
                    width={200} 
                    height={200} 
                    className="object-contain drop-shadow-sm"
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white animate-pulse shadow-sm"></div>
                </div>
                <div className="flex flex-col">
                  <div className="text-slate-900 font-bold text-2xl lg:text-3xl tracking-tight">
                    IEEE <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">KIET</span>
                  </div>
                  <div className="text-sm text-slate-500 font-medium tracking-wider uppercase">
                    Student Branch
                  </div>
                </div>
              </div>
            </Link>
            <div className="text-slate-600 space-y-6 max-w-md">
              <p className="text-lg leading-relaxed font-medium">
                Empowering the next generation of engineers through innovation, education, and professional excellence.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">KIET Group of Institutions</p>
                    <p className="text-sm text-slate-600">Muradnagar, Ghaziabad, Uttar Pradesh</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <a
                    href="mailto:ieee.kiet@kiet.edu"
                    className="text-slate-700 hover:text-blue-700 transition-colors duration-200 font-medium"
                  >
                    ieee.kiet@kiet.edu
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 mb-8 tracking-tight">Navigation</h3>
            <div className="space-y-4">
              <Link href="/events" className="text-slate-600 hover:text-blue-700 transition-colors duration-200 flex items-center space-x-3 group">
                <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                <span className="font-medium">Events & Workshops</span>
              </Link>
              <Link href="/projects" className="text-slate-600 hover:text-blue-700 transition-colors duration-200 flex items-center space-x-3 group">
                <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                <span className="font-medium">Research Projects</span>
              </Link>
              <Link href="/team" className="text-slate-600 hover:text-blue-700 transition-colors duration-200 flex items-center space-x-3 group">
                <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                <span className="font-medium">Our Team</span>
              </Link>
              <Link href="/blogs" className="text-slate-600 hover:text-blue-700 transition-colors duration-200 flex items-center space-x-3 group">
                <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                <span className="font-medium">Technical Blogs</span>
              </Link>
              <Link href="/join-us" className="text-slate-600 hover:text-blue-700 transition-colors duration-200 flex items-center space-x-3 group">
                <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                <span className="font-medium">Join IEEE KIET</span>
              </Link>
            </div>
          </div>

          {/* Tech Focus */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 mb-8 tracking-tight">IEEE Societies</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-slate-600 hover:text-slate-800 transition-colors duration-200 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium">Computer Society</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600 hover:text-slate-800 transition-colors duration-200 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium">Power & Energy Society</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600 hover:text-slate-800 transition-colors duration-200 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium">Robotics & Automation</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600 hover:text-slate-800 transition-colors duration-200 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium">Communications Society</span>
              </div>
            </div>
          </div>

          {/* Social Media & Connect */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 mb-8 tracking-tight">Connect With Us</h3>
            <div className="space-y-6">
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/ieee-kiet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition-all duration-300"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://www.instagram.com/ieee_kiet/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition-all duration-300"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://ieee.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition-all duration-300"
                >
                  <Globe size={20} />
                </a>
              </div>
              <div className="text-sm text-slate-600 space-y-3">
                <div className="flex items-center space-x-3">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">420,000+ IEEE Members Worldwide</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">World's Largest Technical Organization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mission Statement */}
        <div className="bg-white rounded-3xl p-10 border border-slate-200/60 mb-16 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full transform translate-x-16 -translate-y-16"></div>
          </div>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h4 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6 tracking-tight">
              Advancing Technology for <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Humanity</span>
            </h4>
            <p className="text-slate-600 leading-relaxed text-lg">
              IEEE is the world's largest technical professional organization dedicated to advancing technology 
              for the benefit of humanity. Through our global network of members, we inspire, enable, 
              and empower the world's engineers and technologists to shape the future.
            </p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-slate-200/60 pt-10 text-center">
          <p className="text-slate-500 text-lg">
            © 2025 IEEE KIET Student Branch. All rights reserved. 
            <span className="block sm:inline sm:ml-2 text-blue-600 font-semibold mt-2 sm:mt-0">
              Advancing Technology for Humanity
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
