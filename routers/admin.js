const { Router } = require('express')
const Product = require('../models/product')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', auth, (req, res) => {
  res.render('admin', {
    title: 'Admin',
    isAdmin: true
  })
})

router.post('/', auth, async (req, res) => {
  const product = new Product({
    group: req.body.group,
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    userId: req.user
  })
  
  try {
    await product.save()
    res.redirect('/products')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router