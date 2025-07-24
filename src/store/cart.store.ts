import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartState, CartItem } from "../types/index";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addToCart: ({
        courseId,
        title,
        instructor,
        price,
        OriginalPrice,
        thumbnail,
        level,
        duration,
      }) => {
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
          addedAt: new Date(),
        };

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
