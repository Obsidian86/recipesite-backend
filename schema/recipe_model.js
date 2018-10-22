const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
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
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("Recipe", recipeSchema);