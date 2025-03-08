import Link from "next/link"
import { ArrowRight, BookOpen, Brain, MessageSquare, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/feature-card"
import PricingCard from "@/components/pricing-card"
import TestimonialCard from "@/components/testimonial-card"
import HeroAnimation from "@/components/hero-animation"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Navigation */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">StudyBuddy AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Log in
            </Button>
            <Button size="sm">Sign up free</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-28 pl-32">
        <div className="container flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Revolutionize your study habits
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Study Smarter with <span className="text-primary">AI-Powered</span> Notes
            </h1>
            <p className="text-xl text-muted-foreground">
              Take notes, get instant summaries, and chat with your AI study assistant about any topic. Boost your
              productivity and understanding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                See how it works
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                    <img
                      src={`/sara.png?height=32&width=32&text=${i}`}
                      alt="User avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <span className="font-medium">10,000+</span> students already improving their grades
              </div>
            </div>
          </div>
          <div className="flex-1 w-full max-w-xl">
            <HeroAnimation />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50 pl-32">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Supercharge Your Learning</h2>
            <p className="text-xl text-muted-foreground">
              Our AI-powered platform offers everything you need to excel in your studies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* How It Works */}
      <section id="how-it-works" className="py-20 pl-32">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How StudyBuddy AI Works</h2>
            <p className="text-xl text-muted-foreground">Getting started is easy - be up and running in minutes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Create an account",
                description: "Sign up for free and set up your profile with your study preferences and subjects.",
              },
              {
                step: "02",
                title: "Upload or create notes",
                description: "Import existing notes or start creating new ones directly in our intuitive editor.",
              },
              {
                step: "03",
                title: "Let AI enhance your learning",
                description: "Get summaries, ask questions, and watch your understanding and grades improve.",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-7xl font-bold text-primary/10 absolute -top-10 -left-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" className="gap-2">
              Try It Free <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50 pl-32">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              title="Free"
              price="$0"
              description="Perfect for trying out StudyBuddy"
              features={["Basic note-taking", "5 AI summaries per month", "Limited chat with AI", "1 subject"]}
              buttonText="Get Started"
              buttonVariant="outline"
            />
            <PricingCard
              title="Pro"
              price="$9.99"
              period="per month"
              description="Everything you need for serious studying"
              features={[
                "Advanced note-taking",
                "Unlimited AI summaries",
                "Unlimited chat with AI",
                "5 subjects",
                "Exam preparation tools",
                "Priority support",
              ]}
              buttonText="Get Pro"
              buttonVariant="default"
              popular={true}
            />
            <PricingCard
              title="Team"
              price="$19.99"
              period="per month"
              description="Perfect for study groups and classes"
              features={[
                "Everything in Pro",
                "Collaborative notes",
                "Group chat with AI",
                "Unlimited subjects",
                "Admin dashboard",
                "API access",
              ]}
              buttonText="Contact Sales"
              buttonVariant="outline"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 pl-32">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of students improving their academic performance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="StudyBuddy AI helped me raise my GPA from 3.2 to 3.8 in just one semester. The AI summaries and chat feature are game-changers!"
              author="dawit kifle"
              role="Computer Science Student"
              avatarUrl="/dev.png"
            />
            <TestimonialCard
              quote="As a med student, I have tons of material to go through. StudyBuddy organizes everything and helps me understand complex topics quickly."
              author="Sarah Chen"
              role="Medical Student"
              avatarUrl="/sara.png"
            />
            <TestimonialCard
              quote="The exam preparation tools are incredible. I generated practice questions from my notes and aced my finals!"
              author="Beza Tadesse"
              role="Business Major"
              avatarUrl="/beza.png"
            />
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
          <Button size="lg" variant="secondary" className="gap-2">
            Get Started Free <ArrowRight className="h-4 w-4" />
          </Button>
          <p className="mt-4 text-primary-foreground/80">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 pl-32">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-5 w-5 text-primary" />
                <span className="font-bold">StudyBuddy AI</span>
              </div>
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

