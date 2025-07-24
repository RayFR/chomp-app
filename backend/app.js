const express = require("express"); 
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// setup
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// middleware init
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());

// routes
const indexRoutes = require("./src/routes/index");
app.use("/", indexRoutes);

app.listen(PORT, () => {
    console.log(`running on port http://localhost:${PORT}`);
});

module.exports = app;