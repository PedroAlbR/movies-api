
import * as MOVIES from './model';

export function getMovieById(req, res) {
  return MOVIES.getById(req.params.id)
    .then((data) => res.json(data.reverse()))
    .catch((error) => res.status(404).json({ message: error.message, status: 404 }));
}

export function getMovies(req, res) {
  const { params } = req;

  return MOVIES.get(params)
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(400).json({ message: error.message, status: 400 })
    );
}
