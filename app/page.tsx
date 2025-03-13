import Link from "next/link"
import { ArrowRight, BookOpen, Brain, MessageSquare, Sparkles, Zap,ChevronRight,CheckCircle, Lock   } from "lucide-react"
import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/feature-card"
import PricingCard from "@/components/pricing-card"
import TestimonialCard from "@/components/testimonial-card"
import HeroAnimation from "@/components/hero-animation"
import Navbar from "@/components/navbar"


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Navigation */}
     <Navbar />

     {/* Hero Section */}
<section className="py-8 md:py-4 lg:py-32 xl:py-40 bg-gradient-to-b from-background via-[#fafaff] to-background  lg:ml-32">
  <div className="container px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10 xl:gap-20">
    <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left">
      {/* Badge */}
      <div className="inline-flex items-center rounded-full bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-2.5 text-sm font-medium backdrop-blur-lg transition-all hover:scale-[1.02] hover:shadow-sm mx-auto lg:mx-0">
        <span className="flex h-2 w-2 rounded-full bg-gradient-to-r from-primary to-blue-600 mr-2"></span>
        Revolutionize your study habits
      </div>

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
        Study Smarter with<br/>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">AI-Powered Notes</span>
      </h1>

      {/* Subtext */}
      <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 lg:pr-10 leading-relaxed">
        Transform your learning experience with intelligent note-taking, instant summaries, and 24/7 AI tutoring tailored to your study style.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <Button 
          size="lg" 
          className="gap-2 w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-primary/30"
        >
          Get Started Free
          <ArrowRight className="h-5 w-5 mt-0.5" />
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="w-full sm:w-auto border-2 hover:border-primary/50 hover:bg-accent/50 hover:text-foreground transition-all group"
        >
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            See how it works
          </span>
          <ChevronRight className="h-4 w-4 ml-1 text-primary transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      {/* Avatar Stack */}
      <div className="flex flex-col sm:flex-row items-center gap-5 text-sm ">
        <div className="flex -space-x-3 group relative transition-all duration-500 hover:-space-x-1">
          {["sara", "beza", "dev", "hero"].map((name, index) => (
            <div 
              key={name}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-background bg-muted overflow-hidden 
                        transition-all duration-500 transform hover:scale-110 hover:z-10 hover:shadow-lg
                        group-hover:-rotate-12 group-hover:translate-y-2 first:group-hover:-translate-x-2 last:group-hover:translate-x-2"
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <img
                src={`/${name}.png`}
                alt={`${name}'s avatar`}
                className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
        <div className="text-center sm:text-left">
          <span className="font-medium bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            10,000+
          </span> 
          <span className="text-muted-foreground"> students already boosting their GPA</span>
        </div>
      </div>
    </div>

    {/* Hero Graphic */}
    <div className="flex-1 w-full max-w-2xl mt-12 lg:mt-0 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 blur-3xl rounded-full -z-10" />
      <HeroAnimation className="w-full h-auto rounded-2xl shadow-2xl border bg-background" />
    </div>
  </div>
</section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-20   lg:ml-32">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Supercharge Your Learning</h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Our AI-powered platform offers everything you need to excel in your studies
            </p>
          </div>


          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard
              icon={<BookOpen className="h-8 w-8 text-primary" />}
              title="Smart Note-Taking"
              description="Take notes naturally while our AI organizes and enhances them with relevant information."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-primary" />}
              title="Instant Summaries"
              description="Get concise summaries of your notes, textbooks, or any study material with one click."
            />
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8 text-primary" />}
              title="AI Study Companion"
              description="Chat with your AI about your notes. Ask questions, get explanations, and deepen your understanding."
            />
            <FeatureCard
              icon={<Sparkles className="h-8 w-8 text-primary" />}
              title="Concept Connections"
              description="Discover connections between topics and concepts across different subjects."
            />
            <FeatureCard
              icon={<Brain className="h-8 w-8 text-primary" />}
              title="Personalized Learning"
              description="The more you use StudyBuddy, the better it understands your learning style and needs."
            />
            <FeatureCard
              icon={<ArrowRight className="h-8 w-8 text-primary" />}
              title="Exam Preparation"
              description="Generate practice questions, flashcards, and study guides from your notes."
            />
          </div>
        </div>
      </section>
{/* How It Works - Modern Version */}
<section id="how-it-works" className="py-12 md:py-20 lg:py-24">
  <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
    {/* Section Header */}
    <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 lg:mb-20">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-5 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
        How StudyBuddy AI Works
      </h2>
      <p className="text-base md:text-lg text-muted-foreground">
        Transform your learning in three simple steps
      </p>
    </div>

    {/* Steps Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 relative">
      {/* Progress Line */}
      <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-border to-transparent" />

      {[
        {
          step: "1",
          title: "Create Your Account",
          description: "Start with a free account and customize your learning profile",
        },
        {
          step: "2",
          title: "Add Study Materials",
          description: "Upload documents or create notes with our smart editor",
        },
        {
          step: "3",
          title: "AI-Powered Learning",
          description: "Get instant summaries, Q&A, and progress insights",
        },
      ].map((item, index) => (
        <div 
          key={index}
          className="group relative flex flex-col items-center p-6 md:p-8 bg-card rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-out"
        >
          {/* Animated Step Indicator */}
          <div className="mb-6 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center transition-all group-hover:bg-primary/20">
            <span className="text-2xl font-bold text-primary">{item.step}</span>
          </div>

          {/* Content */}
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-semibold mb-3">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Mobile Progress Line */}
          {index !== 2 && (
            <div className="md:hidden absolute -bottom-8 left-1/2 w-1 h-8 bg-border -translate-x-1/2" />
          )}
        </div>
      ))}
    </div>

    {/* CTA Button */}
    <div className="mt-14 md:mt-16 text-center">
      <Button 
        size="lg" 
        className="gap-3 px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
      >
        Start Free Trial
        <ArrowRight className="h-5 w-5 mt-0.5" />
      </Button>
    </div>
  </div>
</section>

<section id="pricing" className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-primary/5">
  {/* Decorative background elements */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute left-1/4 top-1/3 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary/10 to-purple-500/10 blur-3xl opacity-50" />
  </div>

  <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 lg:mb-20">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent mb-4">
        Simple & Transparent Pricing
      </h2>
      <p className="text-lg md:text-xl text-muted-foreground/80">
        Start for free, upgrade as you grow
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
      {/* Free Tier */}
      <PricingCard
        title="Starter"
        price="$0"
        description="Perfect for exploring StudyBuddy"
        features={[
          "Basic note-taking",
          "5 AI summaries/month",
          "Limited chat access",
          "1 subject"
        ]}
        buttonText="Get Started"
        buttonVariant="outline"
        className="border border-primary/10 bg-background/50 backdrop-blur-sm hover:border-primary/20 transition-all"
      />

      {/* Pro Tier - Featured */}
      <PricingCard
        title="Pro Scholar"
        price="$9.99"
        period="per month"
        description="Optimal for serious learners"
        features={[
          "Advanced note-taking",
          "Unlimited AI summaries",
          "24/7 AI tutor access",
          "5 subjects",
          "Exam prep toolkit",
          "Priority support"
        ]}
        buttonText="Start Learning"
         buttonVariant="default"
        popular={true}
        className="relative border-2 border-primary/20 bg-gradient-to-b from-primary/5 to-background/50 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all"
        ribbon="Most Popular"
      />

      {/* Team Tier */}
      <PricingCard
        title="Study Squad"
        price="$19.99"
        period="per month"
        description="Collaborative learning solution"
        features={[
          "All Pro features",
          "Group workspace",
          "Shared AI resources",
          "Unlimited subjects",
          "Admin dashboard",
          "API & integrations"
        ]}
        buttonText="Team Inquiry"
        buttonVariant="outline"
        className="border border-primary/10 bg-background/50 backdrop-blur-sm hover:border-primary/20 transition-all"
      />
    </div>

    {/* Trust elements */}
    <div className="mt-16 md:mt-20 text-center text-sm text-muted-foreground/80 flex flex-col items-center gap-2">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> 30-day guarantee</span>
        <span className="flex items-center gap-2"><Lock className="h-4 w-4 text-blue-500" /> Secure payments</span>
      </div>
    </div>
  </div>
</section>

{/* Testimonials */}<section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background/50 to-primary/5">
  {/* Decorative background elements */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute left-1/3 top-20 h-[400px] w-[600px] bg-gradient-to-r from-primary/10 to-secondary/10 -translate-y-1/2 rotate-45 rounded-3xl blur-3xl" />
  </div>

  <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    {/* Header section */}
    <div className="text-start max-w-4xl mb-12 md:mb-16 lg:mb-20 space-y-4">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
        What Our <span className="italic">Brilliant</span> Users Say
      </h2>
      
      <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl">
        Join <span className="font-semibold text-primary">30,000+</span> students boosting their learning outcomes
      </p>
    </div>

    {/* Card grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
      <TestimonialCard
        quote="StudyBuddy AI helped me raise my GPA from 3.2 to 3.8 in just one semester. The AI summaries and chat feature are game-changers!"
        author="Dawit Kifle"
        role="Computer Science Student"
        avatarUrl="/dev.png"
        className="hover:shadow-2xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-2 border border-transparent bg-background/50 backdrop-blur-sm"
      />
      <TestimonialCard
        quote="As a med student, I have tons of material to go through. StudyBuddy organizes everything and helps me understand complex topics quickly."
        author="Sarah Chen"
        role="Medical Student"
        avatarUrl="/sara.png"
        className="hover:shadow-2xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-2 border border-transparent bg-background/50 backdrop-blur-sm"
      />
      <TestimonialCard
        quote="The exam preparation tools are incredible. I generated practice questions from my notes and aced my finals!"
        author="Beza Tadesse"
        role="Business Major"
        avatarUrl="/beza.png"
        className="hover:shadow-2xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-2 border border-transparent bg-background/50 backdrop-blur-sm"
      />
    </div>

    {/* Stats section */}
    <div className="mt-16 md:mt-20 flex flex-wrap gap-8 items-center justify-center text-muted-foreground/80 border-t pt-12">
      <div className="flex items-center gap-2 px-4 py-2 bg-background/80 rounded-full">
        <div className="h-3 w-3 bg-green-500 rounded-full" />
        <span className="font-medium">4.9/5 Average Rating</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-background/80 rounded-full">
        <div className="h-3 w-3 bg-purple-500 rounded-full" />
        <span className="font-medium">98% Success Rate</span>
      </div>
    </div>
  </div>
</section>
      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Study Experience?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join thousands of students who are studying smarter, not harder.
          </p>
           <Link href="/notes">
           <Button size="lg" variant="secondary" className="gap-2">
            Get Started Free <ArrowRight className="h-4 w-4" />
          </Button>
           </Link>
          
          <p className="mt-4 text-primary-foreground/80">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 pl-32">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
            <span className="relative inline-block text-xl font-bold group">
  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-all duration-300"></span>
  <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
    Study<span className="italic font-black text-[1.35rem] tracking-tight">Buddy</span>
    <span className="ml-2 font-mono font-normal uppercase text-sm tracking-wider bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
      AI
    </span>
  </span>
</span>
              <p className="text-sm text-muted-foreground">
                Revolutionizing the way students learn with AI-powered tools.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-3">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} StudyBuddy AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

