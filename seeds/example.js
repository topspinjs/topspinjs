'use strict';

exports.seed = function (knex, Promise) {
  return knex
    .insert([
      {name: 'Ma Long'}
    , {name: 'Timo Boll'}
    , {name: 'Zhang Jike'}
    , {name: 'Zhenlong'}
    ]).into('players');
};
