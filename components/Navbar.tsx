import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Brain } from 'lucide-react'


export default function Navbar() {
  return (
    <header className="border-b top-0 z-50 bg-white shadow-sm sticky">
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
  )
}
