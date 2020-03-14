const { Schema, model } = require('mongoose')

const product = new Schema({
  title: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: String,
  count: Number
})

module.exports = model('Product', product)