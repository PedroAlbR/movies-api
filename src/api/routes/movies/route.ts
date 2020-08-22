import express from 'express';

const router = express.Router();

router.get('/:id/comments', (req, res) => res.send(req.url));
router.post('/:id/comments', (req, res) => res.send(req.url));
router.get('/:id/comments/:id', (req, res) => res.send(req.url));
router.delete('/:id/comments:id', (req, res) => res.send(req.url));
// router.put('/:id/comments/:id', (req, res) => res.send(req.url));

router.post('/:id/rating', (req, res) => res.send(req.url));
router.get('/:id', (req, res) => res.send(req.url));
router.put('/:id', (req, res) => res.send(req.url));
router.delete('/:id', (req, res) => res.send(req.url));

router.get('/', (req, res) => res.send(req.url));
router.post('/', (req, res) => res.send(req.url));

export default router;
