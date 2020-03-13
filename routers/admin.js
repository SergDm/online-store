const {Router} = require('express')
const Product = require('../models/product')
const router = Router()

router.get('/', (req, res) => {
  res.render('admin', {
    title: 'Admin',
    isAdmin: true
  })
})

router.post('/', async (req, res) => {
const product = new Product(req.body.group, req.body.title, req.body.price, req.body.img)

await product.save()

res.redirect('/products')
})

module.exports = router