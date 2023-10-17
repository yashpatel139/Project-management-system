import { User } from "../models/user";
import mongoose from "mongoose";

const config = {
    isConnected: 0,
}

export const connectDB = async () => {
    //If the database is already connected it woudn't create a new connection again.
    if(config.isConnected){
        return;
    }

    try {
        const {connection} = await mongoose.connect(process.env.MONGO_DB_URL, {
            dbName: "Work_manager"
        }); 
        console.log("DB Connected.....");
        // console.log(connection);
        console.log(connection.readyState);
        config.isConnected = config.readyState;
        console.log("Connected with host ", connection.host);

        //Testing and creating new user
        // const user = new User({
        //     name: "test Sidd",
        //     email: "test@gmail.com",
        //     password: "testPassword",
        //     about: "This is for testing"
        // });
        // await user.save();
        // console.log("User is created.");

    } catch (error) {
        console.log("Failed to connect with database.");
        console.log(error);
    }
}