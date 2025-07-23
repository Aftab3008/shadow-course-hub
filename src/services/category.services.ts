import { api } from "@/lib/api";
import { CatergoryResponse } from "@/types/category";

export async function fetchCategories(): Promise<CatergoryResponse> {
  try {
    const response = await api.get("/api/courses/categories");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch categories"
    );
  }
}

export async function createCategory({
  name,
}: {
  name: string;
}): Promise<CatergoryResponse> {
  try {
    const response = await api.post("/api/instructor/create-category", {
      name: name.toLowerCase(),
    });
    return response.data;
  } catch (error) {
    return Promise.reject({
      message: error.response?.data?.message || "Failed to create category",
      success: false,
    });
  }
}
