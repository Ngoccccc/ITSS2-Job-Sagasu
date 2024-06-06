const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./configs/db.js");
const route = require('./routes');

dotenv.config();

//database config
connectDB();

const app = express();
// Init middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(
  express.urlencoded({
      extended: true,
  }),
);

// Routes
// app.use("/api/v1/auth", authRoutes);



//PORT
const PORT = process.env.PORT || 4000;

route(app);

//run listen
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
