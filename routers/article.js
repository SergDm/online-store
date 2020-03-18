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
    const article = await Article.findById(id)
    const markedTextEdit = marked(req.body.text)
    Object.assign(article, req.body, req.body.text = markedTextEdit)
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
      layout: 'empty',
      title: `Article ${article.title}`,
      article
    })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router