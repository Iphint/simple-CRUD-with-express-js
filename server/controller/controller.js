var userDb = require("../model/model");

// create and save user
exports.create = (req, res) => {
  // validate req
  if (!req.body) {
    res.status(400).send({ message: "Content can't be empty!" });
    return;
  }
  // New user
  const user = new userDb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // save in db
  user
    .save(user)
    .then((data) => {
      // res.send(data);
      res.redirect('/')
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating new user",
      });
    });
};
// retrive and return all users or a single user
exports.find = (req, res) => {
  // get single user
  if (req.query.id) {
    const id = req.query.id;
    userDb
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "User not found by id" });
        } else {
          res.send(data);
        }
      })
      .catch(function (err) {
        res
          .status(500)
          .send({
            message: err.message || "error retrivied data with id",
          });
      });
  } else {
    userDb
      .find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send(err.message || "Some error occured while retvied data");
      });
  }
};

// update a user
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data can't to update" });
  }
  const id = req.params.id;
  userDb
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        req.status(400).send({
          message: "data can't to update maybe user not found",
        });
      } else {
        // res.send(data),
        res.redirect('/')
      }
    })
    .catch((err) => {
      res.status(500).send("data gaisok update");
    });
};

// delete user
exports.delete = (req, res) => {
  const id = req.params.id;
  userDb
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Can't delete wit id ${id}` });
      } else {
        res.send({
          message: "User was deleted",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "error delete user" });
    });
};
