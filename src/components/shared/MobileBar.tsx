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
import { Separator } from "../ui/separator";
import {
  AccountLinks,
  LearningLinks,
  MobileLearningLinks,
  NavLinks,
} from "@/constants/NavbarLinks";
import { LogOut, Menu } from "lucide-react";
import { userAuthStore } from "@/store/auth.store";
import ShowAvatar from "../shared/ShowAvatar";
import CartIcon from "../cart/CartIcon";
import { useToast } from "@/hooks/use-toast";

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
    <div className="flex md:hidden items-center space-x-2 justify-between">
      <CartIcon />
      {isAuthenticated ? (
        <ShowAvatar
          profileUrl={user.profileUrl}
          name={user.name}
          className="h-7 w-7"
        />
      ) : (
        <Button variant="default" asChild>
          <Link to="/auth/signup" className="flex h-full items-center px-2">
            Get Started
          </Link>
        </Button>
      )}
      <Sheet>
        <SheetTrigger>
          <Menu className="h-8 w-8" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col h-full p-0 md:hidden"
        >
          <div className="flex flex-col flex-1">
            <SheetHeader className="px-6 pt-6 pb-2">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <Separator className="my-2" />
            <nav className="flex flex-col space-y-6 px-6 mt-2">
              {NavLinks.map(({ to, label }) => (
                <SheetClose asChild key={to}>
                  <Link
                    to={to}
                    className="hover:text-primary text-lg tracking-wide transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            {isAuthenticated && (
              <>
                <Separator className="my-2" />
                <nav className="flex flex-col space-y-6 px-6 mt-2">
                  {MobileLearningLinks.map(({ to, label }) => (
                    <SheetClose asChild key={to}>
                      <Link
                        key={to}
                        to={to}
                        className="hover:text-primary text-lg tracking-wide transition-colors duration-150"
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <Separator className="my-2" />
                <nav className="flex flex-col space-y-6 px-6 mt-2">
                  {AccountLinks.map(({ to, label }) => (
                    <SheetClose asChild key={to}>
                      <Link
                        key={to}
                        to={to}
                        className="hover:text-primary text-lg tracking-wide transition-colors duration-150"
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                {user.isAdmin && (
                  <>
                    <Separator className="my-2" />
                    <nav className="flex flex-col space-y-6 px-6 mt-2">
                      <SheetClose asChild key="/admin/dashboard">
                        <Link
                          to="/admin/dashboard"
                          className="hover:text-primary text-lg tracking-wide transition-colors duration-150"
                        >
                          Admin Dashboard
                        </Link>
                      </SheetClose>
                    </nav>
                  </>
                )}
              </>
            )}
          </div>
          <div className="px-6 pb-6 mt-auto">
            {isCheckingAuth ? (
              <div className="flex flex-col space-y-2">
                <div className="h-20 w-full bg-gray-200 animate-pulse rounded" />
                {/* <div className="h-10 w-full bg-gray-200 animate-pulse rounded" /> */}
              </div>
            ) : isAuthenticated ? (
              <Button
                variant="ghost"
                className="w-full text-left h-10 bg-gray-400 bg-opacity-15 hover:bg-gray-400 hover:bg-opacity-20 text-red-400 hover:text-red-500"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4 rotate-180" />
                Sign Out
              </Button>
            ) : (
              <div className="flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  asChild
                  className="w-full bg-gray-400 bg-opacity-15 flex items-center justify-center text-primary hover:text-primary"
                >
                  <Link to="/auth/signin" className="w-full">
                    Sign In
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full flex items-center justify-center"
                >
                  <Link to="/auth/signup" className="w-full">
                    Get Started
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
