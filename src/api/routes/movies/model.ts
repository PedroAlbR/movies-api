import { ParsedQs } from "qs";
import * as db from '../../db';
import { TABLES } from '../../../constants';

export function getById(id: string) {
  return db.get(TABLES.movies, id);
}

export function get(params: ParsedQs) {
  return db.getMovies(TABLES.movies, params);
}

export function create(params: object) {
  return db.create(TABLES.movies, params);
}

export function edit(id: string, params: object) {
  return db.put(TABLES.movies, id, params);
}

export function archive(id: string) {
  return db.archiveMovie(TABLES.movies, id);
}
