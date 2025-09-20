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
//   {}
  {
    id: 1,
    name: "Rehan Ahmad",
    role: "Chair",
    image: "/rehan.png",
    bio: "Leading the IEEE Student Branch and driving innovation across all technical societies.",
    linkedin: "https://www.linkedin.com/in/rehan-ahmad-2712r/",
  },
  {
    id: 9,
    name: "Devansh Agrahari",
    role: "Treasurar",
    image: "/devansh.png",
    bio: "Leading IEEE Robotics & Automation Society and robotics competitions.",
    linkedin: "https://www.linkedin.com/in/devansh-agrahari-15874229b/",
  },
];

export default function TeamPage() {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white min-h-[60vh] flex items-center">
        <div className="ieee-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              Our <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Leadership</span> Team
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Meet the dedicated professionals driving IEEE KIET Student Branch forward, 
              bringing expertise, innovation, and passion to advance technology for humanity.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20 bg-slate-50">
        <div className="ieee-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={member.id}
                className="bg-white border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden rounded-3xl"
              >
                <div className="p-8">
                  {/* Avatar Section */}
                  <div className="relative mb-6 flex justify-center">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-100 group-hover:border-blue-200 transition-colors duration-300 shadow-lg">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                    <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
                      {member.role}
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                      {member.bio}
                    </p>

                    {/* LinkedIn Link */}
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl text-white hover:shadow-lg hover:scale-110 transition-all duration-300"
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

      <Footer />
    </>
  );
}