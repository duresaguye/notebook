"use client"
import { useState } from 'react';
import { Menu, X, Brain } from 'lucide-react';
import { Button } from './ui/button';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b sticky top-0 bg-background z-50">
      <div className="container px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">StudyBuddy AI</span>
        </div>

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