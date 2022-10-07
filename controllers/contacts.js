
const ObjectId = require('mongodb').ObjectId;

const mongodb = require('../db/connect');
const { person } = require('../models');
//const Person = mongodb.person;
const db = require('../models');
const Person = db.person;

const apiKey = 'WD1iqsbf6aEgjm4AToTiLv51TvwUvfGqcsJj6vIWJ4teKQOtiD3E475XsxbLA2tR';


const getData = async (req, res) => {
  const result = await mongodb.getDb().db().collection('people').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);

  });

};
//Swagger function
exports.findAll = (req, res) => {

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
//rest client function
const getSingleData = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('people').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);

  });

};
//Work with swagger
exports.getSingleData = (req, res) => {

  const id = new ObjectId(req.params.id);
  console.log(id);
  if (req.header('apiKey') === apiKey) {
    Person.find({ _id: id })
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: 'Not Person found  with id ' + id });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving Person with id=' + id,
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};
// rest client
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
//work with swagger
exports.createNewContact = (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  person
    .save(person)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Temple.',
      });
    });
};
//rest client function
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
//swagger
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = new ObjectId(req.params.id);

  Person.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Person with id=${id}. Maybe Person was not found!`,
        });
      } else res.send({ message: 'Person was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Person with id=' + id,
      });
    });
};


//Rest client
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

// Swagger

// Delete a Temple with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Person.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Person with id=${id}. Maybe the person was not found!`,
        });
      } else {
        res.send({
          message: 'Person was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Person with id=' + id,
      });
    });
};

module.exports = { getSingleData, getData, createNewContact, updatePerson, deletePerson };
