import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const DbConnection = process.env.DB_CONNECTION_STRING!;
export const PORT = process.env.PORT!;


export const connectDb = async () => {
    try {
        mongoose.set("strictQuery", false)
        mongoose.connect(DbConnection)
        console.log("DB connected Successfully")
    } catch (error) {
        console.log(error)
        // process.exit(1)
    }
}




export const APP_SECRET = process.env.APP_SECRET!
export const GMAIL_USER = process.env.GMAIL_USER!
export const GMAIL_PASS = process.env.GMAIL_PASS!
export const FromAdminMail = process.env.FromAdminMail!;
export const userSubject = process.env.UserSubject!;
export const CLIENT_URL = process.env.CLIENT_URL!