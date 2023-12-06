import express from 'express';
const router = express.Router();

router.get('/testing', async (req, res) => {
  res.send('HELLO');
});

export default router;
