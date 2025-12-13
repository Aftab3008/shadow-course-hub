import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DesktopBar from "./DesktopBar";
import MobileBar from "./MobileBar";
import { GraduationCap } from "lucide-react";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm"
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 flex-shrink-0 group"
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-shadow duration-300"
            >
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl text-foreground tracking-tight">
                Shadow
                <span className="text-primary">Course</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <DesktopBar />

          {/* Mobile Navigation */}
          <MobileBar />
        </div>
      </div>
    </motion.header>
  );
}
