const {Router} = require('express')
const Product = require('../models/product')
const router = Router()

function mapCartItems(cart) {
  return cart.items.map(el => ({
    ...el.productId._doc,
    id: el.productId.id,
    count: el.count
  }))
}

function computePrice(products) {
  return products.reduce((total, product) => {
    return total += product.price * product.count
  }, 0)
}

router.post('/admin', async (req, res) => {
  const product = await Product.findById(req.body.id)
  await req.user.addToCart(product)
  res.redirect('/card')
})

router.delete('/remove/:id', async (req, res) => {
  await req.user.removeFromCart(req.params.id)
  const user = await req.user.populate('cart.items.productId').execPopulate()
  const products = mapCartItems(user.cart)
  const cart = {
    products, price: computePrice(products)
  }
  res.status(200).json(cart)
})

router.get('/', async (req, res) => {
  const user = await req.user
    .populate('cart.items.productId')
    .execPopulate()

  const products = mapCartItems(user.cart)
  res.render('card', {
    title: 'Cart',
    isCard: true,
    products: products,
    price: computePrice(products)
  })
})

module.exports = router