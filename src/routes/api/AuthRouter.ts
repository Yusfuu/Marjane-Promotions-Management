import express, { Request, Response } from "express";
import { sendEmail } from '@utils/email';
import { prisma } from "@lib/prisma";
import { seal } from "@lib/seal";
const router = express.Router();


const error = {
  email: 'The email you entered doesn\'t belong to an account. Please check your email and try again.',
  password: 'Sorry, your password was incorrect. Please double-check your password.',
  missing: 'Sorry, you are missing some required fields. Please try again.',
}

router.post('/login', async (req: Request, res: Response) => {
  const { email, user } = req.body;

  const _prisma: any = {
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

  await sendEmail(process.env.TEMP_EMAIL as string, url);

  res.json({ message: 'Check your email to login your account' });
});


router.post('/logout', async (req: Request, res: Response) => {
  await req.session.destroy();
  res.json({
    message: 'logged out'
  })
});

export { router };