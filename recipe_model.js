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
    ingredients: Array
});

module.exports = mongoose.model("Recipe", recipeSchema);