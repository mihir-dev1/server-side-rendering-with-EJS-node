const express = require("express");
const { connectMongoDB } = require("./config/connection");
const URLRouter = require("./routers/url");
const UserRouter = require("./routers/user");
const staticRouter = require("./routers/staticRouter");
const { authMiddleware, checkAuth } = require("./middlewares/auth");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();

const PORT = process.env.PORT || 3000;

//localhost:27017/urlShortener

mongodb: connectMongoDB("mongodb://localhost:27017/urlShortener")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/urls", authMiddleware, URLRouter);
app.use("/api/users", UserRouter);
app.use("/", staticRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
