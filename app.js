var environment = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
  , fs          = require('fs')
  , path        = require('path')
  , net         = require('net')
  , chalk       = require('chalk')
  , express     = require('express')
  , http        = require('http')
  , jade        = require('jade')
  , serveStatic = require('serve-static')
  , compression = require('compression')
  , session     = require('express-session')
  , helmet      = require('helmet')
  , knexfile    = require('./knexfile')
  , config      = require('./config.json')
  , knex        = require('knex')(knexfile[environment])
  , bookshelf   = require('bookshelf')(knex)
  , events      = require('events')
  , passport    = require('passport')
  , bodyParser  = require('body-parser')
  , multer      = require('multer')
  , plugins_path
  , events
  , server
  , app;

app = express();
server = http.createServer(app);
events = new events.EventEmitter();

app.engine('jade', jade.__express);
app.set('view engine', 'jade');

app.use(helmet());
app.use(serveStatic('./public'));
app.use(session({ secret: 'foobar', resave: true, saveUninitialized: true }));
app.use(compression({ threshold: 512 }));
app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.set('etag', 'weak');

app.set('events', events);
app.set('bookshelf', bookshelf);
app.set('config', config);

require('./controllers/games')(app);
require('./controllers/games.current')(app);
require('./controllers/players')(app);
require('./controllers/groups')(app);
require('./controllers/auth')(app, passport);


plugins_path = './plugins/';

fs.readdir(plugins_path, function (err, files) {
  if (err) {
    throw err;
  }

  files.map(function (file) {
    return path.join(plugins_path, file);
  }).filter(function (file) {
    return fs.statSync(file).isFile();
  }).forEach(function (file) {
    var plugin_path = plugins_path + path.basename(file, '.js');
    console.log("Loading plugin '%s'...",  plugin_path);
    require(plugin_path)(app);
  });
});

app.get('/', function (req, res) {
  res.render('index', { users: [] });
});

module.exports = app;
