const express = require('express')
const app = express()
const natsWrapper = require('./nats_wrapper')
const cors = require('cors')
const ProductCreatedPublisher = require('./product-created-publisher')

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

let products = []

app.get('/api/product', (req, res) => {
    res.send({
        products: products
    })
})

app.post('/api/product', (req, res) => {
    let { id, name } = req.body

    products.push({id, name})

    new ProductCreatedPublisher(natsWrapper.getClient()).publish({id, name})

    res.send({
        status: true,
        message: "Product Added"
    })
})

const start = async () => {

    try {
        await natsWrapper.connect()

        app.listen(PORT, () => {
            console.log("Server listening on port ", PORT)
        })
    } catch (err) {
        console.log(err)
    }
}

start()