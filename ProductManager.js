class ProductManager {

    #products
    #error



    constructor() {
        this.#products = []
        this.#error = undefined
    }

    #generateId = () => (this.#products.length === 0) ? 1 : this.#products[this.#products.length - 1].id + 1

    #validateProduct = (title, description, price, imagen, code, stock) => {

        if (!title || !description || !price || !imagen || !code || !stock)
            this.#error = '${title} : Faltan Completar Campos '
        else {
            const existingProduct = this.#products.find((item) => item.code === code)

            if (existingProduct)
                this.#error = '${title}: El Producto Ya Existe '

            else this.#error = undefined
        }
    }


    addProduct = (title, description, price, imagen, code, stock) => {
        this.#validateProduct(title, description, price, imagen, code, stock)

        if (this.#error === undefined)
            this.#products.push({ id: this.#generateId(), title, description, price, imagen, code, stock })
        else
            console.log(this.#error)

    }

    getProducts = () => this.#products

    getProductById = (id) => {
        const productId = this.#products.find((item) => item.id === id)

        if (!productId) return 'Producto No Encontrado'
        else return productId

    }


}


const productManager = new ProductManager()

console.log(productManager.getProducts())


productManager.addProduct(
    'Producto 1',
    'Descripcion Producto 1',
    35,
    'imagen1.jpg',
    '0001',
    15
)

productManager.addProduct(
    'Producto 2',
    'Descripcion Producto 2',
    60,
    'imagen2.jpg',
    '0002',
    18
)

productManager.addProduct(
    'Producto 3',
    'Descripcion Producto 3',
    40,
    'imagen3.jpg',
    '0003',
    22
)


////////////////////////////////

productManager.addProduct(
    'Producto 4',
    'Descripcion Producto 4',
    49,
    'imagen2.jpg',
    '0001',
    23
)


///////////////////////////

productManager.addProduct(
    'Producto 5',
    33,
    17
)




productManager.addProduct(
    'Producto 6',
    'Descripcion Producto 6',
    77,
    'imagen8.jpg',
    '0008',
    21
)

//////////////////////////////////

console.log(productManager.getProducts())


console.log(productManager.getProductById (3))
console.log(productManager.getProductById (1))


console.log(productManager.getProductById (10))