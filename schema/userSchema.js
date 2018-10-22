const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    recipes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    }]
});

userSchema.pre("save", async function(next){
    try {
        if(!this.isModified("password")){
            return next();
        }
        console.log( this.password );
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err)
    }
});

module.exports = mongoose.model("User", userSchema);