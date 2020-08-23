
import * as MOVIES from './model';

export function getMovieById(req, res) {
  return MOVIES.getById(req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.status(404).json({ message: error.message, status: 404 }));
}

export function getMovies(req, res) {
  const { query } = req;

  return MOVIES.get(query)
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(400).json({ message: error.message, status: 400 })
    );
}

export function createMovie(req, res) {
  return MOVIES.create(req.body)
    .then(data => res.json(data))
    .catch(error => {
      res.status(400).json({ message: error.message, status: 400 })
    })
}

export function editMovie(req, res) {
  const { id } = req.params;

  return MOVIES.edit(id, req.body)
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(400).json({ message: error.message, status: 400 })
    );
}

export function archiveMovie(req, res) {
  const { id } = req.params;

  return MOVIES.archive(id)
    .then(() => res.send("Movie toggled"))
    .catch((error) =>
      res.status(400).json({ message: error.message, status: 400 })
    );
}
