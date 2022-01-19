
import { Request, Response } from "express";
import { prisma } from "@lib/prisma";
import { catchAsync } from "@utils/catchAsync";
import { sendEmail } from "@utils/email";
import { seal } from "@lib/seal";


const error = {
  email: 'The email you entered doesn\'t belong to an account. Please check your email and try again.',
  password: 'Sorry, your password was incorrect. Please double-check your password.',
  missing: 'Sorry, you are missing some required fields. Please try again.',
}

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.admin.findUnique({ where: { email } }).catch(_ => _);

  if (!user) {
    return res.status(401).json({ error: error.email });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: error.password });
  }

  //@ts-ignore
  req.session.user = { id: user.id, role: 'admin' };
  await req.session.save();
  res.json({ ok: true });
});

export const createSubadmin = catchAsync(async (req: Request, res: Response) => {

  const { email, name, centerId } = req.body;

  const subadmin = await prisma.subadmin.create({
    data: {
      email, name,
      center: { connect: { id: centerId } },
    },
    include: {
      center: true
    }
  }).catch(_ => _);

  console.log(subadmin);


  const code = subadmin?.code || null;

  if (code === "P2003" || code === "P2018") {
    return res.status(400).json({ error: 'Center does not exist' });
  }

  if (code === "P2002") {
    return res.status(400).json({ error: 'subadmin already exists' });
  }

  subadmin.role = 'subadmin';

  const sealData = await seal(subadmin);

  const callback = process.env.AUTH_CALLBACK_URL;

  const url = `${callback}?seal=${sealData}`;

  res.json({ message: 'Subadmin created successfully' });
  return await sendEmail(process.env.TEMP_EMAIL as string, url);
});


export const deleteSubadmin = catchAsync(async (req: Request, res: Response) => {
  const { subadminId } = req.body;

  const deleted = await prisma.subadmin.delete({ where: { id: subadminId } }).catch(_ => _);

  res.json({
    data: deleted,
    message: 'Subadmin deleted successfully',
  });
});
