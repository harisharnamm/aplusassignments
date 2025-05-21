"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MessageSquare, MapPin, Clock } from "lucide-react"
import FAQSection from "@/components/faq-section"

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success")
    }, 1500)
  }

  const faqs = [
    {
      question: "How quickly will you respond to my inquiry?",
      answer:
        "We aim to respond to all inquiries within 2-4 hours during our business hours (9 AM - 9 PM EST). For urgent matters, we recommend using our live chat for immediate assistance.",
    },
    {
      question: "Can I speak directly with my assigned expert?",
      answer:
        "Yes, once you've been matched with an expert, you can communicate directly with them through our secure messaging system. This ensures clear communication while maintaining your privacy.",
    },
    {
      question: "Do you offer refunds if I'm not satisfied?",
      answer:
        "Yes, we have a satisfaction guarantee. If you're not completely satisfied with our service, we offer revisions and, in some cases, partial or full refunds according to our refund policy.",
    },
    {
      question: "How do I check the status of my assignment?",
      answer:
        "You can check the status of your assignment by logging into your account dashboard or by contacting our customer support team with your order number.",
    },
  ]

  return (
    <>
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h1 className="font-poppins text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help. Reach out to our team through any of the methods
              below.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-1 lg:col-span-2">
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md border p-6 md:p-8">
                <h2 className="font-poppins text-2xl font-bold mb-6">Get in Touch</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="quote">Quote Request</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px]" required />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                    disabled={formStatus === "submitting"}
                  >
                    {formStatus === "idle" && "Send Message"}
                    {formStatus === "submitting" && (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    )}
                    {formStatus === "success" && "Message Sent!"}
                    {formStatus === "error" && "Error - Try Again"}
                  </Button>
                </form>

                {formStatus === "success" && (
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 rounded-md flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <path d="M16 6l-8.5 8.5-4-4"></path>
                    </svg>
                    <span>Thank you! Your message has been sent successfully. We'll get back to you shortly.</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md border p-6 md:p-8">
                <h2 className="font-poppins text-2xl font-bold mb-6">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground mb-1">For general inquiries:</p>
                      <a href="mailto:info@assignmentace.com" className="text-indigo-600 hover:underline">
                        info@assignmentace.com
                      </a>
                      <p className="text-muted-foreground mt-2 mb-1">For support:</p>
                      <a href="mailto:support@assignmentace.com" className="text-indigo-600 hover:underline">
                        support@assignmentace.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-muted-foreground mb-1">Customer Service:</p>
                      <a href="tel:+11234567890" className="text-indigo-600 hover:underline">
                        +1 (123) 456-7890
                      </a>
                      <p className="text-muted-foreground mt-2 mb-1">Urgent Support:</p>
                      <a href="tel:+18001234567" className="text-indigo-600 hover:underline">
                        +1 (800) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Live Chat</h3>
                      <p className="text-muted-foreground mb-2">
                        Our support team is available via live chat during business hours.
                      </p>
                      <Button variant="outline" className="gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Start Chat
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 9 AM - 9 PM EST</p>
                      <p className="text-muted-foreground">Saturday: 10 AM - 6 PM EST</p>
                      <p className="text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-poppins text-2xl md:text-3xl font-bold mb-2">Our Location</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              While we primarily operate online, you can find our virtual office at the following address.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md border overflow-hidden">
            <div className="aspect-video w-full">
              <Image
                src="/placeholder.svg?height=400&width=800"
                width={800}
                height={400}
                alt="Map location"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Virtual Office Address</h3>
                  <p className="text-muted-foreground">
                    123 Academic Way, Suite 456
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </p>
                </div>
              </div>
              <Button
                asChild
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        faqs={faqs}
        title="Contact FAQs"
        description="Find answers to common questions about contacting and working with us."
      />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-white/80 mb-8 text-lg">
              Don't wait until the last minute. Upload your assignment now and get the help you need.
            </p>
            <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
              <Link href="/upload">Upload Your Assignment</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
