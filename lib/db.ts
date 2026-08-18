import mongoose from "mongoose";

const globalForMongoose = global as typeof globalThis & {
  mongooseConnection?: Promise<typeof mongoose>;
};

export function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not configured.");
  if (!globalForMongoose.mongooseConnection) {
    globalForMongoose.mongooseConnection = mongoose.connect(uri);
  }
  return globalForMongoose.mongooseConnection;
}
