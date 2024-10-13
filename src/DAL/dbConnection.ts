import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.DB_CONNECTION_STRING || '';
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(connectionString);
        console.log(`Connected to DB Database, host: ${connect.connection.host}, Database name: ${connect.connection.name} `);

    }
  catch (error) {
        console.error(error);
        process.exit(1);
  }
}

export default connectDb;