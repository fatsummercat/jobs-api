require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connectDB");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Jobs API");
});

app.use("/api/v1/auth", require("./routes/auth"));
app.use(
  "/api/v1/jobs",
  require("./middleware/authentication"),
  require("./routes/jobs")
);

app.use(require("./middleware/errorHandler"));

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB...");

    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
