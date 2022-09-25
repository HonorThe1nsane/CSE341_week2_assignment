

const { ObjectID } = require('bson');
const mongodb = require('../db/connect');

const getData = async (req, res, next) => {
  const result = await mongodb.getDb().db('contacts').collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);

  });
};

const getSingleData = async (req, res, next) => {
  const result = await mongodb.getDb().db('contacts').collection('contacts').find({"_id":ObjectID("632fa9367419b9a97ed58cf4")});
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);

  });
};

module.exports = { getSingleData, getData };
// module.exports = { getData };

