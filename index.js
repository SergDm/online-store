const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const app = express()
const homeRoutes = require('./routers/home')
const productsRoutes = require('./routers/products')
const adminRoutes = require('./routers/admin')
const cardRoutes = require('./routers/card')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
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

async function start() {
  try {
    const url = 'mongodb+srv://sergeydm:v9q4J0i01bWbPSs9@cluster0-11lpy.mongodb.net/shop'
    await mongoose.connect(url, {
      useUnifiedTopology: true, 
      useNewUrlParser: true, 
      useCreateIndex: true, 
      useFindAndModify: false 
    })
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()