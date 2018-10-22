const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    list: Array
});

module.exports = mongoose.model("shoppinglist", listSchema);