const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 3000;
const connectDB = require("./config/db");

const exphbs = require('express-handlebars');
const path=require('path')

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/** Routes */
// app.get("/", async (req, res) => {
//   res.status(200).json({ message: "Hello World" });
// });

// app.get('/login', (req, res)=>{
//   res.status(200).json({ message: "Login" });
// })
app.use('/', require('./routes/index'))
app.use("/api/users", require("./routes/userRoutes"));

//Handlebars
app.engine('.hbs', exphbs.engine({defaultLayout:'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//static
app.use(express.static(path.join(__dirname, 'public')))


app.use(errorHandler);
app.listen(port, () => console.log(`Server start on port ${port}`));
