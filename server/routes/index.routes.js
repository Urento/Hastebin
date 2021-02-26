'use strict';
module.exports = function(app) {
  var hasteController = require('../controller/index.controller');

  app.route('/haste')
    .get(hasteController.list_all_hastes)
    .post(hasteController.create_a_haste);

  app.route('/haste/:id')
    .get(hasteController.get_haste_byid)
    .delete(hasteController.delete_a_haste);
};