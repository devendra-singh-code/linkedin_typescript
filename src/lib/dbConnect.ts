import mongoose from "mongoose";

type ConnectionObject = { isConnected?: number };

const connetion: ConnectionObject = {};

const dbConnect = async () => {
  if (connetion.isConnected) {
    console.log("Database Already Connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "", {});
    connetion.isConnected = db.connections[0].readyState;
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Error in Connected to Database", error);
    process.exit(1);
  }
};

export default dbConnect;
