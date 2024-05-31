import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.NODE_DB, {
      dbName: "mern-pos",
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
