
export interface CartItem {
  id: string;
  courseId: string;
  title: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  duration: string;
  rating: number;
  addedAt: Date;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (course: any) => void;
  removeFromCart: (courseId: string) => void;
  updateQuantity: (courseId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItem: (courseId: string) => CartItem | undefined;
  isInCart: (courseId: string) => boolean;
}
