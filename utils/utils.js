import fs from 'fs';
import path from 'path';

const productsLocation = 'C:/Users/Narvaja/Desktop/nucba-clases/EJERCICIOS/NODE/CRUD/products.json';

const saveProducts = (products) =>
  fs.writeFileSync(path.resolve(productsLocation), JSON.stringify(products));

const getProducts = () => JSON.parse(fs.readFileSync(path.resolve(productsLocation)));

export { saveProducts, getProducts };
