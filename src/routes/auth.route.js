import express from 'express';

const router = express.Router();

router.post('/sign-up',(req,res) =>{
  res.send('Post /api/auth/sign-up endpoint');
});

router.post('/sign-in',(req,res) =>{
  res.send('Post /api/auth/sign-in endpoint');
});

router.post('/sign-out',(req,res) =>{
  res.send('Post /api/auth/sign-out endpoint');
});

export default router;