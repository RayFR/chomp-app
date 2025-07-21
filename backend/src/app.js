const express = require("express"); 
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// setup
dotenv.config();
const app = express();
const PORT = 3000;

// supabase 
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);  

app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());

app.get("/", (req, res) => {
    console.log(`running on port ${PORT}`);
});

module.exports = app;