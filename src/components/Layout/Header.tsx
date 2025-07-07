import { useState } from "react";
import { Link } from "react-router-dom";
import DesktopBar from "./DesktopBar";
import MobileBar from "./MobileBar";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  // const navigate = useNavigate();

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const q = searchQuery.trim();
  //   if (q) navigate(`/courses?search=${encodeURIComponent(q)}`);
  // };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                L
              </span>
            </div>
            <span className="font-bold text-xl text-foreground">LearnHub</span>
          </Link>

          {/* <form
            onSubmit={handleSearch}
            className="hidden md:flex lg:flex-1 items-center max-w-md mx-4 flex-shrink"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted border-border"
              />
            </div>
          </form> */}

          <DesktopBar />

          <MobileBar />
        </div>
      </div>
    </header>
  );
}
