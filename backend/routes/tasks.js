import express from 'express';
const router = express.Router();

router.get('/tests', async (req, res) => {
  res.send('HELLOooooo');
});

export default router;
