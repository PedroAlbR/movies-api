import express from 'express';
import * as handler from './handler';

const router = express.Router();

router.get('/:id', handler.getComment);
router.put('/:id', handler.editComment);
router.delete('/:id', handler.deleteComment);
router.post('/', handler.createComment);

export default router;
