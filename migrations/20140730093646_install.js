"use strict";

exports.up = function (knex, Promise) {

  return knex.schema

    .createTable('players', function (table) {
      table.increments('id').primary();
      table.string('rfid');
      table.string('name');
      table.enu('gender', ['male', 'female']);
      table.string('uri');
      table.integer('elo').defaultTo(0);
      table.string('image');
      table.integer('play_count').defaultTo(0);
      table.timestamps();
    })

    .createTable('games', function (table) {
      table.increments('id').primary();
      table.enu('type', ['singles', 'doubles', 'triples']);
      table.dateTime('start');
      table.dateTime('end');
      table.integer('score0');
      table.integer('score1');
    })

    .createTable('groups', function (table) {
      table.increments('id').primary();
      table.string('name');
    })

    .createTable('groups_players', function (table) {
      table.increments('id').primary();
      table.integer('player_id').unsigned().references('players.id');
      table.integer('group_id').unsigned().references('groups.id');
    })

    .createTable('games_players', function (table) {
      table.increments('id').primary();
      table.integer('player_id').unsigned().references('players.id');
      table.boolean('left');
      table.boolean('winner');
    })

    .createTable('games_groups', function (table) {
      table.increments('id').primary();
      table.integer('group_id').unsigned().references('groups.id');
      table.boolean('left');
      table.boolean('winner');
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
