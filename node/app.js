const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/db")

const app = express();
connectDB();

dotenv.config(); // load .env from here

const authRoutes = require("./routes/auth");
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');

app.use(express.json());

// mounts all routes in app
app.use('/', indexRoutes);
app.use('/users/', userRoutes);
app.use('/auth/', authRoutes)

const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
    console.log(`App listening and ran on http://localhost:${PORT}`);
}); 