const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const homeRoutes = require('./routers/home')
const productsRoutes = require('./routers/products')
const adminRoutes = require('./routers/admin')
const cardRoutes = require('./routers/card')
const ordersRoutes = require('./routers/orders')
const Handlebars = require('handlebars')
const User = require('./models/user')
const authRoutes = require('./routers/auth')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
  try {
    const user = await User.findById('5e6cde34abe0b60b90bab1bd')
    req.user = user
    next()
  } catch (e) {
    console.log(e)
  }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: false
}))

app.use('/', homeRoutes)
app.use('/admin', adminRoutes)
app.use('/products', productsRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)

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
    const candidate = await User.findOne()
    if (!candidate) {
      const user = new User({
        email: 'sergey@gmail.com',
        name: 'Sergey',
        cart: { items: [] }
      })
      await user.save()
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()