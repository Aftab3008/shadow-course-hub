import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Separator } from "../ui/separator";
import {
  AccountLinks,
  LearningLinks,
  MobileLearningLinks,
  NavLinks,
} from "@/constants/NavbarLinks";
import {
  LogOut,
  Menu,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { userAuthStore } from "@/store/auth.store";
import ShowAvatar from "../shared/ShowAvatar";
import CartIcon from "../cart/CartIcon";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "../ui/badge";

export default function MobileBar() {
  const { isAuthenticated, isCheckingAuth, user, logout } = userAuthStore();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const result = await logout();
    if (!result.success) {
      toast({
        title: "Sign out failed",
        description: "There was an error signing you out.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Signed out successfully",
      description: "You have been signed out.",
      variant: "success",
    });
  };

  return (
    <div className="flex md:hidden items-center gap-2.5\">
      <CartIcon />

      {isAuthenticated && !isCheckingAuth && (
        <div className="relative\">
          <ShowAvatar
            profileUrl={user?.profileUrl}
            name={user?.name}
            className="h-8 w-8 ring-2 ring-primary/20"
          />
          <div className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-background\" />
        </div>
      )}

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="flex flex-col h-full p-0 w-[85vw] max-w-sm"
        >
          {/* Header */}
          <SheetHeader className="px-5 pt-6 pb-4 border-b border-border/50">
            <SheetTitle className="text-left text-lg font-bold">
              Navigation
            </SheetTitle>
          </SheetHeader>

          {/* User Profile Section */}
          {isAuthenticated && !isCheckingAuth && (
            <div className="px-5 py-4 bg-muted/30">
              <div className="flex items-center gap-3">
                <ShowAvatar
                  profileUrl={user?.profileUrl}
                  name={user?.name}
                  className="h-12 w-12 ring-2 ring-primary/20"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Main Navigation */}
            <div className="py-4">
              <p className="px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Main Menu
              </p>
              <nav className="space-y-1 px-3">
                {NavLinks.map(({ to, label }) => (
                  <SheetClose asChild key={to}>
                    <Link
                      to={to}
                      className="group flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-accent transition-colors duration-200"
                    >
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {label}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </div>

            {isAuthenticated && (
              <>
                <Separator className="my-2" />

                {/* Learning Section */}
                <div className="py-4">
                  <p className="px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Learning
                  </p>
                  <nav className="space-y-1 px-3">
                    {MobileLearningLinks.map(({ to, label }) => (
                      <SheetClose asChild key={to}>
                        <Link
                          to={to}
                          className="group flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-accent transition-colors duration-200"
                        >
                          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {label}
                          </span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                </div>

                <Separator className="my-2" />

                {/* Account Section */}
                <div className="py-4">
                  <p className="px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Account
                  </p>
                  <nav className="space-y-1 px-3">
                    {AccountLinks.map(({ to, label }) => (
                      <SheetClose asChild key={to}>
                        <Link
                          to={to}
                          className="group flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-accent transition-colors duration-200"
                        >
                          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {label}
                          </span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                </div>

                {/* Admin Link */}
                {user?.isAdmin && (
                  <>
                    <Separator className="my-2" />
                    <div className="py-4">
                      <nav className="space-y-1 px-3">
                        <SheetClose asChild>
                          <Link
                            to="/admin/dashboard"
                            className="group flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-accent transition-colors duration-200"
                          >
                            <div className="flex items-center gap-2">
                              <ShieldCheck className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                Admin Dashboard
                              </span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              Admin
                            </Badge>
                          </Link>
                        </SheetClose>
                      </nav>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-border/50 bg-muted/20">
            {isCheckingAuth ? (
              <div className="space-y-2">
                <div className="h-10 w-full bg-muted animate-pulse rounded-lg" />
                <div className="h-10 w-full bg-muted animate-pulse rounded-lg" />
              </div>
            ) : isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4 rotate-180" />
                Sign Out
              </Button>
            ) : (
              <div className="space-y-2">
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link to="/auth/signin">Sign In</Link>
                </Button>
                <Button size="sm" asChild className="w-full shadow-sm">
                  <Link to="/auth/signup">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
