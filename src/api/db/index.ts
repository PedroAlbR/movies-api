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

let knex;

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

function baseQuery(table) {
  return knex.withSchema(DB_SCHEMA).table(table);
}

export function get(table, key) {
  return getByField(table, 'id', key);
}

export function put(table, key, value, upsert, getId) {
  if (!knex) return Promise.reject(new Error('MySQL is not initialized'));

  const putObj = key ? Object.assign({}, value, { id: key }) : value;
  const insert = baseQuery(table).insert(putObj);
  const update = knex.update(putObj).where({ [`${table}.id`]: putObj.id });
  const query = upsert
    ? knex.raw(`? ON CONFLICT ON CONSTRAINT ${table}_pkey DO ?`, [
      insert,
      update,
    ])
    : insert;

  return getId
    ? query.returning('id').then((ID) => Object.assign(value, { id: ID[0] }))
    : query.then(() => value);
}

export function getByField(table, field, value) {
  if (!knex) return Promise.reject(new Error('MySQL is not initialized'));

  return baseQuery(table)
    .select('*')
    .where(field, value)
    .then(getResponse(value));
}

function getResponse(key) {
  if (!knex) return Promise.reject(new Error('MySQL is not initialized'));

  return (resp) => {
    if (!resp.length)
      return Promise.reject(new Error(`Specified key "${key}" not found.`));

    return resp[0];
  };
}

export function getBy(table, conditions) {
  const query = baseQuery(table).select('*');

  conditions.forEach((condition) => {
    if (condition.length > 1) return query.where(...condition);
    console.log('trace', 'Need at least two elements', { where: condition });
  });

  return query;
}

export function getMovies(table, { name, offset, limit = 10 }) {
  let result = knex(table).select('*');

  if (name) {
    result = result.whereRaw(`LOWER (name) LIKE LOWER (%${name}%)`);
  }

  if (offset) {
    result = result.offset(offset);
  }

  return result.limit(limit)
    .timeout(1000, { cancel: true });
}