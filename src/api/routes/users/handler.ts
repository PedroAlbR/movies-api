
import * as USERS from './model';
import { encodePassword } from '../../helpers';

export function getUsers(req, res) {
  return USERS.getAll()
    .then((data) => res.json(data.map(u => {
      delete u.password
      return u;
    })))
    .catch((error) => res.status(404).json({ message: error.message, status: 404 }));
}

export function getUser(req, res) {
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

export function createUser(req, res) {
  const user = req.body;

  user.password = encodePassword(user.password);

  return USERS.create(req.body)
    .then(data => res.json(data))
    .catch(error => {
      res.status(400).json({ message: error.message, status: 400 })
    })
}

export function editUser(req, res) {
  const { id } = req.params,
    { password } = req.body;

  return USERS.edit(id, { password })
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(400).json({ message: error.message, status: 400 })
    );
}

export function deleteUser(req, res) {
  const { id } = req.params;

  return USERS.remove(id)
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(400).json({ message: error.message, status: 400 })
    );
}
