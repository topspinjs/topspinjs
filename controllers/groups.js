module.exports = function (app) {

  var bookshelf = app.get('bookshelf')
    , Group = require('../models/group');

  app.get('/groups', function (req, res) {

    Group(bookshelf)
    .fetchAll()
    .then(function (groups) {
      res.json(groups.toJSON());
    });
  });

};
