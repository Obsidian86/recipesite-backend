const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    account: {
        type: String,
        required: true
    },
    list: Array
});

module.exports = mongoose.model("shoppinglist", listSchema);