const { Router } = require('express')
const Article = require('../models/article')
const auth = require('../middleware/auth')
const marked = require('marked')
const router = Router()


router.get('/', async (req, res) => {
  try {
    const articles = await Article.find()
    
    res.render('articles', {
      title: 'Articles',
      isArticles: true,
      articles
    })
  } catch (e) {
    console.log(e)
  }
})

router.get('/:id/edit', auth, async (req, res) => {

  try {
    const article = await Article.findById(req.params.id)
    
    res.render('article-edit', {
      title: `Edit ${article.title}`,
      article
    })
  } catch (e) {
    console.log(e)
  }
})

router.post('/edit', auth, async (req, res) => {
  try {
    const { id } = req.body
    delete req.body.id
    const markedText = marked(req.body.text)
    const article = await Article.findById(id)
    const newArticle = {
      title: req.body.title,
      author: req.body.author,
      text: markedText,
      textMarked: req.body.text,
      img: req.body.img,
    }
    Object.assign(article, newArticle)
    await article.save()
    res.redirect('/articles')
  } catch (e) {
    console.log(e)
  }
})

router.post('/remove', auth, async (req, res) => {
  try {
    await Article.deleteOne({
      _id: req.body.id
    })
    res.redirect('/articles')
  } catch (e) {
    console.log(e)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    res.render('article', {
      title: `Article ${article.title}`,
      article
    })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router