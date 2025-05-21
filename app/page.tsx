import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, CheckCircle, GraduationCap, Upload, DollarSign, FileCheck } from "lucide-react"
import FAQSection from "@/components/faq-section"
import CookieConsent from "@/components/cookie-consent"

export default function Home() {
  const faqs = [
    {
      question: "How much does your service cost?",
      answer:
        "Our pricing depends on several factors including academic level, deadline, and complexity of the assignment. After you upload your assignment, we'll provide a free quote within 1 hour.",
    },
    {
      question: "What's your typical turnaround time?",
      answer:
        "Our turnaround time varies based on the complexity and length of the assignment. We can accommodate urgent deadlines as short as 24 hours, but we recommend giving us more time for the best results.",
    },
    {
      question: "Do you guarantee original work?",
      answer:
        "All our assignments are written from scratch and go through a plagiarism check before delivery. We guarantee 100% original content tailored to your specific requirements.",
    },
    {
      question: "What subjects do you cover?",
      answer:
        "We cover a wide range of subjects including Business, Engineering, Computer Science, Humanities, Social Sciences, Medicine, Law, and many more. Our expert writers have diverse academic backgrounds.",
    },
    {
      question: "Is my information kept confidential?",
      answer:
        "Yes, we take privacy very seriously. All your personal information and assignment details are kept strictly confidential. We use secure encryption for all data transfers.",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 z-0"></div>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        <div className="container relative z-10 py-16 md:py-24 lg:py-32">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="flex flex-col gap-6">
              <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Your Assignment{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                  Deadline Lifesaver
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Professional help for any subject, any complexity. Get expert assistance when you need it most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  <Link href="/upload">Upload Your Assignment</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#how-it-works">How It Works</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-lg overflow-hidden shadow-xl transform transition-all hover:scale-[1.01] duration-500">
                <Image
                  src="/hero-img.jpg"
                  width={600}
                  height={600}
                  alt="Student studying with laptop and books"
                  className="w-full h-auto"
                  priority
                />
              </div>
              <div className="absolute -z-10 -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services/Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-4">Why Choose AssignmentAce?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive assignment help services designed to meet your academic needs.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-950 rounded-lg p-6 shadow-md border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-200 hover:border-indigo-200 dark:hover:border-indigo-900">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-poppins text-xl font-semibold mb-2">Expert Writers</h3>
              <p className="text-muted-foreground">
                Our team consists of qualified professionals with advanced degrees across various disciplines.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-950 rounded-lg p-6 shadow-md border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-200 hover:border-indigo-200 dark:hover:border-indigo-900">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-poppins text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">
                Our dedicated support team is available around the clock to assist with any questions or concerns.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-950 rounded-lg p-6 shadow-md border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-200 hover:border-indigo-200 dark:hover:border-indigo-900">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-poppins text-xl font-semibold mb-2">Any Subject</h3>
              <p className="text-muted-foreground">
                From engineering to literature, we cover all academic disciplines with specialized expertise.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-gray-950 rounded-lg p-6 shadow-md border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-200 hover:border-indigo-200 dark:hover:border-indigo-900">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-poppins text-xl font-semibold mb-2">Guaranteed Quality</h3>
              <p className="text-muted-foreground">
                We guarantee plagiarism-free, high-quality work that meets all your requirements and deadlines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Getting help with your assignments is easy with our simple 3-step process.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mb-4 z-10">
                1
              </div>
              <div className="absolute top-8 left-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 w-full hidden md:block"></div>
              <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-poppins text-xl font-semibold mb-2">Upload your assignment</h3>
              <p className="text-muted-foreground">
                Submit your assignment details and requirements through our secure upload system.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mb-4 z-10">
                2
              </div>
              <div className="absolute top-8 left-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 w-full hidden md:block"></div>
              <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center mb-4">
                <DollarSign className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-poppins text-xl font-semibold mb-2">Receive your quote</h3>
              <p className="text-muted-foreground">
                Get a personalized quote based on your specific requirements within 1 hour.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mb-4 z-10">
                3
              </div>
              <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center mb-4">
                <FileCheck className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-poppins text-xl font-semibold mb-2">Get your completed work</h3>
              <p className="text-muted-foreground">
                Receive your high-quality, plagiarism-free assignment delivered on time.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              <Link href="/upload">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what students have to say about our services.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-white dark:bg-gray-950 rounded-lg p-6 shadow-md border border-gray-100 dark:border-gray-800">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "AssignmentAce saved my semester! I was struggling with my engineering project and their expert helped
                me not only complete it on time but also understand the concepts better."
              </p>
              <div>
                <p className="font-semibold">Engineering Student</p>
                <p className="text-sm text-muted-foreground">MIT, Mechanical Engineering</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white dark:bg-gray-950 rounded-lg p-6 shadow-md border border-gray-100 dark:border-gray-800">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "The quality of work I received was outstanding. My psychology paper was well-researched, properly
                cited, and delivered ahead of schedule. Highly recommend!"
              </p>
              <div>
                <p className="font-semibold">Psychology Major</p>
                <p className="text-sm text-muted-foreground">Stanford University, Psychology</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white dark:bg-gray-950 rounded-lg p-6 shadow-md border border-gray-100 dark:border-gray-800">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "As a working student, I often struggle with time management. AssignmentAce has been a lifesaver,
                helping me balance work and studies without compromising on quality."
              </p>
              <div>
                <p className="font-semibold">Business Student</p>
                <p className="text-sm text-muted-foreground">NYU, Business Administration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-poppins text-xl font-medium text-muted-foreground">Trusted By Students From</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {["Harvard University", "Stanford University", "MIT", "Oxford University"].map((university, i) => (
              <div
                key={i}
                className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <div className="flex items-center justify-center h-12 bg-white dark:bg-gray-800 rounded-md px-4 py-2 shadow-sm">
                  <span className="font-medium text-sm md:text-base text-gray-700 dark:text-gray-300">{university}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-4">Ready to Ace Your Assignments?</h2>
            <p className="text-white/80 mb-8 text-lg">
              Join thousands of students who trust AssignmentAce for their academic success.
            </p>
            <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
              <Link href="/upload">Upload Your Assignment Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cookie Consent Banner */}
      <CookieConsent />
    </>
  )
}
