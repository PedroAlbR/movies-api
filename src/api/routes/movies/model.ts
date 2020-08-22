import * as db from '../../db';
import { TABLES } from '../../../constants';

export function getById(id: string) {
  return db.get(TABLES.movies, id);
}

export function get(params: { name: string; offset: string; limit?: number; }) {
  return db.getMovies(TABLES.movies, params);
}
