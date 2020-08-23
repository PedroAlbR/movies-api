import express from 'express';
import * as COMMENTS from './model';
import { validateCreateComment, validateEditComment } from '../../helpers/validation';

export function getComments(req: express.Request, res: express.Response) {
  return COMMENTS.getById(req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.status(404).json({ message: error.message, status: 404 }));
}

export function getComment(req: express.Request, res: express.Response) {
  const { id } = req.params;

  return COMMENTS.get(id)
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(400).json({ message: error.message, status: 400 })
    );
}

export function createComment(req: express.Request, res: express.Response) {
  const validationError = validateCreateComment(req.body);

  if (validationError) return res.status(422).json({ message: validationError.message, status: 422 });

  return COMMENTS.create(req.body)
    .then(data => res.json(data))
    .catch(error => {
      res.status(400).json({ message: error.message, status: 400 });
    });
}

export function editComment(req: express.Request, res: express.Response) {
  const { id } = req.params;
  const validationError = validateEditComment(req.body);

  if (validationError) return res.status(422).json({ message: validationError.message, status: 422 });

  return COMMENTS.edit(id, req.body)
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(400).json({ message: error.message, status: 400 })
    );
}

export function deleteComment(req: express.Request, res: express.Response) {
  const { id } = req.params;

  return COMMENTS.remove(id)
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(400).json({ message: error.message, status: 400 })
    );
}
