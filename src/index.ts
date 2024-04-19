// src/index.js
import express, { Express } from 'express'
import 'reflect-metadata'
import dataSource from './app-data-source'
import homeRoutes from './routes/homeRoutes'
import productRoutes from './routes/productRoutes'
import cartRoutes from './routes/cartRoutes'
import errorHandler from './middlewares/errorHandler'

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(errorHandler)

app.use('/', homeRoutes)
// app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
