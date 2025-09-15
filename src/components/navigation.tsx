"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, Zap, Wallet, BarChart3, Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationProps {
  onShowWalkthrough?: () => void
}

export function Navigation({ onShowWalkthrough }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/rewards", label: "Rewards" },
    { href: "/about", label: "About" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold web3-text-gradient">
              Unity Nodes
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              <BarChart3 className="w-3 h-3 mr-1" />
              Live
            </Badge>
            {onShowWalkthrough && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onShowWalkthrough}
                className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <Play className="w-4 h-4 mr-2" />
                Tutorial
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden transition-all duration-300 ease-in-out",
            isOpen
              ? "max-h-96 opacity-100 pb-4"
              : "max-h-0 opacity-0 overflow-hidden"
          )}
        >
          <div className="flex flex-col space-y-2 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-300 hover:text-white transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-slate-800"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-700 space-y-2">
              {onShowWalkthrough && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    onShowWalkthrough()
                    setIsOpen(false)
                  }}
                  className="w-full border-slate-600 text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Tutorial
                </Button>
              )}
              <Button className="w-full web3-button-primary">
                <Wallet className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
