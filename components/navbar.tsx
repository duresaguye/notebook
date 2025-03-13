"use client"
import { useState } from 'react';
import { Menu, X} from 'lucide-react';

import { Button } from './ui/button';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b sticky top-0 bg-background z-50">
      <div className="container px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
      <span className="relative inline-block text-xl font-bold group">
  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-all duration-300"></span>
  <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
    Study<span className="italic font-black text-[1.35rem] tracking-tight">Buddy</span>
    <span className="ml-2 font-mono font-normal uppercase text-sm tracking-wider bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
      AI
    </span>
  </span>
</span>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Desktop Buttons */}
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            Log in
          </Button>
          <Button size="sm" className="hidden sm:inline-flex">Sign up free</Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full w-full bg-background border-b shadow-lg">
          <nav className="container px-4 sm:px-6 py-4 flex flex-col gap-4">
            <a
              href="#features"
              className="py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <div className="flex flex-col gap-2 mt-4">
              <Button variant="outline" className="w-full">Log in</Button>
              <Button className="w-full">Sign up free</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};