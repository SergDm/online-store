const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Home page',
    isHome: true,
    isAdmin: req.user ? req.user.admin : null
  })
})

module.exports = router