const mongoose = require("mongoose");

const schema = {
    // post: {
        id: String,
        title: String,
        author: String,
        date: String
    // }
}

const Note = mongoose.model("Note", schema);

module.exports = Note;