import { AccountLinks, LearningLinks, NavLinks } from "@/constants/NavbarLinks";
import { Link } from "react-router-dom";
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
import { LogOut } from "lucide-react";

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
    <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-6">
      <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 flex-shrink-0">
        {NavLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="flex h-8 items-center px-2 hover:text-primary transition whitespace-nowrap"
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="hidden md:flex items-center space-x-4 justify-end">
        <CartIcon />
        {isCheckingAuth ? (
          <div className="animate-pulse bg-muted rounded-full h-8 w-8" />
        ) : isAuthenticated ? (
          <div className="flex items-center space-x-2">
            <Button
              variant="link"
              className="text-primary hover:text-primary h-full" //hover:bg-gray-400 hover:bg-opacity-15
              asChild
            >
              <Link
                to="/instructor/dashboard"
                className="flex h-full items-center justify-center"
              >
                Become Instructor
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <ShowAvatar
                    profileUrl={user?.profileUrl}
                    name={user?.name}
                    className="h-8 w-8"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background">
                <div className="px-4 py-2 flex items-center space-x-2">
                  <ShowAvatar
                    profileUrl={user?.profileUrl}
                    name={user?.name}
                    className="h-10 w-10 mb-2"
                  />
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-gray-700">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <Separator className="my-1" />
                {LearningLinks.map(({ to, label }) => (
                  <DropdownMenuItem key={to} asChild>
                    <Link
                      to={to}
                      className="hover:bg-gray-100 text-sm tracking-wide cursor-pointer"
                    >
                      {label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <Separator className="my-1" />
                {AccountLinks.map(({ to, label }) => (
                  <DropdownMenuItem key={to} asChild>
                    <Link
                      to={to}
                      className="hover:bg-gray-100 text-sm tracking-wide cursor-pointer"
                    >
                      {label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                {user.isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link
                      to="/admin/dashboard"
                      className="hover:bg-gray-100 text-sm tracking-wide cursor-pointer"
                    >
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <Separator className="my-1" />
                <Button
                  variant="ghost"
                  className="w-full bg-gray-400 bg-opacity-15 hover:bg-gray-400 hover:bg-opacity-20 flex justify-start items-center gap-2 text-red-500 hover:text-red-600 cursor-pointer hover:border-none hover:ring-0"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4 rotate-180" />
                  Sign Out
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <>
            <Button
              variant="ghost"
              asChild
              className="h-full text-primary hover:text-primary"
            >
              <Link to="/auth/signin" className="flex h-full items-center px-2">
                Sign In
              </Link>
            </Button>
            <Button asChild className="h-full">
              <Link to="/auth/signup" className="flex h-full items-center px-2">
                Get Started
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
