
import { Request, Response } from "express";
import { prisma } from "@lib/prisma";
import { catchAsync } from "@utils/catchAsync";
import { sendEmail } from "@utils/email";
import { seal } from "@lib/seal";
import { error } from "@errors/index";


// admin login
export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.admin.findUnique({ where: { email } }).catch(_ => _);

  // if user not found
  if (!user) {
    return res.status(401).json({ error: error.email });
  }

  // if password is wrong
  if (user.password !== password) {
    return res.status(401).json({ error: error.password });
  }

  // store user in session
  //@ts-ignore
  req.session.user = { id: user.id, role: 'admin' };
  await req.session.save();
  res.json({ ok: true });
});

// create new subadmin
export const createSubadmin = catchAsync(async (req: Request, res: Response) => {

  const { email, name, centerId } = req.body;

  // create new subadmin or return error
  const subadmin = await prisma.subadmin.create({
    data: {
      email, name,
      center: { connect: { id: centerId } },
    },
    include: {
      center: true
    }
  }).catch(_ => _);


  const code = subadmin?.code || null;

  // if the center is not found
  if (code === "P2003" || code === "P2018") {
    return res.status(400).json({ error: 'Center does not exist' });
  }

  // if subadmin is already exist
  if (code === "P2002") {
    return res.status(400).json({ error: 'subadmin already exists' });
  }

  // add role to subadmin
  subadmin.role = 'subadmin';

  const sealData = await seal(subadmin);

  const callback = process.env.AUTH_CALLBACK_URL;

  // create passwordless login link
  const url = `${callback}?seal=${sealData}`;

  res.json({ message: 'Subadmin created successfully' });

  // send passwordless login email
  return await sendEmail(process.env.TEMP_EMAIL as string, url);
});

// delete subadmin
export const deleteSubadmin = catchAsync(async (req: Request, res: Response) => {
  const { subadminId } = req.body;

  // delete subadmin or return error
  const deleted = await prisma.subadmin.delete({ where: { id: subadminId } }).catch(_ => _);

  res.json({
    data: deleted,
    message: 'Subadmin deleted successfully',
  });
});
