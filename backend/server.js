const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 3000;
const connectDB = require("./config/db");

const path = require("path");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/index"));
app.use("/api/users", require("./routes/userRoutes"));


app.use(errorHandler);
app.listen(port, () => console.log(`Server start on port ${port}`));
