import * as db from '../../db';
import { TABLES } from '../../../constants';

export function getById(id: string) {
  return db.getBy(TABLES.comments, [
    ['movie', id]
  ]);
}

export function get(id: string) {
  return db.get(TABLES.comments, id);
}

export function create(params: any) {
  return db.create(TABLES.comments, params);
}

export function edit(id: string, params: { text: string; }) {
  return db.put(TABLES.comments, id, params);
}

export function remove(id: string) {
  return db.remove(TABLES.comments, id);
}
