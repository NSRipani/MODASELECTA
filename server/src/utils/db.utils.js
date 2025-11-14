import { connect } from "mongoose";
import dotenv from "dotenv";
import logger from "./logger.js";
dotenv.config();

async function dbConnect() {
    try {
        await connect(process.env.LINK_MONGO);
        logger.info("mongo db connected");
    } catch (error) {
        console.log(error.message);
    }
}

export default dbConnect;