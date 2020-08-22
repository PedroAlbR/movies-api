import * as db from '../../db';
import { TABLES } from '../../../constants';

export function getById(id: string) {
  return db.get(TABLES.movies, id);
}

export function get(params: { q: string | string[], offset: number; limit?: number; }) {
  return db.getMovies(TABLES.movies, params);
}

export function create(params) {
  return db.create(TABLES.movies, params);
}

export function edit(id, params) {
  return db.put(TABLES.movies, id, params);
}

export function archive(id) {
  return db.archiveMovie(TABLES.movies, id);
}
