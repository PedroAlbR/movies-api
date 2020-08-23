import * as Knex from "knex";
import { TABLES } from "../../src/constants";

export function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable(TABLES.movies).then(exists => {
    if (exists) return;

    return knex.schema.createTable(TABLES.movies, function (t) {
      t.increments('id').primary().notNullable();
      t.text('title').notNullable();
      t.text('director').notNullable();
      t.text('studio').notNullable();
      t.text('genre').notNullable();
      t.integer('year').notNullable();
      t.boolean('active').defaultTo(true);
    });
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

export function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLES.comments)
    .then(() => knex.schema.dropTableIfExists(TABLES.movies))
    .then(() => knex.schema.dropTableIfExists(TABLES.users));
}

