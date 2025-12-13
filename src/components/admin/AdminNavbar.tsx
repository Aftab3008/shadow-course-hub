import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { userAuthStore } from "@/store/auth.store";
import ShowAvatar from "@/components/shared/ShowAvatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Menu,
  Settings,
  Users,
  BookOpen,
  BarChart3,
  Shield,
  LogOut,
  Home,
  User,
  ChevronDown,
} from "lucide-react";

export default function AdminNavbar() {
  const { user, logout } = userAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };

  const navigationItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Courses", href: "/admin/courses", icon: BookOpen },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2.5 group"
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20"
              >
                <Shield className="h-5 w-5" />
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight">
                  Admin Panel
                </span>
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  v2.0
                </Badge>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="relative h-9 w-9 p-0 hover:bg-accent"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive ring-2 ring-background"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-9 gap-2 px-2 hover:bg-accent"
                >
                  <ShowAvatar
                    profileUrl={user?.profileUrl || "/assets/default.jpg"}
                    name={user?.name || "Admin"}
                    className="h-7 w-7 ring-2 ring-primary/20"
                  />
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end" sideOffset={8}>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex items-center gap-3 py-2">
                    <ShowAvatar
                      profileUrl={user?.profileUrl || "/assets/default.jpg"}
                      name={user?.name || "Admin"}
                      className="h-10 w-10 ring-2 ring-primary/20"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold leading-none">
                        {user?.name || "Admin User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email || "admin@example.com"}
                      </p>
                      <Badge variant="secondary" className="w-fit text-xs mt-1">
                        Administrator
                      </Badge>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive cursor-pointer focus:text-destructive focus:bg-destructive/10"
                >
                  <LogOut className="mr-2 h-4 w-4 rotate-180" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[85vw] max-w-sm p-0 flex flex-col"
                >
                  <SheetHeader className="px-5 pt-6 pb-4 border-b border-border/50">
                    <SheetTitle className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
                        <Shield className="h-4 w-4" />
                      </div>
                      <span className="font-bold">Admin Panel</span>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="px-5 py-4 bg-muted/30 border-b border-border/50">
                    <div className="flex items-center gap-3">
                      <ShowAvatar
                        profileUrl={user?.profileUrl || "/assets/default.jpg"}
                        name={user?.name || "Admin"}
                        className="h-12 w-12 ring-2 ring-primary/20"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">
                          {user?.name || "Admin User"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.email || "admin@example.com"}
                        </p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          Administrator
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto py-4">
                    <p className="px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Navigation
                    </p>
                    <nav className="space-y-1 px-3">
                      {navigationItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                              active
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                    </nav>
                  </div>

                  <div className="p-4 border-t border-border/50 bg-muted/20">
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <LogOut className="mr-2 h-4 w-4 rotate-180" />
                        Log out
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
