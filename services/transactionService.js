const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const findAll = async (req, res) => {
  const { period } = req.query;
  try {
    if (period != null) {
      const trasaction = await TransactionModel.find({});

      res.send(trasaction.filter((m) => m.yearMonth === period));
    } else {
      res.send(
        ' E necessario informar o parametro "period", cujo o valor deve estar no formato yyyy-mm'
      );
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const findOne = async (req, res) => {
  const id = req.query.id;

  try {
    const data = await TransactionModel.findById({ _id: id });

    if (data.length < 1) {
      res
        .status(404)
        .send({ message: 'Nenhum objeto encontrado com o id:' + id });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Documento id: ' + id });
  }
};

const create = async (req, res) => {
  const trasaction = new TransactionModel(req.body);

  try {
    await trasaction.save();
    res.send(trasaction);
  } catch (err) {
    res.status(500).send(err);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.query.id;

  try {
    const data = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    if (data.length < 1) {
      res
        .status(404)
        .send({ message: 'Nenhum pokemon encontrado para atualizar' });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar o Pokemon id: ' + id });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.query.id;
    const student = await TransactionModel.findOneAndDelete({ _id: id });
    console.log(student);

    if (!student) {
      res.status(404).send('Documento nao encontrado');
    }

    res.status(200).send('Removido com sucesso!');
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { findAll, findOne, create, remove, update };
