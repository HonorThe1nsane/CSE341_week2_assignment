
const ObjectId = require('mongodb').ObjectId;
//const { ObjectID } = require('bson');
const mongodb = require('../db/connect');

const getData = async (req, res) => {
  const result = await mongodb.getDb().db().collection('people').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);

  });
};

const getSingleData = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('people').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);

  });
};

const createNewContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db().collection('people').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updatePerson = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const person = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .replaceOne({ _id: userId }, person);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the person in contacts.');
  }
};

module.exports = { getSingleData, getData, createNewContact, updatePerson };
