import * as db from '../../db';
import { TABLES } from '../../../constants';

export function getById(id: string) {
  return db.get(TABLES.movies, id);
}

export function get(params: { name: string; offset: number; limit?: number; }) {
  return db.getMovies(TABLES.movies, params);
}

export function create({ name, director }) {
  return db.create(TABLES.movies, { name, director });
}
