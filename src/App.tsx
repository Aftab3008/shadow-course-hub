import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CourseDetail from "./pages/CourseDetail";
import Courses from "./pages/Courses";
import EditCourse from "./pages/EditCourse";
import Home from "./pages/Home";
import Instructor from "./pages/Instructor";
import MyLearning from "./pages/MyLearning";
import VideoPlayer from "./pages/VideoPlayer";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import NotFound from "./pages/not-found/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/my-learning" element={<MyLearning />} />
            <Route path="/instructor" element={<Instructor />} />
            <Route
              path="/instructor/edit-course/:id"
              element={<EditCourse />}
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/learn/:courseId/:lectureId"
              element={<VideoPlayer />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
