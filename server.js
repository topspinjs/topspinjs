var environment = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
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

app.set('etag', 'weak');

app.set('events', events);
app.set('bookshelf', bookshelf);
app.set('config', config);

require('./controllers/games')(app);
require('./controllers/games.current')(app);
require('./controllers/players')(app);
require('./controllers/groups')(app);
require('./controllers/socket')(app, io);

app.get('/', function (req, res) {
  res.render('index', { users: [] });
});

server.listen(config.port);
console.log(chalk.green('Web Server: Listening on port ' + config.port));
