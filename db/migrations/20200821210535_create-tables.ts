import * as Knex from "knex";

import { TABLES } from "../../src/constants";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLES.movies, function (t) {
    // - cast [ { name, character } ]
    // - writers [ name ]

    t.increments('id').primary().notNullable();
    t.text('name').notNullable();
    t.timestamp('date', { useTz: true }).defaultTo(knex.fn.now());
    t.text('director').notNullable();
    t.integer('rating').defaultTo(0);
    t.boolean('active').defaultTo(true);
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLES.movies);
}

