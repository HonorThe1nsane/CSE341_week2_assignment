

const { ObjectID } = require('bson');
const mongodb = require('../db/connect');

const getData = async (req, res, next) => {
  const result = await mongodb.getDb().db('contacts').collection('people').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);

  });
};

const getSingleData = async (req, res, next) => {
  const result = await mongodb.getDb().db('contacts').collection('people').find({"_id":ObjectID("632ff12d7419b9a97ed58cf9")});
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);

  });
};

module.exports = { getSingleData, getData };

