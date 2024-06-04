const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(
      process.env.MONGO_URL ||
        "mongodb+srv://dbUser:ITSS2@itss2.zlpbczh.mongodb.net/?retryWrites=true&w=majority&appName=ITSS2/ITSS2"
    );
    console.log(`Connected to mongoDB ${conn.connection.host}`);
  } catch (error) {
    console.log(`Failed to connect mongoDB ${error}`);
  }
};

module.exports = connectDB;
