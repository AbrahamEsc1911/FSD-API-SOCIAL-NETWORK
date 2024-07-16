import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI

export const dbConection = () => {
    return mongoose.connect(MONGO_URI, {})
}