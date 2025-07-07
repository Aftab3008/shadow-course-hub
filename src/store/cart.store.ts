import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartState, CartItem } from "../types/index";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addToCart: (course) => {
        const newCourse = {
          id: `${course.id}-${Date.now()}`,
          courseId: course.id,
          title: course.title,
          instructor: course.instructor.name,
          price: course.price,
          originalPrice: course.originalPrice,
          thumbnail: course.thumbnail,
          duration: course.duration,
          rating: course.rating,
          level: course.level.toLowerCase(),
          addedAt: new Date(),
        };
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.courseId === course.id
          );

          if (existingItem) {
            return state;
          } else {
            return {
              items: [...state.items, { ...newCourse }],
              totalItems: state.totalItems + 1,
              totalPrice: state.totalPrice + course.price,
            };
          }
        });
      },

      removeFromCart: (courseId) => {
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
      },

      // updateQuantity: (courseId) => {},

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
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
