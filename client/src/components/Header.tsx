import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Phone, TrendingUp, Shield, Heart, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logoImage from "@assets/abhishek_ghayre_this_is_our_orignal_company_logo_we_are_starti_1765044564982.png";

const services = [
  {
    title: "Mutual Funds",
    description: "Build wealth with diversified investment portfolios",
    icon: TrendingUp,
    href: "#mutual-funds",
  },
  {
    title: "Term Insurance",
    description: "Protect your family's financial future",
    icon: Shield,
    href: "#term-insurance",
  },
  {
    title: "Health Insurance",
    description: "Comprehensive medical coverage for your loved ones",
    icon: Heart,
    href: "#health-insurance",
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
      element.scrollIntoView({ behavior: "smooth" });
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

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger data-testid="nav-services">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {services.map((service) => (
                      <li key={service.title}>
                        <NavigationMenuLink asChild>
                          <a
                            href={service.href}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(service.href);
                            }}
                            className="flex items-start gap-3 rounded-md p-3 hover-elevate active-elevate-2"
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
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover-elevate focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#about");
                  }}
                  data-testid="nav-about"
                >
                  About Us
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover-elevate focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  href="#testimonials"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#testimonials");
                  }}
                  data-testid="nav-testimonials"
                >
                  Testimonials
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover-elevate focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  href="#calculator"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#calculator");
                  }}
                  data-testid="nav-calculator"
                >
                  Calculator
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover-elevate focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#faq");
                  }}
                  data-testid="nav-faq"
                >
                  FAQ
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              data-testid="button-call"
            >
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
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
                  >
                    <Phone className="w-4 h-4" />
                    +91 98765 43210
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
