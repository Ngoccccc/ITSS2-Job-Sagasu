const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./configs/db.js");
// const authRoutes = require("./routes/authRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes");
const recruitmentPostRoutes = require("./routes/recruitmentPostRoutes.js");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/v1/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/recruitment", recruitmentPostRoutes);
// AUTH VERIFICATION AND UNLESS

app.use(
  auth.verifyToken.unless({
    path: [
      { url: "/user/login", method: ["POST"] },
      { url: "/user/register", method: ["POST"] },
      { url: "/user/get-user-with-email", method: ["POST"] },
      { url: "/post/create", method: ["POST"] },
    ],
  })
);

//MONGODB CONNECTION

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection is succesfull!");
  })
  .catch((err) => {
    console.log(`Database connection failed!`);
    console.log(`Details : ${err}`);
  });

//ROUTES

app.use("/user", userRoute);
app.use("/post", postApplyRoute);
// app.use('/list', listRoute);
// app.use('/card', cardRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is online! Port: ${process.env.PORT}`);
});
