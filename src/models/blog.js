const mongoose = require('mongoose')
const Schema = mongoose.Schema


const blogSchema = new Schema({
    tracknumber: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    courier: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog