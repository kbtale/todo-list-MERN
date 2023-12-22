import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost/todoListDB");
        console.log(">>> DB connected successfully");
    } catch(error){
        console.log("Error connecting to the Database: ", error);
    }
}
