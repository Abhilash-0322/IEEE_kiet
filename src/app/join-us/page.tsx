'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Lightbulb, Bug, Globe, Award, BookOpen, Zap, Rocket, Shield, Cpu, Database, Users, Mail, Phone, GraduationCap, ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Form data interface
interface MembershipFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  society: string;
  interests: string;
  termsAccepted: boolean;
}

// Form validation interface
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  department?: string;
  society?: string;
  interests?: string;
  termsAccepted?: string;
}

const ieeeSocieties = [
  {
    id: "computer-society",
    name: "Computer Society",
    description: "Software engineering, AI, and emerging technologies",
    icon: Cpu,
    color: "#0066CC",
    benefits: ["Coding Competitions", "AI Workshops", "Tech Mentorship"]
  },
  {
    id: "power-energy",
    name: "Power & Energy Society",
    description: "Electric energy generation and distribution",
    icon: Zap,
    color: "#0066CC",
    benefits: ["Energy Projects", "Smart Grid Research", "Industry Connections"]
  },
  {
    id: "robotics-automation",
    name: "Robotics & Automation",
    description: "Robotics research and automation systems",
    icon: Bug,
    color: "#0066CC",
    benefits: ["Robotics Competitions", "Automation Labs", "Research Papers"]
  },
  {
    id: "communications",
    name: "Communications Society",
    description: "Communications systems and networks",
    icon: Globe,
    color: "#0066CC",
    benefits: ["5G Research", "Network Security", "Wireless Systems"]
  },
  {
    id: "women-engineering",
    name: "Women in Engineering",
    description: "Promoting women engineers and inspiring future generations",
    icon: Shield,
    color: "#0066CC",
    benefits: ["Mentorship Programs", "Leadership Training", "Career Development"]
  },
  {
    id: "research-development",
    name: "Research & Development",
    description: "Research initiatives and publications",
    icon: Rocket,
    color: "#0066CC",
    benefits: ["Paper Publications", "Conference Presentations", "Research Funding"]
  }
];

const membershipBenefits = [
  {
    icon: Users,
    title: "Global Network",
    description: "Connect with 400,000+ IEEE members worldwide"
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    description: "Access to IEEE journals, conferences, and educational materials"
  },
  {
    icon: Award,
    title: "Career Development",
    description: "Professional development opportunities and certifications"
  },
  {
    icon: Globe,
    title: "Industry Connections",
    description: "Network with industry leaders and potential employers"
  }
];

export default function JoinUsPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const societiesRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formData, setFormData] = useState<MembershipFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    society: '',
    interests: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.department) {
      newErrors.department = 'Please select your department';
    }

    if (!formData.society) {
      newErrors.society = 'Please select your preferred society';
    }

    if (!formData.interests.trim()) {
      newErrors.interests = 'Please tell us about your interests';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call - replace with actual endpoint
      const response = await fetch('/api/membership-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your application has been submitted successfully. We will contact you soon.');
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          department: '',
          society: '',
          interests: '',
          termsAccepted: false
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Sorry, there was an error submitting your application. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof MembershipFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

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

    // Societies animation
    if (societiesRef.current) {
      const societyCards = societiesRef.current.querySelectorAll('.society-card');
      gsap.fromTo(
        societyCards,
        { opacity: 0, y: 30, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: societiesRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Benefits animation
    if (benefitsRef.current) {
      const benefitItems = benefitsRef.current.querySelectorAll('.benefit-item');
      gsap.fromTo(
        benefitItems,
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Form animation
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
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
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0066CC] rounded-2xl mb-8 shadow-lg">
                <Users className="text-white h-10 w-10" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-[#0066CC] mb-6">
                Join IEEE KIET
              </h1>
              <p className="text-xl text-[#6B7280] max-w-4xl mx-auto leading-relaxed">
                Become a member of the world's largest technical professional organization and advance your career in engineering and technology. 
                Join our community of innovators and problem solvers.
              </p>
            </div>

            {/* Membership Benefits */}
            <div ref={benefitsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {membershipBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="benefit-item ieee-card ieee-card-hover text-center">
                    <div className="w-16 h-16 bg-[#0066CC] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <IconComponent className="text-white h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0066CC] mb-2">{benefit.title}</h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="ieee-section bg-white">
        <div className="ieee-container">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* IEEE Societies Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-[#0066CC] mb-6">IEEE Societies</h2>
                  <p className="text-[#6B7280] mb-8 leading-relaxed">
                    Choose from our specialized IEEE societies and focus on your areas of interest. 
                    Each society offers unique opportunities for learning, networking, and professional development.
                  </p>
                </div>
                
                <div ref={societiesRef} className="grid grid-cols-1 gap-4">
                  {ieeeSocieties.map((society) => {
                    const IconComponent = society.icon;
                    return (
                      <Card key={society.id} className="society-card ieee-card ieee-card-hover">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-[#0066CC] rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-[#0066CC] text-lg mb-2">{society.name}</h3>
                              <p className="text-[#6B7280] text-sm mb-3">{society.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {society.benefits.map((benefit, index) => (
                                  <span 
                                    key={index}
                                    className="px-3 py-1 bg-[#0066CC]/10 text-[#0066CC] text-xs rounded-full border border-[#0066CC]/20"
                                  >
                                    {benefit}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Membership Application Form */}
              <div ref={formRef} className="ieee-card p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#0066CC] rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <Mail className="text-white h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0066CC]">Membership Application</h2>
                </div>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <p className="text-green-800 text-sm">{submitMessage}</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                      <p className="text-red-800 text-sm">{submitMessage}</p>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-[#374151] font-medium">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Enter your first name"
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs">{errors.firstName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-[#374151] font-medium">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Enter your last name"
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#374151] font-medium">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#374151] font-medium">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-[#374151] font-medium">Academic Department</Label>
                    <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                      <SelectTrigger className={errors.department ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="electrical">Electrical Engineering</SelectItem>
                        <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                        <SelectItem value="civil">Civil Engineering</SelectItem>
                        <SelectItem value="electronics">Electronics & Communication</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.department && (
                      <p className="text-red-500 text-xs">{errors.department}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="society" className="text-[#374151] font-medium">Preferred IEEE Society</Label>
                    <Select value={formData.society} onValueChange={(value) => handleInputChange('society', value)}>
                      <SelectTrigger className={errors.society ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select your preferred society" />
                      </SelectTrigger>
                      <SelectContent>
                        {ieeeSocieties.map((society) => (
                          <SelectItem key={society.id} value={society.id}>
                            {society.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.society && (
                      <p className="text-red-500 text-xs">{errors.society}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests" className="text-[#374151] font-medium">Tell us about your interests</Label>
                    <textarea
                      id="interests"
                      value={formData.interests}
                      onChange={(e) => handleInputChange('interests', e.target.value)}
                      placeholder="Share your technical interests, projects, and why you want to join IEEE"
                      rows={4}
                      className={`w-full p-4 rounded-xl border resize-none ${errors.interests ? "border-red-500" : "border-[#E5E7EB]"}`}
                    />
                    {errors.interests && (
                      <p className="text-red-500 text-xs">{errors.interests}</p>
                    )}
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="terms" 
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => handleInputChange('termsAccepted', checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm text-[#6B7280] leading-relaxed">
                      I agree to the IEEE membership terms and conditions and consent to receive communications from IEEE KIET Student Branch.
                    </Label>
                  </div>
                  {errors.termsAccepted && (
                    <p className="text-red-500 text-xs">{errors.termsAccepted}</p>
                  )}

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full ieee-button text-lg py-4"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
