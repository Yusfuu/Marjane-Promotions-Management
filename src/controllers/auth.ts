import { prisma } from "@lib/prisma";
import { Request, Response } from "express";
import { catchAsync } from "@utils/catchAsync";
import { seal } from "@lib/seal";
import { sendEmail } from "@utils/email";
import { error } from "@controllers/error";

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, user } = req.body;

  let currentUser: any = null;

  if (user === 'subadmin') {
    currentUser = await prisma.subadmin.findUnique({ where: { email }, include: { center: true } }).catch(_ => _);
  }

  if (user === 'manager') {
    currentUser = await prisma.manager.findUnique({ where: { email } }).catch(_ => _);
  }

  if (!currentUser) {
    return res.status(401).json({ error: error.email });
  }

  currentUser.role = user;
  currentUser.iat = Date.now();

  const sealData = await seal(currentUser);

  const callback = process.env.AUTH_CALLBACK_URL;

  const url = `${callback}?seal=${sealData}`;
  res.json({ message: 'Check your email to login your account' });
  await sendEmail(process.env.TEMP_EMAIL as string, url);
}
);

export const logout = catchAsync(async (req: Request, res: Response) => {
  await req.session.destroy();
  res.json({
    message: 'logged out'
  })
});