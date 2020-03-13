const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const app = express()
const homeRoutes = require('./routers/home')
const productsRoutes = require('./routers/products')
const adminRoutes = require('./routers/admin')
const cardRoutes = require('./routers/card')

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/admin', adminRoutes)
app.use('/products', productsRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})