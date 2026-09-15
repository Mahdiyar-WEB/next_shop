type UserRole = "USER";

interface CartProduct {
  product: string;
  quantity: number;
}

export interface Cart {
  products: CartProduct[];
  coupon: string | null;
}

export interface User {
  _id: string;
  name: string | null;
  email: string | null;
  phoneNumber: string | null;
  avatar?: string | null;
  biography: string | null;
  isVerifiedPhoneNumber: boolean;
  isActive: boolean;
  role: UserRole;
  Products: string[];
  likedProducts: string[];
  likedPosts: string[];
  bookmarkedPosts: string[];
  cart: Cart;
  createdAt: string;
  updatedAt: string;
}
