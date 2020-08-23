import * as Knex from "knex";
import { TABLES } from "../../src/constants";
import MOVIES_SEED from "../movies.json";

export function seed(knex: Knex): Promise<void> {
  return knex(TABLES.comments).del()
    .then(() => knex(TABLES.movies).del())
    .then(() => knex(TABLES.movies).insert(MOVIES_SEED));
};
