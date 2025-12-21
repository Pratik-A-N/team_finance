import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Phone, TrendingUp, Shield, Heart, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import ThemeToggle from "@/components/ThemeToggle";
import logoImage from "@assets/Adobe_Express_-_file_1765473251320.png";

const services = [
  {
    title: "Mutual Funds",
    description: "Build wealth with diversified investment portfolios",
    icon: TrendingUp,
    href: "#services",
  },
  {
    title: "Term Insurance",
    description: "Protect your family's financial future",
    icon: Shield,
    href: "#services",
  },
  {
    title: "Health Insurance",
    description: "Comprehensive medical coverage for your loved ones",
    icon: Heart,
    href: "#services",
  },
];

interface HeaderProps {
  onContactClick?: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth();

  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace("#", ""));
    if (element) {
      const headerOffset = 20;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <a
            href="#"
            className="flex items-center gap-2"
            data-testid="link-home"
          >
            <img
              src={logoImage}
              alt="Team Finance Logo"
              className="h-12 w-auto"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="gap-1 text-sm font-medium"
                  data-testid="nav-services"
                >
                  Services
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[320px]">
                {services.map((service) => (
                  <DropdownMenuItem
                    key={service.title}
                    className="flex items-start gap-3 p-3 cursor-pointer"
                    onClick={() => scrollToSection(service.href)}
                    data-testid={`nav-${service.title.toLowerCase().replace(" ", "-")}`}
                  >
                    <service.icon className="w-5 h-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">
                        {service.title}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              className="text-sm font-medium"
              onClick={() => scrollToSection("#about")}
              data-testid="nav-about"
            >
              About Us
            </Button>
            <Button
              variant="ghost"
              className="text-sm font-medium"
              onClick={() => scrollToSection("#testimonials")}
              data-testid="nav-testimonials"
            >
              Testimonials
            </Button>
            <Button
              variant="ghost"
              className="text-sm font-medium"
              onClick={() => scrollToSection("#calculator")}
              data-testid="nav-calculator"
            >
              Calculator
            </Button>
            <Button
              variant="ghost"
              className="text-sm font-medium"
              onClick={() => scrollToSection("#faq")}
              data-testid="nav-faq"
            >
              FAQ
            </Button>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              data-testid="button-call"
              asChild
            >
              <a href="https://wa.me/919820320216" target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4" />
                <span>+91 9820320216</span>
              </a>
            </Button>
            {!isLoading && (
              isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2" data-testid="button-user-menu">
                      <Avatar className="w-7 h-7">
                        <AvatarImage src={user?.profileImageUrl || undefined} alt="Profile" />
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="max-w-[100px] truncate">
                        {user?.firstName || user?.email?.split('@')[0] || 'User'}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center gap-2" data-testid="link-dashboard">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center gap-2" data-testid="link-profile">
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <a href="/api/logout" className="flex items-center gap-2" data-testid="link-logout">
                        <LogOut className="w-4 h-4" />
                        Logout
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = '/api/login'}
                  data-testid="button-login"
                >
                  Login
                </Button>
              )
            )}
            <Button
              onClick={onContactClick}
              data-testid="button-get-started"
            >
              Get Free Consultation
            </Button>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                data-testid="button-mobile-menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80">
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex items-center justify-between">
                  <img
                    src={logoImage}
                    alt="Team Finance Logo"
                    className="h-10 w-auto"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-muted-foreground px-2 mb-2">
                    Services
                  </p>
                  {services.map((service) => (
                    <a
                      key={service.title}
                      href={service.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(service.href);
                      }}
                      className="flex items-center gap-3 rounded-md p-3 hover-elevate"
                      data-testid={`mobile-nav-${service.title.toLowerCase().replace(" ", "-")}`}
                    >
                      <service.icon className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">{service.title}</span>
                    </a>
                  ))}
                  <div className="border-t my-2" />
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#about");
                    }}
                    className="rounded-md p-3 font-medium hover-elevate"
                    data-testid="mobile-nav-about"
                  >
                    About Us
                  </a>
                  <a
                    href="#testimonials"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#testimonials");
                    }}
                    className="rounded-md p-3 font-medium hover-elevate"
                    data-testid="mobile-nav-testimonials"
                  >
                    Testimonials
                  </a>
                  <a
                    href="#calculator"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#calculator");
                    }}
                    className="rounded-md p-3 font-medium hover-elevate"
                    data-testid="mobile-nav-calculator"
                  >
                    Calculator
                  </a>
                  <a
                    href="#faq"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#faq");
                    }}
                    className="rounded-md p-3 font-medium hover-elevate"
                    data-testid="mobile-nav-faq"
                  >
                    FAQ
                  </a>
                </nav>
                <div className="flex items-center justify-between py-2 border-t mt-2">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
                <div className="flex flex-col gap-3 mt-4">
                  {!isLoading && (
                    isAuthenticated ? (
                      <>
                        <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user?.profileImageUrl || undefined} alt="Profile" />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {getInitials()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate" data-testid="mobile-text-user-name">
                              {user?.firstName && user?.lastName 
                                ? `${user.firstName} ${user.lastName}`
                                : user?.email?.split('@')[0] || 'User'}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">
                              {user?.email || ''}
                            </p>
                          </div>
                        </div>
                        <Link href="/dashboard">
                          <Button
                            variant="default"
                            className="gap-2 w-full"
                            onClick={() => setMobileOpen(false)}
                            data-testid="mobile-link-dashboard"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Button>
                        </Link>
                        <Link href="/profile">
                          <Button
                            variant="outline"
                            className="gap-2 w-full"
                            onClick={() => setMobileOpen(false)}
                            data-testid="mobile-link-profile"
                          >
                            <User className="w-4 h-4" />
                            My Profile
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          className="gap-2 w-full"
                          onClick={() => window.location.href = '/api/logout'}
                          data-testid="mobile-link-logout"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        className="gap-2 w-full"
                        onClick={() => window.location.href = '/api/login'}
                        data-testid="mobile-button-login"
                      >
                        <User className="w-4 h-4" />
                        Login
                      </Button>
                    )
                  )}
                  <Button
                    variant="outline"
                    className="gap-2 w-full"
                    data-testid="mobile-button-call"
                    asChild
                  >
                    <a href="https://wa.me/919820320216" target="_blank" rel="noopener noreferrer">
                      <Phone className="w-4 h-4" />
                      +91 9820320216
                    </a>
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => {
                      setMobileOpen(false);
                      onContactClick?.();
                    }}
                    data-testid="mobile-button-get-started"
                  >
                    Get Free Consultation
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
