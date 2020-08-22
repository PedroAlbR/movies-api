import express from 'express';
import moviesRoute from './movies/route';

const router = express.Router();

router.use('/movies', moviesRoute);

export default router;
