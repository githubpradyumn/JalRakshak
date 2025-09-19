import "./global.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./i18n";
import { AuthProvider } from "./AuthContext";
import LoginPage from "./LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Analysis from "./pages/Analysis";
import Weather from "./pages/Weather";
import About from "./pages/About";
import Structure from "./pages/Structure";
import FAQs from "./pages/FAQs";
import { Navbar } from "@/components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <BrowserRouter>
            <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 dark:from-[#0b1220] dark:to-[#0b1220]">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/"
                  element={
                    <>
                      <Navbar />
                      <Index />
                    </>
                  }
                />
                <Route
                  path="/analysis"
                  element={
                    <>
                      <Navbar />
                      <Analysis />
                    </>
                  }
                />
                <Route
                  path="/weather"
                  element={
                    <>
                      <Navbar />
                      <Weather />
                    </>
                  }
                />
                <Route
                  path="/structure"
                  element={
                    <>
                      <Navbar />
                      <Structure />
                    </>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <>
                      <Navbar />
                      <About />
                    </>
                  }
                />
                <Route
                  path="/faqs"
                  element={
                    <>
                      <Navbar />
                      <FAQs />
                    </>
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
