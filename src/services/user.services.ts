import { api } from "@/lib/api";
import { MyLearningResponse } from "@/types/course";

export async function fetchMyLearning(): Promise<MyLearningResponse> {
  try {
    const response = await api.get("/api/user/my-learning");
    return response.data;
  } catch (error) {
    return Promise.reject({
      message: error.response?.data?.message || "Failed to fetch my learning",
      success: false,
    });
  }
}
