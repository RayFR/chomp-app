const express = require('express');
const app = express();

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');

app.use(express.json());

// mounts all routes in app
app.use('/', indexRoutes);
app.use('/users/', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening and ran on http://localhost:${PORT}`);
}); 