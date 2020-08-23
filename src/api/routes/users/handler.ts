import express from 'express';
import * as USERS from './model';
import { encodePassword } from '../../helpers';
import { validateUser } from '../../helpers/validation';

export function getUsers(req: express.Request, res: express.Response) {
  return USERS.getAll()
    .then((data) => res.json(data.map(u => {
      delete u.password;
      return u;
    })))
    .catch((error) => res.status(404).json({ message: error.message, status: 404 }));
}

export function getUser(req: express.Request, res: express.Response) {
  const { id } = req.params;

  return USERS.get(id.toLowerCase())
    .then((data) => {
      delete data.password;
      res.json(data);
    })
    .catch((error) =>
      res.status(400).json({ message: error.message, status: 400 })
    );
}

export function createUser(req: express.Request, res: express.Response) {
  const user = req.body;
  const validationError = validateUser(req.body);

  if (validationError) return res.status(422).json({ message: validationError.message, status: 422 });

  user.password = encodePassword(user.password);

  return USERS.create(user)
    .then(data => res.json(data))
    .catch(error => {
      res.status(400).json({ message: error.message, status: 400 });
    });
}

export function editUser(req: express.Request, res: express.Response) {
  const { id } = req.params;
  const { password } = req.body;

  return USERS.edit(id, { password })
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(400).json({ message: error.message, status: 400 })
    );
}

export function deleteUser(req: express.Request, res: express.Response) {
  const { id } = req.params;

  return USERS.remove(id)
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(400).json({ message: error.message, status: 400 })
    );
}
