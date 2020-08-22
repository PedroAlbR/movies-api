import * as db from '../../db';
import { TABLES } from '../../../constants';

export function getAll() {
  return db.getBy(TABLES.users, []);
}

export function get(id) {
  return db.getByField(TABLES.users, 'username', id);
}

export function create(params) {
  return db.create(TABLES.users, params);
}

export function edit(id, params) {
  return db.put(TABLES.users, id, params);
}

export function remove(id) {
  return db.remove(TABLES.users, id);
}
