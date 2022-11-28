import { getAllProducts } from '../negocio/productos.js';

const getProductsList = async (req, res) => {
  const productos = await getAllProducts();
  res.status(200).send(productos);
};

export { getProductsList };