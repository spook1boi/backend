class ProductManager {
    constructor() {
        this.products = [];
        this.idCounter = 1;
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
}

const productsManager = new ProductManager();


const emptyProducts = productsManager.getProducts();
console.log(emptyProducts);


productsManager.addProduct('Cupcake Vainilla', 'Rico cupcake sabor vainilla', 600, 'imagen1.jpg', 239, 15);
productsManager.addProduct('Cupcake Chocolate', 'Descripción 2', 700, 'imagen2.jpg', 437, 10);
productsManager.addProduct('Cupcake Red Velvet', 'Descripción 3', 800, 'imagen3.jpg', 593, 7);

//En caso de que uno de los codigos de un cupcake este repetido, aplicara el if de la linea 8


const allProducts = productsManager.getProducts();
console.log(allProducts);


const productById = productsManager.getProductById(3);
console.log(productById);


const nonExistentProduct = productsManager.getProductById(10);
console.log(nonExistentProduct);