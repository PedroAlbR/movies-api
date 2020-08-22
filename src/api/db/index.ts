'use strict';

import knexLib from 'knex';
import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_SCHEMA,
} from '../../constants';

let knex: knexLib;

export function connect() {
  console.log(`Connecting to MySQL at ${DB_HOST}:${DB_PORT}`);

  knex = knexLib({
    client: 'mysql',
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: Number(DB_PORT)
    },
  });

  return knex
    .table('information_schema.tables')
    .first();
}

function baseQuery(table: string) {
  return knex.withSchema(DB_SCHEMA).table(table);
}

export function get(table: string, key: string) {
  return getByField(table, 'id', key);
}

export function put(table: string, key: string, value: any) {
  if (!knex) return Promise.reject(new Error('MySQL is not initialized'));

  const putObj = key ? Object.assign({}, value, { id: key }) : value;
  const update = knex.update(putObj).where({ [`${table}.id`]: putObj.id });

  return update.then(() => value);
}

export function create(table: string, value: any) {
  const insert = baseQuery(table).insert(value);

  return insert.then(() => value);
}

export function getByField(table: string, field: string, value: any) {
  if (!knex) return Promise.reject(new Error('MySQL is not initialized'));

  return baseQuery(table)
    .select('*')
    .where(field, value)
    .then(getResponse(value));
}

function getResponse(key: string) {
  return (resp: any[]) => {
    if (!knex) return Promise.reject(new Error('MySQL is not initialized'));
    if (!resp.length)
      return Promise.reject(new Error(`Specified key "${key}" not found.`));

    return resp[0];
  };
}

export function getBy(table: string, conditions: any[][]) {
  const query = baseQuery(table).select('*');

  conditions.forEach((condition: any[]) => {
    const [first, second, third] = condition;

    if (condition.length > 1) {
      return third ? query.where(first, second, third) : query.where(first, second);
    }

    console.log('trace', 'Need at least two elements', { where: condition });
  });

  return query;
}

export function getMovies(table: string, { name, offset, limit = 10 }: { name: string; offset: number; limit?: number; }) {
  let result = knex(table).select('*');

  if (name) {
    result = result.whereRaw(`LOWER (name) LIKE LOWER ('%${name}%')`);
  }

  if (offset) {
    result = result.offset(offset);
  }

  return result.limit(limit)
    .timeout(1000, { cancel: true });
}