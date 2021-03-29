"use strict";

var mongoose = require("mongoose"),
  Haste = mongoose.model("haste");

exports.list_all_hastes = function (req, res) {
  Haste.find({}, function (err, customers) {
    if (err) res.send(err);
    res.json(customers);
  });
};

exports.create_a_haste = function (req, res) {
  var new_task = new Haste(req.body);
  new_task.save(function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.get_haste_byid = function (req, res) {
  Haste.findOne({ id: req.params.id }, function (err, hasteInfo) {
    if (err) res.send(err);
    res.json(hasteInfo);
  });
};

exports.delete_a_haste = function (req, res) {
  Haste.remove(
    {
      id: req.params.id,
    },
    function (err, task) {
      if (err) res.send(err);
      res.json({ message: "Haste was successfully deleted" });
    }
  );
};
