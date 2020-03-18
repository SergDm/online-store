const { Router } = require('express')
const Product = require('../models/product')
const Article = require('../models/article')
const admin = require('../middleware/admin')
const marked = require('marked')
const router = Router()

router.get('/', admin, async (req, res) => {
  try {
    const products = await Product.find()
      .populate('userId', 'email name')
      .select('price title group')
    const articles = await Article.find()
      .populate('userId', 'email name')
      .select('date title')
    res.render('admin', {
      title: 'Admin',
      isAdmin: true,
      products,
      articles
    })
  } catch (e) {
    console.log(e)
  }
})

router.post('/product', admin, async (req, res) => {
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

router.post('/article', admin, async (req, res) => {
  const markedText = marked(req.body.text)
  
  const article = new Article({
    title: req.body.title,
    author: req.body.author,
    text: markedText,
    img: req.body.img,
  })

  try {
    await article.save()
    res.redirect('/articles')
  } catch (e) {
    console.log(e)
  }
})


module.exports = router