import express from 'express';
import * as handler from './handler';

const router = express.Router();

router.get('/:id/comments', (req, res) => res.send(req.url));
router.post('/:id/comments', (req, res) => res.send(req.url));
router.get('/:id/comments/:id', (req, res) => res.send(req.url));
router.delete('/:id/comments:id', (req, res) => res.send(req.url));
// router.put('/:id/comments/:id', (req, res) => res.send(req.url));

router.post('/:id/rating', (req, res) => res.send(req.url));

router.get('/:id', handler.getMovieById); // Get single movie
router.put('/:id', handler.editMovie); // Edit single movie
router.delete('/:id', (req, res) => res.send(req.url)); // Delete single movie

router.get('/', handler.getMovies); // Get all movies
router.post('/', handler.createMovie); // Create movie

export default router;
