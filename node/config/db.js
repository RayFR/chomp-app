const mongoose = require("mongoose"); // mongoose ODM (Object Data Modelling)

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/chomp-cluster`, { // connect to mongoDB using the connection string
            useNewUrlParser: true, // using new string parser
            useUnifiedTopology: true, // improves server discovery and monitoring
        });
        console.log("MONGO DB CONNECTED");
    } catch (err) {
        console.error("ERROR === ", err.message);
        process.exit(1); // forceful app exit
    }
};

module.exports = connectDB;