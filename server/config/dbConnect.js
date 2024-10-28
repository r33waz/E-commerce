import mongosse from "mongoose";

const dbConnect = async () => {
  try {
    const { connection } = await mongosse.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connection.host}`);
  } catch (error) {
    console.log(error);
    console.log(" Please make sure MongoDB is connected. ");
  }
};

export default dbConnect;
