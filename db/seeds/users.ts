import * as Knex from "knex";
import { TABLES } from "../../src/constants";

export function seed(knex: Knex): Promise<void> {
  return knex(TABLES.users).del().then(() => {
    return knex(TABLES.users).insert([
      { id: "root", password: "1598138875774$10$d51feb177943abf5bdd4d98fc47fc333" }, // pw: root
      { id: "admin", password: "1598138897545$10$e39c84d8e9b7fd53ebe4f9117f088efc" }, // pw: admin
    ]);
  });
};
