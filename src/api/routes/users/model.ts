import * as db from '../../db';
import { User } from '../../../../types';
import { TABLES } from '../../../constants';

export function getAll() {
  return db.getBy(TABLES.users, []);
}

export function get(id: string) {
  return db.get(TABLES.users, id);
}

export function create(params: User) {
  return db.create(TABLES.users, params);
}

export function edit(id: string, params: User) {
  return db.put(TABLES.users, id, params);
}

export function remove(id: string) {
  return db.remove(TABLES.users, id);
}
