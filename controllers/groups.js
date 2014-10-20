module.exports = function (app) {

  var bookshelf = app.get('bookshelf')
    , Group = require('../models/group')(bookshelf);

  app.get('/api/groups', function (req, res) {
    Group
    .fetchAll()
    .then(function (groups) {
      res.json(groups);
    });
  });

};
