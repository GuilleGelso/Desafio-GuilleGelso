const fs = require('fs')

class ProductManager {
  
  constructor(path){
    this.products =[],
    this.id = 1
    this.path = path
    this.format = 'utf-8'
  }
  
  getProducts(){
    const data = fs.readFileSync(this.path, this.format)
    return JSON.parse(data)
  }
  

  addProduct (product){
    const {title, description, price, thumbnail, code, stock} = product
    
    const newProduct = {
      id: this.id++,
      title,
      thumbnail,
      price,
      thumbnail,
      code,
      stock
    }
    
    if(
      !title || 
      !description || 
      !price ||
      !thumbnail ||
      !code || 
      !stock
    ){
      console.log('Error: Datos Faltantes')
      return
    }      
    if ( this.products.some(p => p.code === code) ){
      console.log('Error: Codigo de producto existente')
      return
    }
        
    this.products.push(newProduct)
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
    
  }
  

  getProductByID = (id) => {
    const product = this.products.find(p => p.id === id)
    return product ? product : 'ID No Encontrada'
  }

  updateProduct(id, updates) {
    try{
      const data = fs.readFileSync(this.path, this.format)
      this.products = JSON.parse(data)
      const productIndex = this.products.findIndex((x) => x.id === id)
      if (productIndex === -1) {
        console.log("El producto no existe")
        return
      }
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updates,
        id: this.products[productIndex].id
      }
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
      return this.products[productIndex]
    } catch (error){
      console.log('Error', error.message)
      return
    }
  }

  deleteProduct(id) {
    const products = this.getProducts()
    const index = products.findIndex(product => product.id === id)
    if(index === -1){
      return null
    }
    const deletedProduct = products.splice(index, 1)[0]
    fs.writeFileSync(this.path, JSON.stringify(products))
    return deletedProduct
  }

}

const productManager = new ProductManager('./products.json')

console.log('Test array al inicio', productManager.getProducts())

productManager.addProduct({
  title:"Teclado",
  description:"Teclado Genius Usb",
  price:3750,
  thumbnail:'imagen.jpg',
  code:'1234cda',
  stock:19
})

console.log('Test luego de agregar un producto', productManager.getProducts())

console.log('Buscando producto por ID: ', productManager.getProductByID(1))

productManager.updateProduct(1,{title:"Producto Actualizado"})

console.log('Producto Modificado: ', productManager.getProducts())

console.log(productManager.deleteProduct(1))

console.log( 'Test productos borrados ?', productManager.getProducts())