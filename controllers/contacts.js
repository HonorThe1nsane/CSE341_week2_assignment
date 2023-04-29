
const ObjectId = require('mongodb').ObjectId;

const mongodb = require('../db/connect');
const { person } = require('../models');

const db = require('../models');
const Person = db.person;

// const apiKey = 'WD1iqsbf6aEgjm4AToTiLv51TvwUvfGqcsJj6vIWJ4teKQOtiD3E475XsxbLA2tR';


const getData = async (req, res) => {
  const result = await mongodb.getDb().db().collection('people').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);

  });

};

module.exports = { getData };
