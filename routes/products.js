import express from 'express';
import { getProducts, saveProducts } from '../utils/utils.js';

const router = express.Router();

// MIDDLEWARES ONLY IN API/PRODUCTS

function validateID (req, res, next) {
  const products = getProducts();
  if (!products[req.params.id]) {
    res.status(404);
    res.send('Unexistent product');
  }
  next();
}

        //  /api/products
router.get('/', (req, res) => {
  const products = getProducts();
  res.json(products);
})

router.get('/:id', validateID, (req, res) => {
  const products = getProducts();
  res.json(products[req.params.id]);
})

router.delete('/:id', validateID, (req, res) => {
  const products = getProducts();
  delete products[req.params.id];
  saveProducts(products);
})

router.post('/', (req, res) => {
  const { name, color } = req.body;
  const products = getProducts();
  const key = Object.entries(products).length;
  products[key] = { name, color };
  saveProducts(products)
  res.send(products);
})

export default router;