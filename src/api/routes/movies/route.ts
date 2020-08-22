import express from 'express';
import * as handler from './handler';
import * as commentsHandler from '../comments/handler';

const router = express.Router();

router.get('/:id', handler.getMovieById);
router.put('/:id', handler.editMovie);
router.delete('/:id', (req, res) => res.send(req.url));

router.get('/:id/comments', commentsHandler.getComments);

router.get('/', handler.getMovies);
router.post('/', handler.createMovie);

export default router;
