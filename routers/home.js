const {Router} = require('express')
const hello = require('../utils/hello')
const router = Router()

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Home page',
    isHome: true,
    isAdmin: req.user ? req.user.admin : null,
    hello: hello(req.user ? req.user.name : null)
  })
})

module.exports = router