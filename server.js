const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');

app.get('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
  res.json(products);
});

app.get("/products", (req, res) => {
  const { category } = req.query;
  const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
  if (category) {
    const filteredProducts = products.filter(product => product.Category === category);
    res.json(filteredProducts);
  } else {
    res.json(products);
  }
});

app.get("/filterproducts", (req, res) => {
  const { category, price } = req.query;
  const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
  if (category && price) {
    const filteredProducts = products.filter(product => product.Category === category && product.Price >= price);
    res.json(filteredProducts);
  } else {
    res.status(400).json({ "error": "Missing category or price" });
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});