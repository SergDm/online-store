const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const csrf = require('csurf')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const session = require('express-session')
const helmet = require('helmet')
const compression = require('compression')
const MongoStore= require('connect-mongodb-session')(session)
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const homeRoutes = require('./routers/home')
const productsRoutes = require('./routers/products')
const adminRoutes = require('./routers/admin')
const cardRoutes = require('./routers/card')
const ordersRoutes = require('./routers/orders')
const Handlebars = require('handlebars')
const authRoutes = require('./routers/auth')
const articleRoutes = require('./routers/article')
const profileRoutes = require('./routers/profile')
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')
const errorHandler = require('./middleware/error')
const fileMiddleware = require('./middleware/file')
const keys = require('./keys')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  helpers: require('./utils/hbs-helpers')
})

const store = new MongoStore({
  collection: 'session',
  uri: keys.MONGODB_URI
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use('/images',express.static(path.join(__dirname, 'images')))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: keys.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store
}))
app.use(fileMiddleware.single('avatar'))

app.use(flash())
app.use(helmet())
app.use(csrf())
app.use(compression())
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/', homeRoutes)
app.use('/admin', adminRoutes)
app.use('/products', productsRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)
app.use('/articles', articleRoutes)
app.use('/profile', profileRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

async function start() {
  try {
    await mongoose.connect(keys.MONGODB_URI, {
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