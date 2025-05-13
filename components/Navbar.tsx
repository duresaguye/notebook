import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="border-b top-0 z-50 bg-white dark:bg-gray-900 shadow-sm sticky">
      <div className="container flex items-center justify-between py-4 relative">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold pl-2 dark:text-white">StudyBuddy AI</span>
        </div>
        
        {/* Centered Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          <Link 
            href="#features" 
            className="text-sm font-medium hover:text-primary dark:hover:text-primary-400 transition-colors"
          >
            Features
          </Link>
          <Link 
            href="#how-it-works" 
            className="text-sm font-medium hover:text-primary dark:hover:text-primary-400 transition-colors"
          >
            How It Works
          </Link>
        </nav>

        {/* Right-side placeholder to balance layout */}
        <div className="md:invisible" /> 
      </div>
    </header>
  )
}