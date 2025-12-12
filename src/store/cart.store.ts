import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartState, CartItem } from "../types/index";
import { api } from "@/lib/api";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addToCart: async ({
        courseId,
        title,
        instructor,
        price,
        OriginalPrice,
        thumbnail,
        level,
        duration,
      }) => {
        try {
          const newCourse: CartItem = {
            courseId,
            title,
            instructor: {
              name: instructor.name,
              profileUrl: instructor.profileUrl,
            },
            price,
            OriginalPrice,
            thumbnail,
            level,
            duration,
          };
          await api.post(`/api/cart/add/${courseId}`);
          set((state) => {
            const existingItem = state.items.find(
              (item) => item.courseId === courseId
            );

            if (existingItem) {
              return state;
            } else {
              return {
                items: [...state.items, { ...newCourse }],
                totalItems: state.totalItems + 1,
                totalPrice: state.totalPrice + newCourse.price,
              };
            }
          });
          return {
            success: true,
            message: "Item added to cart successfully",
          };
        } catch (error) {
          console.error("Error adding item to cart:", error);
          return {
            success: false,
            message: "Failed to add item to cart",
          };
        }
      },

      removeFromCart: async (courseId) => {
        try {
          await api.delete(`/api/cart/remove/${courseId}`);

          set((state) => {
            const existingItem = state.items.find(
              (item) => item.courseId === courseId
            );

            if (existingItem) {
              return {
                items: state.items.filter((item) => item.courseId !== courseId),
                totalItems: state.totalItems - 1,
                totalPrice: state.totalPrice - existingItem.price,
              };
            } else {
              return state;
            }
          });
          return {
            success: true,
            message: "Item removed from cart successfully",
          };
        } catch (error) {
          console.error("Error removing item from cart:", error);
          return {
            success: false,
            message: "Failed to remove item from cart",
          };
        }
      },

      loadCart: async () => {
        try {
          const response = await api.get("/api/cart/getcart");
          const serverCart = response.data.data;
          const items = serverCart.CartItem.map((ci) => ({
            courseId: ci.courseId,
            title: ci.course.title,
            instructor: {
              name: ci.course.instructor.name,
              profileUrl: ci.course.instructor.profileUrl,
            },
            price: ci.course.price,
            OriginalPrice: ci.course.OriginalPrice,
            thumbnail: ci.course.thumbnail,
            level: ci.course.level as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
            duration: ci.course.duration,
          }));
          const totalItems = items.length;
          const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
          set({ items, totalItems, totalPrice });
          return {
            success: true,
            message: "Cart loaded successfully",
          };
        } catch (error) {
          console.error("Error loading cart:", error);
          set({ items: [], totalItems: 0, totalPrice: 0 });
          return {
            success: false,
            message: "Failed to load cart",
          };
        }
      },

      clearCart: async () => {
        try {
          await api.delete("/api/cart/clear");

          set({
            items: [],
            totalItems: 0,
            totalPrice: 0,
          });
          return {
            success: true,
            message: "Cart cleared successfully",
          };
        } catch (error) {
          console.error("Error clearing cart:", error);
          return {
            success: false,
            message: "Failed to clear cart",
          };
        }
      },

      getCartItem: (courseId) => {
        const state = get();
        return state.items.find((item) => item.courseId === courseId);
      },

      isInCart: (courseId) => {
        const state = get();
        return state.items.some((item) => item.courseId === courseId);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
