import express from 'express';
import comentsRoute from './comments/route';
import moviesRoute from './movies/route';

const router = express.Router();

router.use('/movies', moviesRoute);
router.use('/comments', comentsRoute);

export default router;
