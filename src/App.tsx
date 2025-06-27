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
import AuthLayout from "./components/Layout/AuthLayout";
import ProtectedLayout from "./components/Layout/ProtectedLayout";
import MainLayout from "./components/Layout/MainLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner richColors />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route element={<AuthLayout />}>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Route>
              <Route element={<ProtectedLayout />}>
                <Route path="/my-learning" element={<MyLearning />} />
                <Route path="/instructor" element={<Instructor />} />
                <Route
                  path="/instructor/edit-course/:id"
                  element={<EditCourse />}
                />
                <Route
                  path="/learn/:courseId/:lectureId"
                  element={<VideoPlayer />}
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
