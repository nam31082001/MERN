const mongoose = require('mongoose')

const Schema = mongoose.Schema

const List = new Schema({
    title: { type: String, require: true },
    name: { type: String, require: true },
    body: { type: String, require: true },
    img: { type: String },
    likeCount: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
},
    { timestamps: true }
)

module.exports=mongoose.model('Lists',List)