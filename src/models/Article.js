const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ArticleSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    Title: {
        type: String,
        required: true,
        max: 40
    },
    description: {
        type: String
    },
    Body: {
        type: String
    },

});

module.exports = Profile = mongoose.model("articles", ArticleSchema);
