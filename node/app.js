const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');

const app = express();

// morgan libb for logs
app.use(morgan('combined'));

// bodyParser lib for parsing HTTP req so it's easier to handle
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

dotenv.config(); // load .env from here

const authRoutes = require("./routes/auth");
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');

app.use(express.json());

// mounts all routes in app
app.use('/', indexRoutes);
app.use('/users/', userRoutes);
app.use('/auth/', authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`App listening and ran on http://localhost:${process.env.PORT}`);
}); 
