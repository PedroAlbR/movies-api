import { ParsedQs } from "qs";
import knexLib from 'knex';
import logger from "clay-log";
import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_SCHEMA,
} from '../../constants';

let knex: knexLib;

const log = logger.init({ name: __filename });

export function connect() {
  log('info', `Connecting to MySQL at ${DB_HOST}:${DB_PORT}`);

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
  const update = baseQuery(table).update(putObj).where({ [`${table}.id`]: putObj.id });

  return update.then(() => value);
}

export function create(table: string, value: object) {
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

export function getBy(table: string, conditions: string[][]) {
  const query = baseQuery(table).select('*');

  conditions.forEach((condition: string[]) => {
    const [first, second, third] = condition;

    if (condition.length > 1) {
      return third ? query.where(first, second, third) : query.where(first, second);
    }

    log('debug', 'Need at least two elements', { where: condition });
  });

  return query;
}

export function getMovies(table: string, { q, offset, limit = 10 }: any) {
  const result = baseQuery(table).select('*').whereNot({ active: 0 });

  if (q) {
    if (!Array.isArray(q)) q = [q];

    q.forEach((v: string) => {
      const [key, value] = v.split(':');

      if (!key || !value) return;
      result.whereRaw(`LOWER (${key}) like LOWER ('%${value}%')`);
    });
  }

  if (offset) {
    result.offset(offset);
  }

  return result.limit(limit)
    .timeout(1000, { cancel: true });
}

export function remove(table: string, id: string) {
  return baseQuery(table).where({ id }).del();
}

export function archiveMovie(table: string, id: string) {
  return baseQuery(table)
    .update({ active: knex.raw('NOT ??', ['active']) })
    .where({ [`${table}.id`]: id });
}
