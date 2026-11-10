
import mongoose from "mongoose";

export async function connectDB() {
    
    try{
        await mongoose.connect(process.env.MONGO_URI!)
        mongoose.connection.on("connected", () => {
            console.log("Connected to the database");
        })
        mongoose.connection.on("error", (err: Error) => {
            console.error("Error connecting to the database:", err);
        });
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
    }
}