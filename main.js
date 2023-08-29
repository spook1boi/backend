const fs = require('fs');

class ProductManager {
    constructor() {
        this.products = [];
        this.idCounter = 1;
    }

    loadProductsFromFile(filename) {
        try {
            const data = fs.readFileSync(filename, 'utf8');
            this.products = JSON.parse(data);
            this.idCounter = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
        } catch (error) {
            console.error("Error loading products from file:", error.message);
        }
    }

    saveProductsToFile(filename) {
        try {
            fs.writeFileSync(filename, JSON.stringify(this.products, null, 2));
            console.log("Products saved to file:", filename);
        } catch (error) {
            console.error("Error saving products to file:", error.message);
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (this.products.some(product => product.code === code)) {
            console.log(`El codigo ${code} esta repetido`);
            return;
        }

        if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        const newProduct = {
            id: this.idCounter,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct);
        this.idCounter++;
        this.saveProductsToFile('products.json');
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.log("Producto no encontrado");
            return null;
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            const deletedProduct = this.products.splice(index, 1)[0];
            this.saveProductsToFile('products.json');
            fs.unlink(`thumbnails/${deletedProduct.thumbnail}`, (err) => {
                if (err) {
                    console.error("Error al eliminar la imagen:", err.message);
                } else {
                    console.log(`Producto con ID ${id} y su imagen eliminados exitosamente.`);
                }
            });
        } else {
            console.log(`Producto con ID ${id} no encontrado.`);
        }
    }
}

const productsManager = new ProductManager();
productsManager.loadProductsFromFile('products.json');

//mostrara la array antes de agregarse el cupcake nuevo
const emptyProducts = productsManager.getProducts();
console.log(emptyProducts);

//al agregar un cupcake con un codigo ya existente (dira que esta repetido)
productsManager.addProduct('Cupcake Vainilla', 'Rico cupcake sabor vainilla', 600, 'imagen1.jpg', 239, 15);

//se agregara un cupcake nuevo directamente al archivo JSON (aparecera con la ID 6)
productsManager.addProduct('Cupcake nuevo', 'Descripcion nueva', 850, 'imagenRandomNueva.jpg', 384, 10);

const allProducts = productsManager.getProducts();
console.log(allProducts);

const productById = productsManager.getProductById(3);
console.log(productById);

const nonExistentProduct = productsManager.getProductById(10);
console.log(nonExistentProduct);

//eliminara del JSON el cupcake de chocolate
productsManager.deleteProduct(2);