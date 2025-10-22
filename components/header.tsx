"use client"

import { useState, useEffect } from "react"
import { Bell, Settings, LogOut, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["dashboard", "submissions", "evaluation"];
      const scrollPosition = window.scrollY + 100; // Offset for header height
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-gradient-to-r from-card/95 via-primary/5 to-card/95 backdrop-blur-lg supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-primary-foreground font-bold text-base">SP</span>
              </div>
              <span className="font-semibold text-lg">Student Portal</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => scrollToSection("dashboard")} 
                className={`text-sm font-medium transition-colors duration-300 relative ${
                  activeSection === "dashboard" 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Dashboard
                {activeSection === "dashboard" && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </button>
              <button
                onClick={() => scrollToSection("submissions")}
                className={`text-sm font-medium transition-colors duration-300 relative ${
                  activeSection === "submissions" 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Submissions
                {activeSection === "submissions" && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </button>
              <button
                onClick={() => scrollToSection("evaluation")}
                className={`text-sm font-medium transition-colors duration-300 relative ${
                  activeSection === "evaluation" 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Evaluation
                {activeSection === "evaluation" && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button 
              className="md:hidden mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-foreground" />
              )}
            </button>
            <Badge variant="secondary" className="hidden sm:flex bg-primary/10 text-primary border-primary/20">
              Reg: 2024-CS-001
            </Badge>

            <Button
              variant="ghost"
              size="icon"
              className="relative h-11 w-11 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive animate-pulse" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">2024-CS-001</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-3/4 max-w-xs bg-card shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Navigation</h3>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex flex-col space-y-3 pt-4">
                <button
                  onClick={() => {
                    scrollToSection("dashboard");
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-4 rounded-md text-left ${
                    activeSection === "dashboard" 
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-muted"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    scrollToSection("submissions");
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-4 rounded-md text-left ${
                    activeSection === "submissions" 
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-muted"
                  }`}
                >
                  Submissions
                </button>
                <button
                  onClick={() => {
                    scrollToSection("evaluation");
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-4 rounded-md text-left ${
                    activeSection === "evaluation" 
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-muted"
                  }`}
                >
                  Evaluation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
