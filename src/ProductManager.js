const fs = require('fs').promises;

class ProductManager {
    constructor() {
        this.products = [];
    }

    async loadProductsFromFile(filename) {
        try {
            const data = await fs.readFile(filename, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            throw new Error('Error loading products from file.');
        }
    }

    async getProducts(limit) {
        if (limit !== undefined) {
            return this.products.slice(0, limit);
        } else {
            return this.products;
        }
    }

    async getProductById(id) {
        const product = this.products.find(product => product.id === id);
        return product || null;
    }
}

module.exports = ProductManager;