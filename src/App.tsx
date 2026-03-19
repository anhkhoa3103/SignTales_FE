import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Learn from "./pages/Learn"; 
import LessonDetail from "./pages/LessonDetail";
import Practice from "./pages/Practice";
import MiniGames from "./pages/MiniGames";
import Explore from "./pages/Explore";
import Leaderboard from "./pages/Leaderboard";
import ProgressPage from "./pages/ProgressPage";
import Profile from "./pages/Profile";
import Pricing from "./pages/Pricing";
import Onboarding from "./pages/Onboarding";
import About from "./pages/About";
import AppLayout from "./components/AppLayout";
import VSLPage from './pages/VSLPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/about" element={<About />} />

            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/learn/:id" element={<LessonDetail />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/games" element={<MiniGames />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/vsl" element={<VSLPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;