import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";

// IEEE Gallery images data
const galleryImages = [
  {
    id: "ieee-technical-workshop-1",
    src: "https://ext.same-assets.com/812608780/849522504.jpeg",
    alt: "IEEE Technical Workshop Session",
    title: "IEEE Technical Workshop: AI & ML",
    date: "October 23, 2024",
    description: "Students learning advanced AI and machine learning concepts with hands-on practice. The workshop covered neural networks, deep learning frameworks, and real-world applications."
  },
  {
    id: "ieee-coding-competition-1",
    src: "https://ext.same-assets.com/1856141055/849522504.jpeg",
    alt: "IEEE Coding Competition",
    title: "IEEE Coding Competition 2024",
    date: "November 19, 2024",
    description: "An exciting IEEE-sponsored coding competition featuring algorithmic challenges and problem-solving. Participants competed for IEEE recognition and prizes."
  },
  {
    id: "ieee-robotics-workshop-1",
    src: "https://ext.same-assets.com/812608780/849522504.jpeg",
    alt: "IEEE Robotics Workshop",
    title: "IEEE Robotics & Automation Workshop",
    date: "November 11, 2024",
    description: "A comprehensive workshop on robotics and automation systems. Participants learned about sensors, actuators, control systems, and building autonomous robots."
  },
  {
    id: "ieee-power-energy-1",
    src: "https://ext.same-assets.com/1856141055/849522504.jpeg",
    alt: "IEEE Power & Energy Exhibition",
    title: "IEEE Power & Energy Exhibition",
    date: "November 14, 2024",
    description: "Students showcasing innovative power and energy projects at the IEEE exhibition. The event featured smart grid solutions, renewable energy systems, and energy efficiency projects."
  },
  {
    id: "ieee-communications-1",
    src: "https://ext.same-assets.com/812608780/849522504.jpeg",
    alt: "IEEE Communications Workshop",
    title: "IEEE Communications Workshop: 5G & IoT",
    date: "January 28, 2025",
    description: "Participants learning about 5G networks, IoT protocols, and communication systems. This hands-on workshop covered network architecture and wireless communication technologies."
  },
  {
    id: "ieee-wie-event-1",
    src: "https://ext.same-assets.com/1856141055/849522504.jpeg",
    alt: "IEEE WIE Event",
    title: "IEEE Women in Engineering Leadership Summit",
    date: "March 26, 2025",
    description: "A special event celebrating women in engineering with guest speakers, networking opportunities, and discussions on career development in the engineering field."
  },
  {
    id: "ieee-innovation-summit-1",
    src: "https://ext.same-assets.com/812608780/849522504.jpeg",
    alt: "IEEE Innovation Summit",
    title: "IEEE Innovation Summit 2025",
    date: "March 30, 2025",
    description: "A collaborative innovation summit organized by IEEE KIET. Teams worked on cutting-edge solutions and presented their prototypes to IEEE professionals and industry experts."
  },
  {
    id: "ieee-research-symposium-1",
    src: "https://ext.same-assets.com/1856141055/849522504.jpeg",
    alt: "IEEE Research Symposium",
    title: "IEEE Research Symposium",
    date: "February 15, 2025",
    description: "Students presenting their research papers and projects at the IEEE symposium. The event featured academic discussions, peer reviews, and networking with researchers."
  },
  {
    id: "ieee-project-showcase-1",
    src: "https://ext.same-assets.com/812608780/849522504.jpeg",
    alt: "IEEE Project Showcase",
    title: "IEEE Student Projects Showcase",
    date: "December 10, 2024",
    description: "IEEE members presenting their innovative projects to the KIET community. The showcase featured projects across computer science, electrical engineering, and emerging technologies."
  }
];

export default function GalleryPage() {
  return (
    <>
      <Navbar />

      {/* <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-gray-900 to-black min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              IEEE Event Gallery
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our IEEE events, technical workshops, and activities through this visual journey.
              Click on any image to see more details about the event and IEEE initiatives.
            </p>
          </div>

          <Gallery images={galleryImages} />
        </div>
      </section> */}

      <Footer />
    </>
  );
}