'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, Award, Zap, Globe, Rocket } from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    id: "ieee-technical-workshop",
    date: "15 March 2025",
    time: "10:00 AM - 4:00 PM",
    location: "KIET Campus, Auditorium",
    attendees: "100+",
    upcoming: true,
    title: "IEEE Technical Workshop",
    description:
      "Join us for an intensive technical workshop covering emerging technologies in AI, IoT, and Robotics. Learn from industry experts and gain hands-on experience with cutting-edge tools and frameworks.",
    image: "/3.jpg",
    category: "Workshop",
    features: ["AI & Machine Learning", "IoT Development", "Robotics Programming", "Networking Session"]
  },
];

export default function EventsPage() {
  const eventsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero section animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          ease: "power3.out"
        }
      );
    }

    // Events grid animation
    if (eventsRef.current) {
      const eventCards = eventsRef.current.querySelectorAll('.event-card');
      gsap.fromTo(
        eventCards,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: eventsRef.current,
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
        className="ieee-section bg-gradient-to-b from-white to-[#FAFBFC]"
      >
        <div className="ieee-container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0066CC] rounded-2xl mb-8 shadow-lg">
              <Calendar className="text-white h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0066CC] mb-6">
              IEEE Events
            </h1>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto leading-relaxed">
              Join us for technical workshops, competitions, and innovation events that advance technology for humanity. 
              Experience cutting-edge technology and connect with industry experts.
            </p>
          </div>

          {/* Event Stats */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
              <div className="text-3xl font-bold text-[#0066CC] mb-2">4</div>
              <div className="text-[#6B7280] text-sm">Upcoming Events</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
              <div className="text-3xl font-bold text-[#0066CC] mb-2">530+</div>
              <div className="text-[#6B7280] text-sm">Total Attendees</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
              <div className="text-3xl font-bold text-[#0066CC] mb-2">4</div>
              <div className="text-[#6B7280] text-sm">Event Categories</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
              <div className="text-3xl font-bold text-[#0066CC] mb-2">100%</div>
              <div className="text-[#6B7280] text-sm">IEEE Certified</div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Events Grid */}
      <section className="ieee-section bg-white">
        <div className="ieee-container">
          <div ref={eventsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <Card key={event.id} className="event-card ieee-card ieee-card-hover overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Event Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="ieee-badge ieee-badge-primary">
                      {event.category}
                    </span>
                  </div>
                  
                  {/* Upcoming Badge */}
                  {event.upcoming && (
                    <div className="absolute top-4 right-4">
                      <span className="ieee-badge ieee-badge-secondary">
                        Upcoming
                      </span>
                    </div>
                  )}
                  
                  {/* Event Title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl font-bold text-white mb-2">{event.title}</h2>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Event Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-[#6B7280] text-sm">
                      <Clock className="h-4 w-4 text-[#0066CC] mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-[#6B7280] text-sm">
                      <MapPin className="h-4 w-4 text-[#0066CC] mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-[#6B7280] text-sm">
                      <Calendar className="h-4 w-4 text-[#0066CC] mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-[#6B7280] text-sm">
                      <Users className="h-4 w-4 text-[#0066CC] mr-2" />
                      {event.attendees}
                    </div>
                  </div>

                  <p className="text-[#6B7280] mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Event Features */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {event.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-xs text-[#6B7280]">
                        <div className="w-2 h-2 bg-[#0066CC] rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Link href={`/events/${event.id}`} className="w-full">
                    <Button className="w-full ieee-button">
                      <Globe className="mr-2 h-4 w-4" />
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          {/* <div className="text-center mt-16">
            <div className="bg-white rounded-xl p-8 border border-[#E5E7EB] max-w-2xl mx-auto shadow-sm">
              <h3 className="text-2xl font-bold text-[#0066CC] mb-4">
                Stay Updated with IEEE Events
              </h3>
              <p className="text-[#6B7280] mb-6 leading-relaxed">
                Subscribe to our newsletter to get notified about upcoming IEEE events, workshops, and competitions.
              </p>
              <Button className="ieee-button-outline">
                <Rocket className="mr-2 h-5 w-5" />
                Subscribe to Updates
              </Button>
            </div>
          </div> */}
        </div>
      </section>

      <Footer />
    </>
  );
}
