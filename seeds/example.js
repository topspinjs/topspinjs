'use strict';

var crypto = require('crypto');

exports.seed = function (knex, Promise) {
  var now = new Date();

  function password(phrase) {
    return crypto.createHash('sha1').update(phrase).digest('hex');
  }

  return Promise.join(

    // PLAYERS
    knex.insert([
      {
        id: 1
      , name: 'Ma Long'
      , login: 'malong'
      , password: password('malong')
      , gender: 'male'
      , avatar: 'https://graph.facebook.com/malong.fans/picture?width=300&height=300'
      , played_games: 21874
      , created_at: now
      , updated_at: now
      }
    , {
        id: 2
      , name: 'Timo Boll'
      , login: 'timo'
      , password: password('timo')
      , gender: 'male'
      , avatar: 'https://graph.facebook.com/timoboll/picture?width=300&height=300'
      , played_games: 19383
      , created_at: now
      , updated_at: now
      }
    , {
        id: 3
      , name: 'Xu Xin'
      , login: 'xuxin'
      , password: password('xuxing')
      , gender: 'male'
      , avatar: 'https://graph.facebook.com/xuxin.fans/picture?width=300&height=300'
      , played_games: 13383
      , created_at: now
      , updated_at: now
      }
    , {
        id: 4
      , name: 'Dimitrij Ovtcharov'
      , login: 'dimitrij'
      , password: password('dimitrij')
      , gender: 'male'
      , avatar: 'https://graph.facebook.com/DimitrijOvtcharov/picture?width=300&height=300'
      , played_games: 17365
      , created_at: now
      , updated_at: now
      }
    ]).into('players'),

    // GAMES
    knex.insert([
      {
        id: 1
      , type: 'singles'
      , status: 'played'
      , start: (+now + 20)
      , end: (+now + 120)
      , score_left: 9
      , score_right: 11
      , created_at: (+now + 20)
      , updated_at: (+now + 120)
      }
    , {
        id: 2
      , type: 'groups'
      , status: 'played'
      , start: (+now + 150)
      , end: (+now + 250)
      , score_left: 21
      , score_right: 13
      , created_at: (+now + 150)
      , updated_at: (+now + 250)
      }
    , {
        id: 3
      , type: 'singles'
      , status: 'playing'
      , start: (+now + 295)
      , score_left: 9
      , score_right: 7
      , created_at: (+now + 275)
      , updated_at: (+now + 400)
      }
    , {
        id: 4
      , type: 'singles'
      , status: 'scheduled'
      , score_left: 0
      , score_right: 0
      , created_at: (+now + 220)
      , updated_at: (+now + 220)
      }
    , {
        id: 5
      , type: 'doubles'
      , status: 'scheduled'
      , score_left: 0
      , score_right: 0
      , created_at: (+now + 250)
      , updated_at: (+now + 250)
      }
    ]).into('games'),

    // GAME PLAYERS
    knex.insert([
      {
        game_id: 1
      , player_id: 1
      , left: true
      , winner: false
      }
    , {
        game_id: 1
      , player_id: 2
      , left: false
      , winner: true
      }
    , {
        game_id: 3
      , player_id: 3
      , left: true
      }
    , {
        game_id: 3
      , player_id: 4
      , left: false
      }
    , {
        game_id: 4
      , player_id: 2
      , left: true
      }
    , {
        game_id: 4
      , player_id: 4
      , left: false
      }
    ]).into('games_players'),

    // GROUPS
    knex.insert([
      {
        id: 1
      , name: 'Asia'
      , created_at: now
      , updated_at: now
      }
    , {
        id: 2
      , name: 'Europe'
      , created_at: now
      , updated_at: now
      }
    ]).into('groups'),

    // GROUP PLAYERS
    knex.insert([
      {
        group_id: 1
      , player_id: 1
      }
    , {
        group_id: 1
      , player_id: 3
      }
    , {
        group_id: 2
      , player_id: 2
      }
    , {
        group_id: 2
      , player_id: 4
      }
    ]).into('groups_players'),

    // GAME PLAYERS
    knex.insert([
      {
        game_id: 2
      , group_id: 1
      , left: true
      , winner: true
      }
    , {
        game_id: 2
      , group_id: 2
      , left: false
      , winner: false
      }
    , {
        game_id: 5
      , group_id: 1
      , left: true
      }
    , {
        game_id: 5
      , group_id: 2
      , left: false
      }
    ]).into('games_groups')
  );
};
