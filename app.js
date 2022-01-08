import express from "express";
import productsRouter from './routes/products.js';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getProducts, saveProducts } from "./utils/utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config()

const app = express();

// BODY INTERPRETATION MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// LOG MIDDLEWARE 
const fn = (req, res, next) => {
  console.log('Middleware running!');
  next();
}

// ROUTES

app.use('/api/products/', productsRouter);

app.get('/', fn, (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});

app.get('/about', fn, (req, res) => {
  res.sendFile(__dirname + '/public/about.html')
});

app.get('/product', fn,  (req, res) => {
  res.sendFile(__dirname + '/public/products.html')
});

app.post('/product', fn,  (req, res) => {
  res.sendFile(__dirname + '/public/products.html')
  const products = getProducts();
  const name = req.body.name;
  const color = req.body.color;
  const key = Object.entries(products).length;
  products[key] = { name, color };
  saveProducts(products)
  res.send(products);
  console.log(name, color);
});

app.get('/product/:name', fn,  (req, res) => {
  const products = getProducts();
  if (Object.entries(products).length === 0) {
    res.status(418).send("<h1>You are a teapot! This product doensn't exist</h1>")
  }
  const theProduct = products[req.params.name]
  res.send(`
  <h1>Product Name: ${theProduct.name}</h1>
  <h1>Product Color: ${theProduct.color}</h1>
  `)
});

app.get('*', (req, res) => {
  res.status(404).send('<h1>Error 404: Not Found :(</h1>');
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
})