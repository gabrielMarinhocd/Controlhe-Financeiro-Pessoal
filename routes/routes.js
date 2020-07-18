const express = require('express');
const transactionRouter = express.Router();
const {
  findAll,
  create,
  remove,
  update,
  findOne,
} = require('../services/transactionService');

transactionRouter.get('/', findAll);
transactionRouter.get('/find', findOne);
transactionRouter.post('/', create);
transactionRouter.patch('/', update);
transactionRouter.delete('/', remove);

module.exports = transactionRouter;
