const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 8080;

const ProductManager = require('../src/ProductManager');

const productsManager = new ProductManager();

app.use(express.json());

app.get('/products', async (req, res) => {
    try {
        await productsManager.loadProductsFromFile('products.json');
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await productsManager.getProducts(limit);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error getting the products.' });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        await productsManager.loadProductsFromFile('products.json');
        const pid = parseInt(req.params.pid);
        const product = await productsManager.getProductById(pid);
        
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error getting the product.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});