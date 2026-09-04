interface Category {
  _id: string;
  title: string;
  englishTitle: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  slug: string;
  category: Category;
  imageLink: string;
  price: number;
  offPrice: number;
  discount: number;
  brand: string;
  tags: string[];
  rating: number;
  numReviews: number;
  countInStock: number;
  likes: string[];
  createdAt: string;
  updatedAt: string;
}
