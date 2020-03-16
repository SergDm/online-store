const { Router } = require('express')
const Product = require('../models/product')
const admin = require('../middleware/admin')
const router = Router()

router.get('/', admin, async (req, res) => {
  try {
    const products = await Product.find()
      .populate('userId', 'email name')
      .select('price title group')
    res.render('admin', {
      title: 'Admin',
      isAdmin: true,
      products
    })
  } catch (e) {
    console.log(e)
  }
})

router.post('/', admin, async (req, res) => {
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