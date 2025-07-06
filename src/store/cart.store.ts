import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartState, CartItem } from '../types/cart';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addToCart: (course) => {
        const existingItem = get().items.find(item => item.courseId === course.id);
        
        if (existingItem) {
          // Item already in cart, don't add again
          return;
        }

        const newItem: CartItem = {
          id: `cart-${course.id}-${Date.now()}`,
          courseId: course.id,
          title: course.title,
          instructor: course.instructor.name,
          price: course.price,
          originalPrice: course.originalPrice,
          thumbnail: course.thumbnail,
          duration: course.duration,
          rating: course.rating,
          addedAt: new Date(),
        };

        set((state) => {
          const newItems = [...state.items, newItem];
          const totalItems = newItems.length;
          const totalPrice = newItems.reduce((sum, item) => sum + item.price, 0);
          
          return {
            items: newItems,
            totalItems,
            totalPrice,
          };
        });
      },

      removeFromCart: (courseId) => {
        set((state) => {
          const newItems = state.items.filter(item => item.courseId !== courseId);
          const totalItems = newItems.length;
          const totalPrice = newItems.reduce((sum, item) => sum + item.price, 0);
          
          return {
            items: newItems,
            totalItems,
            totalPrice,
          };
        });
      },

      updateQuantity: (courseId, quantity) => {
        // For courses, we don't really need quantity since each course is unique
        // But keeping this for consistency with typical cart interfaces
        if (quantity <= 0) {
          get().removeFromCart(courseId);
        }
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },

      getCartItem: (courseId) => {
        return get().items.find(item => item.courseId === courseId);
      },

      isInCart: (courseId) => {
        return get().items.some(item => item.courseId === courseId);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
