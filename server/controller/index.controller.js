"use strict";

var mongoose = require("mongoose"),
  Task = mongoose.model("haste");

exports.list_all_hastes = function (req, res) {
  Task.find({}, function (err, customers) {
    if (err) res.send(err);
    res.json(customers);
  });
};

exports.create_a_haste = function (req, res) {
  var new_task = new Task(req.body);
  new_task.save(function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.get_haste_byid = function (req, res) {
  Task.findOne({ id: req.params.id }, function (err, customerInfo) {
    if (err) res.send(err);
    res.json(customerInfo);
  });
};

exports.delete_a_haste = function (req, res) {
  Task.remove(
    {
      id: req.params.id,
    },
    function (err, task) {
      if (err) res.send(err);
      res.json({ message: "Haste was successfully deleted" });
    }
  );
};
