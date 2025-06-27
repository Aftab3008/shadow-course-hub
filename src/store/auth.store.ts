import { api } from "@/lib/api";
import { UserAuthState } from "@/types";
import { create } from "zustand";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

if (!BACKEND_URL) {
  throw new Error(
    "VITE_BACKEND_URL is not defined. Please set it in your .env file."
  );
}

export const userAuthStore = create<UserAuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (
    name: string,
    email: string,
    password: string,
    agreeToTerms: boolean,
    agreeToPrivacyPolicy: boolean
  ) => {
    set({ isLoading: true });
    try {
      const response = await api.post(`${BACKEND_URL}/api/auth/register`, {
        name,
        email,
        password,
        agreeToTerms,
        agreeToPrivacyPolicy,
      });
      console.log("Signup response:", response.data);
      set({
        user: response.data.data,
        isAuthenticated: true,
        isLoading: false,
      });
      return { message: response.data.message, success: true };
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      return {
        message: error.response.data.message || "Error signing up",
        success: false,
      };
    }
  },

  verifyEmail: async (code: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post(`${BACKEND_URL}/api/auth/verify-email`, {
        code,
      });
      set({
        user: response.data.data,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await api.get(`${BACKEND_URL}/api/auth/me`);
      set({
        user: response.data.data,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post(`${BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });
      console.log("Login response:", response.data);
      set({
        user: response.data.data,
        isAuthenticated: true,
        isLoading: false,
      });
      return { message: response.data.message, success: true };
    } catch (error) {
      set({
        error: error.response.data.message || "Error logging in",
        isLoading: false,
      });
      return {
        message: error.response.data.message || "Error logging in",
        success: false,
      };
    }
  },

  logout: async () => {
    try {
      await api.post(`${BACKEND_URL}/api/auth/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  forgotPassword: async (email: string) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await api.post(
        `${BACKEND_URL}/api/auth/forgot-password`,
        {
          email,
        }
      );
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response.data.message || "Error sending password reset link",
      });
      throw error;
    }
  },

  resetPassword: async (token: string, newPassword: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post(
        `${BACKEND_URL}/api/auth/reset-password/${token}`,
        {
          newPassword,
        }
      );
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: "Error resetting password" });
      throw error;
    }
  },
}));
