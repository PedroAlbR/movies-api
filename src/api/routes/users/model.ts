import * as db from '../../db';
import { TABLES } from '../../../constants';

export function getAll() {
  return db.getBy(TABLES.users, []);
}

export function get(id: string) {
  return db.getByField(TABLES.users, 'username', id);
}

export function create(params: object) {
  return db.create(TABLES.users, params);
}

export function edit(id: string, params: any) {
  return db.put(TABLES.users, id, params);
}

export function remove(id: string) {
  return db.remove(TABLES.users, id);
}
