const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/products', db.getProducts)
app.get('/products/:gtin', db.getProductById)
app.post('/products', db.createProduct)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.set( 'port', ( process.env.PORT || 3000 ));

app.listen(app.get('port'), () => {
    console.log(`App running on port ${port}.`)
})

