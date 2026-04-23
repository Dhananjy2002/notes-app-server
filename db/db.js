import mongoose from "mongoose";

// 🔗 MongoDB connection
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/notesDB";


async function connectDB() {
    await mongoose.connect(mongoURI).then(() => {
        console.log("MongoDB Connected");
    }).catch((err) => {
        console.log(err);
    });

}

export default connectDB;
