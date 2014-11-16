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
  , io          = require('socket.io')
  , helmet      = require('helmet')
  , knexfile    = require('./knexfile')
  , config      = require('./config.json')
  , knex        = require('knex')(knexfile[environment])
  , bookshelf   = require('bookshelf')(knex)
  , events      = require('events')
  , passport    = require('passport')
  , plugins_path
  , events
  , server
  , app;

app = express();
server = http.createServer(app);
io = io.listen(server);
events = new events.EventEmitter();

app.engine('jade', jade.__express);
app.set('view engine', 'jade');

app.use(helmet());
app.use(serveStatic('./ui/public'));
app.use(session({ secret: 'foobar', resave: true, saveUninitialized: true }));
app.use(compression({ threshold: 512 }));
app.use(passport.initialize());

app.set('etag', 'weak');

app.set('events', events);
app.set('bookshelf', bookshelf);
app.set('config', config);

require('./controllers/games')(app);
require('./controllers/games.current')(app);
require('./controllers/players')(app);
require('./controllers/groups')(app);
require('./controllers/auth')(app, passport);
require('./controllers/socket')(app, io);


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

server.listen(config.port);
console.log(chalk.green('Web Server: Listening on port ' + config.port));
