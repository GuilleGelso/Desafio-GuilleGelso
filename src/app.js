import express from 'express'
import { productManager } from './ProductManager.js'

const app = express()
app.use(express.urlencoded({ extended:true }))

app.get('/products', async(req, res) => {
    try {
        const limit = req.query.limit 

        const products = await productManager.getProducts()

        if (!limit) res.send( products )
        else {
            const productsLimit = products.slice(0, limit)
            res.json( productsLimit )
        }
    } catch (err) {
        res.send('Hubo un error al obtener los productos')
    }
})

app.get('/products/:pid', async(req,res) => {
    try {
        const productId = parseInt(req.params.pid)

        const product = await productManager.getProductById(productId)

        if (!product) return res.send({ error: `El producto con el id ${productId} no existe` })
        res.send( product )
    } catch (err) {
        res.send('Hubo un error al obtener el producto')
    }
})

const port = 8080
const server = app.listen(port, () => console.log(`Server Express en el puerto ${server.address().port}`))


