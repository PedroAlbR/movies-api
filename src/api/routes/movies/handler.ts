import express from 'express';
import * as MOVIES from './model';
import { validateMovie } from '../../helpers/validation';

export function getMovieById(req: express.Request, res: express.Response) {
  return MOVIES.getById(req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.status(404).json({ message: error.message, status: 404 }));
}

export function getMovies(req: express.Request, res: express.Response) {
  const { query } = req;

  return MOVIES.get(query)
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(400).json({ message: error.message, status: 400 })
    );
}

export function createMovie(req: express.Request, res: express.Response) {
  const validationError = validateMovie(req.body);

  if (validationError) return res.status(422).json({ message: validationError.message, status: 422 });

  return MOVIES.create(req.body)
    .then(data => res.json(data))
    .catch(error => {
      res.status(400).json({ message: error.message, status: 400 });
    });
}

export function editMovie(req: express.Request, res: express.Response) {
  const { id } = req.params;

  return MOVIES.edit(id, req.body)
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(400).json({ message: error.message, status: 400 })
    );
}

export function archiveMovie(req: express.Request, res: express.Response) {
  const { id } = req.params;

  return MOVIES.archive(id)
    .then(() => res.send("Movie toggled"))
    .catch((error) =>
      res.status(400).json({ message: error.message, status: 400 })
    );
}
