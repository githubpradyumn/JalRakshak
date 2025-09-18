import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Droplets, LogOut, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "../AuthContext";

export const Navbar = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => setMounted(true), []);

  const isDark = (resolvedTheme ?? theme) === "dark";

  const handleLogout = () => {
    logout();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-100/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:border-white/10 dark:bg-[#0b1220]/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <div className="flex space-x-10">
          <div className="relative">
            
            <span className="absolute inset-0 -z-10 blur-md rounded-full bg-blue-400/40 opacity-70" />
            <a href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-blue-700 dark:text-blue-300">
              <Droplets className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              JalRakshak
            </a>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/analysis">Analysis</NavItem>
          <NavItem to="/weather">Weather</NavItem>
          <NavItem to="/structure">Structure</NavItem>
          <NavItem to="/about">About us</NavItem>
          <NavItem to="/faqs">FAQs</NavItem>
          <div className="mx-2 h-6 w-px bg-blue-200 dark:bg-white/10" />
          
          {/* User info and auth buttons */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <div className="flex items-center gap-1 text-sm text-blue-700 dark:text-blue-300">
                  <User className="h-4 w-4" />
                  <span>{user?.email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-blue-700 hover:text-blue-900 hover:bg-blue-100/50 dark:text-blue-300 dark:hover:text-blue-100 dark:hover:bg-white/5"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogin}
                className="text-blue-700 hover:text-blue-900 hover:bg-blue-100/50 dark:text-blue-300 dark:hover:text-blue-100 dark:hover:bg-white/5"
              >
                <LogIn className="h-4 w-4 mr-1" />
                Login
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "rounded-md px-3 py-2 text-sm font-medium text-blue-800/80 transition hover:text-blue-900 hover:bg-blue-100/50 dark:text-blue-200/80 dark:hover:text-blue-100 dark:hover:bg-white/5",
        isActive &&
          "text-blue-900 bg-blue-100/70 shadow-sm dark:text-blue-100 dark:bg-white/10",
      )
    }
    end
  >
    {children}
  </NavLink>
);
