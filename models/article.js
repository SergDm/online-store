const { Schema, model } = require('mongoose')

const article = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  img: String,
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('Article', article)