var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: '/api/games'
, defaults: {
    type: 'singles'
  }
});
