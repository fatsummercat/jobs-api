require("dotenv").config();
const connectDB = require("./db/connectDB");
const User = require("./models/user");

const deleteAllUsers = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await User.deleteMany();
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

deleteAllUsers();
