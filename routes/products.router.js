const express = require('express');
const productsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schemas');

const router = express.Router();
const service = new productsService();

router.get('/', async (req, res, next) => {
  try {
    const products = await service.find();
    if (products.length === 0) {
      throw new Error('No products found');
    }
    res.json(products);
  }
  catch (error) {
    next(error);
  }
});

router.get('/filter', (req, res) => {
  res.json({
    msg: 'You are filtering products',
  });
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json({
        msg: 'You are creating a product',
        data: newProduct,
      });
    } catch (error) {
      res.status(400).json({
        msg: error.message,
      });
    }
  });

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json({
        msg: 'You are updating a product',
        data: product,
      });
    } catch (error) {
      res.status(404).json({
        msg: error.message,
      });
    }
  });

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.delete(id);
    res.json({
      id,
      msg: 'You are deleting a product',
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      msg: error.message,
    });
  }
});

module.exports = router;
