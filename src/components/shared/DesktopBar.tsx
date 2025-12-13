import { AccountLinks, LearningLinks, NavLinks } from "@/constants/NavbarLinks";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CartIcon from "../cart/CartIcon";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ShowAvatar from "./ShowAvatar";
import { userAuthStore } from "@/store/auth.store";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "../ui/separator";
import { LogOut, ChevronDown, Sparkles, User, ShieldCheck } from "lucide-react";

export default function DesktopBar() {
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
    <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-1 flex-shrink-0">
        {NavLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="relative group px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 whitespace-nowrap"
          >
            {label}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </Link>
        ))}
      </nav>

      {/* Right Section */}
      <div className="hidden md:flex items-center gap-3 justify-end">
        <CartIcon />

        {isCheckingAuth ? (
          <div className="flex items-center gap-2">
            <div className="animate-pulse bg-muted rounded-full h-9 w-20" />
            <div className="animate-pulse bg-muted rounded-full h-9 w-9" />
          </div>
        ) : isAuthenticated ? (
          <div className="flex items-center gap-2">
            {/* Teach Button */}
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="group relative overflow-hidden"
            >
              <Link
                to="/instructor/dashboard"
                className="flex items-center gap-1.5"
              >
                <Sparkles className="h-4 w-4" />
                <span className="hidden lg:inline">Teach</span>
              </Link>
            </Button>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 gap-2 px-2 hover:bg-accent"
                >
                  <ShowAvatar
                    profileUrl={user?.profileUrl}
                    name={user?.name}
                    className="h-7 w-7 ring-2 ring-primary/10"
                  />
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-64 bg-card border-border shadow-lg"
                sideOffset={8}
              >
                {/* User Info */}
                <div className="px-3 py-3 flex items-center gap-3">
                  <ShowAvatar
                    profileUrl={user?.profileUrl}
                    name={user?.name}
                    className="h-12 w-12 ring-2 ring-primary/20"
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <Separator className="my-1.5" />

                {/* Learning Links */}
                <div className="py-1">
                  {LearningLinks.map(({ to, label }) => (
                    <DropdownMenuItem key={to} asChild>
                      <Link
                        to={to}
                        className="cursor-pointer text-sm font-medium px-3 py-2 focus:bg-accent"
                      >
                        {label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>

                <Separator className="my-1.5" />

                {/* Account Links */}
                <div className="py-1">
                  {AccountLinks.map(({ to, label }) => (
                    <DropdownMenuItem key={to} asChild>
                      <Link
                        to={to}
                        className="cursor-pointer text-sm font-medium px-3 py-2 focus:bg-accent"
                      >
                        {label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>

                {/* Admin Link */}
                {user?.isAdmin && (
                  <>
                    <Separator className="my-1.5" />
                    <div className="py-1">
                      <DropdownMenuItem asChild>
                        <Link
                          to="/admin/dashboard"
                          className="cursor-pointer text-sm font-medium px-3 py-2 focus:bg-accent flex items-center gap-2"
                        >
                          <ShieldCheck className="h-4 w-4 text-primary" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </div>
                  </>
                )}

                <Separator className="my-1.5" />

                {/* Sign Out */}
                <div className="py-1.5 px-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4 rotate-180" />
                    Sign Out
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hover:bg-accent"
            >
              <Link to="/auth/signin">Sign In</Link>
            </Button>
            <Button
              size="sm"
              asChild
              className="magnetic-button shadow-md hover:shadow-lg"
            >
              <Link to="/auth/signup">Get Started</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
