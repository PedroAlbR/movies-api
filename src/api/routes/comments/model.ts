import * as db from '../../db';
import { TABLES } from '../../../constants';

export function getById(id: string) {
  return db.getBy(TABLES.comments, [
    ['movie', id]
  ]);
}

export function get(id) {
  return db.get(TABLES.comments, id);
}

export function create(params) {
  return db.create(TABLES.comments, params);
}

export function edit(id, params) {
  return db.put(TABLES.comments, id, params);
}

export function remove(id) {
  return db.remove(TABLES.comments, id);
}
