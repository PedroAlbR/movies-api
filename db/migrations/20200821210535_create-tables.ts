import * as Knex from "knex";

import { TABLES } from "../../src/constants";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable(TABLES.movies).then(exists => {
    if (exists) return;

    return knex.schema.createTable(TABLES.movies, function (t) {
      // - cast [ { name, character } ]
      // - writers [ name ]

      t.increments('id').primary().notNullable();
      t.text('name').notNullable();
      t.timestamp('date', { useTz: true }).defaultTo(knex.fn.now());
      t.text('director').notNullable();
      t.boolean('active').defaultTo(true);
    })
  }).then(() => {
    return knex.schema.hasTable(TABLES.users).then(exists => {
      if (exists) return;

      return knex.schema.createTable(TABLES.users, function (t) {
        t.string('username', 10).primary().notNullable();
        t.text('password').notNullable();
      });
    });
  }).then(() => {
    return knex.schema.hasTable(TABLES.comments).then(exists => {
      if (exists) return;

      return knex.schema.createTable(TABLES.comments, function (t) {
        t.increments('id').primary().notNullable();
        t.string('user', 10).notNullable().references('username').inTable(TABLES.users);
        t.integer('movie').unsigned().notNullable().references('id').inTable(TABLES.movies);
        t.text('text').notNullable();
      });
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLES.movies)
    .then(() => knex.schema.dropTableIfExists(TABLES.comments))
    .then(() => knex.schema.dropTableIfExists(TABLES.users))
}

