import express from 'express';
import comentsRoute from './comments/route';
import usersRoute from './users/route';
import moviesRoute from './movies/route';

const router = express.Router();

router.use('/movies', moviesRoute);
router.use('/comments', comentsRoute);
router.use('/users', usersRoute);

export default router;
