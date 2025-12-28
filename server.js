const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage
let products = [
    { id: 1, name: "Laptop", price: 999.99 },
    { id: 2, name: "Mouse", price: 25.50 }
];

// --- ROUTES ---

// 1. CREATE a product
app.post('/products', (req, res) => {
    const { name, price } = req.body;
    const newProduct = {
        id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
        name,
        price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// 2. GET ALL products
app.get('/products', (req, res) => {
    res.json(products);
});

// 3. GET product BY ID
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

// 4. UPDATE a product
app.put('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');

    const { name, price } = req.body;
    product.name = name || product.name;
    product.price = price || product.price;

    res.json(product);
});

// 5. DELETE a product
app.delete('/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).send('Product not found');

    const deletedProduct = products.splice(productIndex, 1);
    res.json(deletedProduct[0]);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});