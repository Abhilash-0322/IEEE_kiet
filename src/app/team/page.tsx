'use client'; // Required for client-side interactivity

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Linkedin } from "lucide-react";

// IEEE Team member data
const teamMembers = [
  {
    id: 1,
    name: "Rehan Ahmad",
    role: "Chair",
    image: "/rehan.png",
    bio: "Leading the IEEE Student Branch and driving innovation across all technical societies.",
    linkedin: "https://www.linkedin.com/in/rehan-ahmad-2712r/",
  },
  {
    id: 2,
    name: "Diksha Jha",
    role: "Vice Chair",
    image: "/diksha.png",
    bio: "Organizing and managing all IEEE events, workshops, and technical competitions.",
    linkedin: "https://www.linkedin.com/in/diksha-jha-8368a0295/",
  },
  {
    id: 3,
    name: "Sarthak Gupta",
    role: "Secretary",
    image: "/sarthak.png",
    bio: "Managing IEEE communications and coordinating between different societies.",
    linkedin: "https://www.linkedin.com/in/sarthak-stranger/",
  },
  {
    id: 4,
    name: "Vinayak Rastogi",
    role: "Treasurer",
    image: "/vinayak.png",
    bio: "Managing IEEE finances and ensuring proper resource allocation for all activities.",
    linkedin: "https://www.linkedin.com/in/vinayakrastogi3010/",
  },
  {
    id: 5,
    name: "Arpit Goswami",
    role: "Computer Society Lead",
    image: "/arpit.png",
    bio: "Leading IEEE Computer Society activities and technical workshops.",
    linkedin: "https://www.linkedin.com/in/arpit-goswami03/",
  },
  {
    id: 6,
    name: "Shalu Singh",
    role: "Women in Engineering Lead",
    image: "/shalu.png",
    bio: "Promoting women in engineering and organizing WIE events and initiatives.",
    linkedin: "https://www.linkedin.com/in/shalu-singh-26b32027b/",
  },
  {
    id: 7,
    name: "Sunny Kanojiya",
    role: "Communications Society Lead",
    image: "/sunny.png",
    bio: "Leading IEEE Communications Society and networking events.",
    linkedin: "https://www.linkedin.com/in/sunny-kanojiya-248897236/",
  },
  {
    id: 8,
    name: "Raj Singh",
    role: "Power & Energy Society Lead",
    image: "/raj.png",
    bio: "Leading IEEE Power & Energy Society activities and technical projects.",
    linkedin: "https://www.linkedin.com/in/raj-singh-5222a5295/",
  },
  {
    id: 9,
    name: "Devansh Agrahari",
    role: "Robotics & Automation Lead",
    image: "/devansh.png",
    bio: "Leading IEEE Robotics & Automation Society and robotics competitions.",
    linkedin: "https://www.linkedin.com/in/devansh-agrahari-15874229b/",
  },
  {
    id: 10,
    name: "Yash Yadav",
    role: "Research & Development Lead",
    image: "/yash.png",
    bio: "Leading IEEE research initiatives and academic paper publications.",
    linkedin: "https://www.linkedin.com/in/yash-yadav23/",
  }
];

export default function TeamPage() {
  return (
    <>
      <Navbar />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-gray-900 to-black min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              IEEE Executive Committee
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Meet the dedicated leaders who drive IEEE KIET Student Branch forward, bringing their expertise
              and passion to advance technology for humanity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="bg-gray-900/70 backdrop-blur-sm border border-gray-700 p-6 rounded-xl hover:shadow-lg hover:border-[#00629B] transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Clickable Avatar with Rotating Animation */}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative mb-4 group"
                  >
                    <div className="absolute inset-0 rounded-full border-2 border-[#00629B]/30 group-hover:border-[#00629B]/50 transition-all duration-300 animate-orbit">
                      <div className="absolute w-3 h-3 bg-[#FF6B35] rounded-full -top-1 left-1/2 transform -translate-x-1/2 animate-spin-orbit"></div>
                    </div>
                    <Avatar className="h-24 w-24 border-2 border-[#00629B]/20 group-hover:border-[#00629B]/40 transition-all duration-300">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback className="bg-[#00629B] text-white">{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </a>

                  <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                  <p className="text-[#FF6B35] text-sm font-medium mb-4">{member.role}</p>

                  <p className="text-gray-300 text-sm mb-6">
                    {member.bio}
                  </p>

                  <div className="flex space-x-4 mt-auto">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#00629B] transition-colors"
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Orbiting ring animation */
        @keyframes orbit {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Spinning dot animation */
        @keyframes spin-orbit {
          0% {
            transform: translateX(-50%) rotate(0deg) translateY(-1.5rem);
          }
          100% {
            transform: translateX(-50%) rotate(360deg) translateY(-1.5rem);
          }
        }

        .animate-orbit {
          animation: orbit 6s linear infinite;
        }

        .animate-spin-orbit {
          animation: spin-orbit 2s linear infinite;
        }
      `}</style>

      <Footer />
    </>
  );
}