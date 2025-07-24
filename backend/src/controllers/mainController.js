const supabase = require("../utils/supabase");

const handlePost = async (req, res) => {
    console.log("POST / body");

    res.status(200).send("Request received");
};

module.exports = { handlePost };
