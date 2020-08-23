
import * as COMMENTS from './model';

export function getComments(req, res) {
  return COMMENTS.getById(req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.status(404).json({ message: error.message, status: 404 }));
}

export function getComment(req, res) {
  const { id } = req.params;

  return COMMENTS.get(id)
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(400).json({ message: error.message, status: 400 })
    );
}

export function createComment(req, res) {
  return COMMENTS.create(req.body)
    .then(data => res.json(data))
    .catch(error => {
      res.status(400).json({ message: error.message, status: 400 });
    });
}

export function editComment(req, res) {
  const { id } = req.params,
    { text } = req.body;

  return COMMENTS.edit(id, { text })
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(400).json({ message: error.message, status: 400 })
    );
}

export function deleteComment(req, res) {
  const { id } = req.params;

  return COMMENTS.remove(id)
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(400).json({ message: error.message, status: 400 })
    );
}
