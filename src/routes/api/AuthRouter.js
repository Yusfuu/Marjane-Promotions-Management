import express from "express";
import sendEmail from '../../utils/email';
import { prisma } from "../../../prisma/client";
import { seal } from "../../lib/seal";

const router = express.Router();


const error = {
  email: 'The email you entered doesn\'t belong to an account. Please check your email and try again.',
  password: 'Sorry, your password was incorrect. Please double-check your password.',
  missing: 'Sorry, you are missing some required fields. Please try again.',
}

router.post('/login', async (req, res) => {
  const { email, user } = req.body;

  const _prisma = {
    manager: prisma.manager,
    subadmin: prisma.subadmin,
  }

  const currentUser = await _prisma[user].findUnique({ where: { email } }).catch(_ => _);
  if (!currentUser) {
    return res.status(401).json({ error: error.email });
  }

  currentUser.role = user;
  currentUser.iat = Date.now();

  const sealData = await seal(currentUser);

  const callback = process.env.AUTH_CALLBACK_URL;

  const url = `${callback}?seal=${sealData}`;

  await sendEmail(process.env.TEMP_EMAIL_PREFIX, url, email);

  res.json(currentUser);
});


router.post('/logout', async (req, res) => {
  await req.session.destroy();
  res.json({
    message: 'logged out'
  })
});

export { router };