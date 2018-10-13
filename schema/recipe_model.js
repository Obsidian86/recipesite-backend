const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    account: {
        type: String,
        required: true
    },
    uri: String,
    label: String,
    image: String,
    source: String,
    url: String,
    shareAs: String,
    yield: Number,
    dietLabels: Array,
    ingredients: Array,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Recipe", recipeSchema);