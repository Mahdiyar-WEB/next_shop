type UserRole = "USER";

export interface CartProductDetails {
  productId: {
    _id: string;
    title: string;
    slug: string;
    imageLink: string;
    price: number;
    offPrice: number;
    countInStock: number;
  };
  quantity: number;
}

export interface Cart {
  products: CartProductDetails[];
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
