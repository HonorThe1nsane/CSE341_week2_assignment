
const ObjectId = require('mongodb').ObjectId;

const mongodb = require('../db/connect');
const Person = mongodb.person;

const apiKey = '1RAHIc5c6J1SJ12pTp45vBlafXjJjuQrlCOnokutFJ0SduckeOZEr59HhwZhWTbN';


const getData = async (req, res) => {
  const result = await mongodb.getDb().db().collection('people').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);

  });
  console.log(req.header('apiKey'));
  if (req.header('apiKey') === apiKey) {
    Person.find(
      {},
      {
        firstName: 1,
        lastName: 1,
        email: 1,
        favoriteColor: 1,
        birthday: 1,
        _id: 0,
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving temples.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

const getSingleData = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('people').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);

  });
  const id = req.params.id;
  if (req.header('apiKey') === apiKey) {
    Person.find({ _id: id })
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: 'Not Person found  with id ' + _id });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving Person with id=' + _id,
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
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
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }
  const userId = new ObjectId(req.params.id);
  const person = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db().collection('people').replaceOne({ _id: userId }, person);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the person in contacts.');
  }
};



const deletePerson = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('people').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};


module.exports = { getSingleData, getData, createNewContact, updatePerson, deletePerson };
