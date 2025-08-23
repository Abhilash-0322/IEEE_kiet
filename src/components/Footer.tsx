import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Instagram, Mail, Globe, MapPin, Phone, Users, Terminal, Zap, Rocket, Shield, Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/60 py-16">
      <div className="ieee-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo and Address */}
          <div className="flex flex-col lg:col-span-2">
            <Link href="/" className="flex items-center mb-8 group">
              <div className="flex items-center space-x-3 transition-transform duration-300 group-hover:scale-105">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 border border-blue-500/20">
                    <Terminal className="text-white h-7 w-7" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex flex-col">
                  <div className="text-slate-900 font-bold text-2xl tracking-tight">
                    Geek <span className="text-blue-600">Room</span>
                  </div>
                  <div className="text-sm text-slate-500 font-medium tracking-wide uppercase">
                    KIET
                  </div>
                </div>
              </div>
            </Link>
            <div className="text-slate-600 space-y-4 max-w-md">
              <p className="text-base leading-relaxed">
                Empowering the next generation of tech innovators through collaborative learning, cutting-edge projects, and community building.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <p className="text-sm">KIET Group of Institutions, Muradnagar, Ghaziabad, UP</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <a
                    href="mailto:geekroom.kiet@gmail.com"
                    className="text-sm text-inherit no-underline hover:text-blue-700 transition-colors duration-200"
                  >
                    geekroom.kiet@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Navigation</h3>
            <div className="space-y-3">
              <Link href="/events" className="text-slate-600 hover:text-blue-700 transition-colors duration-200 flex items-center space-x-2 group">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                <span>Events</span>
              </Link>
              <Link href="/projects" className="text-slate-600 hover:text-blue-700 transition-colors duration-200 flex items-center space-x-2 group">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                <span>Projects</span>
              </Link>
              <Link href="/team" className="text-slate-600 hover:text-blue-700 transition-colors duration-200 flex items-center space-x-2 group">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                <span>Team</span>
              </Link>
              <Link href="/blogs" className="text-slate-600 hover:text-blue-700 transition-colors duration-200 flex items-center space-x-2 group">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                <span>Blogs</span>
              </Link>
              <Link href="/join-us" className="text-slate-600 hover:text-blue-700 transition-colors duration-200 flex items-center space-x-2 group">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                <span>Join Us</span>
              </Link>
            </div>
          </div>

          {/* Tech Focus */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Focus Areas</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-600">
                <Cpu className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Full-Stack Development</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <Zap className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Machine Learning</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <Rocket className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Innovation Projects</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <Globe className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Open Source</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Cybersecurity</span>
              </div>
            </div>
          </div>

          {/* Social Media & Connect */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Connect With Us</h3>
            <div className="space-y-6">
              <div className="flex space-x-3">
                <a
                  href="https://www.linkedin.com/company/geekroom-kiet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/25"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://www.instagram.com/geekroom_kiet/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-white hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/25"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://github.com/geekroom-kiet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-slate-800 rounded-xl flex items-center justify-center text-white hover:bg-slate-900 transition-all duration-300 shadow-lg shadow-slate-500/25"
                >
                  <Github size={20} />
                </a>
              </div>
              <div className="text-sm text-slate-600 space-y-2">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>50+ Active Members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Terminal className="h-4 w-4 text-blue-600" />
                  <span>Tech Community Hub</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mission Statement */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200/60 mb-12 shadow-sm">
          <div className="text-center max-w-3xl mx-auto">
            <h4 className="text-xl font-bold text-slate-900 mb-4">Building Tomorrow's Tech Leaders</h4>
            <p className="text-slate-600 leading-relaxed text-lg">
              Geek Room KIET is where passion meets innovation. We're a community of developers, designers, and tech enthusiasts 
              working together to solve real-world problems and build the future of technology.
            </p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-slate-200/60 pt-8 text-center">
          <p className="text-sm text-slate-500">
            © 2025 Geek Room KIET. All rights reserved. | 
            <span className="text-blue-600 ml-1 font-medium">Code • Create • Innovate</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
