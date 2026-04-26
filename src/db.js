import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || "mongodb://localhost/todoListDB";
        await mongoose.connect(uri);
        console.log(">>> DB connected successfully to", uri);
    } catch(error){
        console.log("Error connecting to the Database: ", error);
    }
}
