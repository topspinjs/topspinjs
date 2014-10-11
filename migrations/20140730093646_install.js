"use strict";

exports.up = function (knex, Promise) {

  return knex.schema

    .createTable('players', function (table) {
      table.increments('id').primary();
      table.string('login');
      table.string('password');
      table.string('rfid');
      table.string('name');
      table.enu('gender', ['male', 'female']);
      table.string('avatar');
      table.string('image');
      table.string('image_win');
      table.string('image_lost');
      table.integer('play_count').defaultTo(0);
      table.timestamps();
    })

    .createTable('games', function (table) {
      table.increments('id').primary();
      table.enu('type', ['singles', 'doubles', 'triples']);
      table.enu('status', ['scheduled', 'playing', 'played']);
      table.dateTime('start');
      table.dateTime('end');
      table.integer('score_left').defaultTo(0);
      table.integer('score_right').defaultTo(0);
      table.timestamps();
    })

    .createTable('groups', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.timestamps();
    })

    .createTable('games_players', function (table) {
      table.increments('id').primary();
      table.integer('game_id').unsigned(); //.references('games.id');
      table.integer('player_id').unsigned(); //.references('players.id');
      table.boolean('left');
      table.boolean('winner');
    })

    .createTable('games_groups', function (table) {
      table.increments('id').primary();
      table.integer('game_id').unsigned().references('games.id');
      table.integer('group_id').unsigned().references('groups.id');
      table.boolean('left');
      table.boolean('winner');
    })

    .createTable('groups_players', function (table) {
      table.increments('id').primary();
      table.integer('player_id').unsigned().references('players.id');
      table.integer('group_id').unsigned().references('groups.id');
    });

};

exports.down = function (knex, Promise) {
  return knex.schema
  .dropTable('games')
  .dropTable('players')
  .dropTable('groups')
  .dropTable('groups_players')
  .dropTable('games_players')
  .dropTable('games_groups');
};
