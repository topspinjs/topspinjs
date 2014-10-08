var path = require('path')
  , net = require('net')
  , chalk = require('chalk')
  , express = require('express')
  , jade = require('jade')
  , serveStatic = require('serve-static')
  , environment = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
  , knexfile = require('./knexfile')
  , config = require('./config.json')
  , knex = require('knex')(knexfile[environment])
  , bookshelf = require('bookshelf')(knex)
  , app;

app = express();
app.engine('jade', jade.__express);
app.use(serveStatic('./ui/public'));
app.set('bookshelf', bookshelf);
app.set('config', config);

app.libs = {};
app.libs._ = require('underscore');
app.libs.io = require('socket.io');

require('./controllers/games')(app);

//app.libs.spark = require('sparknode');
//app.libs.core = new app.libs.spark.Core(settings.sparkCore);

app.listen(config.port);
console.log(chalk.green('Web Server: Listening on port ' + config.port));
