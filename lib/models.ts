import { Schema, model, models, type Model, type Types } from "mongoose";

export type Role = "USER" | "ADMIN" | "WRITER" | "TEACHER";

const cartItemSchema = new Schema({ productId: { type: Schema.Types.ObjectId, ref: "Product", required: true }, quantity: { type: Number, min: 1, default: 1 } }, { _id: false });
const cartSchema = new Schema({ products: { type: [cartItemSchema], default: [] }, coupon: { type: Schema.Types.ObjectId, ref: "Coupon", default: null } }, { _id: false });

const userSchema = new Schema({
  name: { type: String, trim: true }, email: { type: String, trim: true, lowercase: true, sparse: true, unique: true },
  phoneNumber: { type: String, trim: true, unique: true, sparse: true }, avatar: String, biography: { type: String, default: null },
  otp: { codeHash: String, expiresAt: Date, attempts: { type: Number, default: 0 } },
  isVerifiedPhoneNumber: { type: Boolean, default: false }, isActive: { type: Boolean, default: false },
  role: { type: String, enum: ["USER", "ADMIN", "WRITER", "TEACHER"], default: "USER" },
  Products: [{ type: Schema.Types.ObjectId, ref: "Product" }], likedProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  likedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }], bookmarkedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }], cart: { type: cartSchema, default: () => ({ products: [] }) },
}, { timestamps: true, toJSON: { transform: (_doc, value) => { delete value.otp; return value; } } });
userSchema.index({ name: "text", email: "text", phoneNumber: "text" });

const categorySchema = new Schema({ title: { type: String, required: true, trim: true, unique: true }, englishTitle: { type: String, required: true, trim: true, lowercase: true, unique: true }, description: { type: String, required: true, trim: true }, type: { type: String, enum: ["product", "comment", "post", "ticket"], default: "product" }, parentId: { type: Schema.Types.ObjectId, ref: "Category", default: null }, icon: { sm: String, lg: String } }, { timestamps: true });
categorySchema.index({ title: "text", englishTitle: "text" });

const productSchema = new Schema({ title: { type: String, required: true, trim: true }, description: { type: String, required: true }, slug: { type: String, required: true, unique: true, trim: true, lowercase: true }, category: { type: Schema.Types.ObjectId, ref: "Category", required: true }, imageLink: { type: String, required: true }, price: { type: Number, required: true, min: 0 }, offPrice: { type: Number, required: true, min: 0 }, discount: { type: Number, default: 0, min: 0, max: 100 }, brand: { type: String, required: true }, tags: [String], rating: { type: Number, default: 0, min: 0 }, numReviews: { type: Number, default: 0, min: 0 }, countInStock: { type: Number, default: 0, min: 0 }, likes: [{ type: Schema.Types.ObjectId, ref: "User" }] }, { timestamps: true });
productSchema.index({ title: "text", description: "text", brand: "text", tags: "text" });

const couponSchema = new Schema({ code: { type: String, required: true, unique: true, uppercase: true, trim: true }, type: { type: String, enum: ["fixedProduct", "percent"], required: true }, amount: { type: Number, required: true, min: 0 }, expireDate: Date, isActive: { type: Boolean, default: true }, usageCount: { type: Number, default: 0 }, usageLimit: { type: Number, required: true, min: 1 }, productIds: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }] }, { timestamps: true });
const paymentSchema = new Schema({ invoiceNumber: { type: String, unique: true }, paymentMethod: { type: String, default: "ZARINPAL" }, amount: Number, description: String, refId: String, cardHash: String, status: { type: String, enum: ["UNCOMPLETED", "COMPLETED"], default: "UNCOMPLETED" }, isPaid: { type: Boolean, default: false }, authority: String, user: { type: Schema.Types.ObjectId, ref: "User", required: true }, paymentDate: Date, cart: Schema.Types.Mixed }, { timestamps: true });
const postSchema = new Schema({ title: { type: String, required: true }, slug: { type: String, required: true, unique: true, lowercase: true }, category: { type: Schema.Types.ObjectId, ref: "Category", required: true }, type: { type: String, enum: ["free", "premium"], default: "free" }, briefText: { type: String, required: true }, text: { type: String, required: true }, coverImage: { type: String, required: true }, likes: [{ type: Schema.Types.ObjectId, ref: "User" }], bookmarks: [{ type: Schema.Types.ObjectId, ref: "User" }], readingTime: { type: Number, required: true }, tags: [String], author: { type: Schema.Types.ObjectId, ref: "User" }, related: [{ type: Schema.Types.ObjectId, ref: "Post" }] }, { timestamps: true });
const answerSchema = new Schema({ user: { type: Schema.Types.ObjectId, ref: "User", required: true }, post: { type: Schema.Types.ObjectId, ref: "Post", required: true }, content: { text: { type: String, required: true } }, status: { type: Number, enum: [0, 1, 2], default: 1 }, openToComment: { type: Boolean, default: false } }, { timestamps: true });
const commentSchema = new Schema({ user: { type: Schema.Types.ObjectId, ref: "User", required: true }, post: { type: Schema.Types.ObjectId, ref: "Post", required: true }, content: { text: { type: String, required: true } }, status: { type: Number, enum: [0, 1, 2], default: 1 }, openToComment: { type: Boolean, default: true }, answers: { type: [answerSchema], default: [] } }, { timestamps: true });

export const User = (models.User || model("User", userSchema)) as Model<Record<string, unknown> & { _id: Types.ObjectId; role: Role; phoneNumber?: string; isActive: boolean }>;
export const Category = models.Category || model("Category", categorySchema);
export const Product = models.Product || model("Product", productSchema);
export const Coupon = models.Coupon || model("Coupon", couponSchema);
export const Payment = models.Payment || model("Payment", paymentSchema);
export const Post = models.Post || model("Post", postSchema);
export const Comment = models.Comment || model("Comment", commentSchema);
