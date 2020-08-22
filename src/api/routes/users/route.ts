import express from 'express';
import * as handler from './handler';

const router = express.Router();

router.get('/', handler.getUsers);
router.get('/:id', handler.getUser);
router.put('/:id', handler.editUser);
router.delete('/:id', handler.deleteUser);
router.post('/', handler.createUser);

export default router;
