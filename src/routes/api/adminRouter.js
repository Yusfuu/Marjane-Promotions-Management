import express from "express";
import sendEmail from '../../utils/email';
import { prisma } from "../../../prisma/client";
import { seal } from "../../lib/seal";
import { isAuthenticated } from "../../middleware";

const router = express.Router();

const error = {
  email: 'The email you entered doesn\'t belong to an account. Please check your email and try again.',
  password: 'Sorry, your password was incorrect. Please double-check your password.',
  missing: 'Sorry, you are missing some required fields. Please try again.',
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.admin.findUnique({ where: { email } }).catch(_ => _);

  if (!user) {
    return res.status(401).json({ error: error.email });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: error.password });
  }

  req.session.user = { id: user.id, role: 'admin' };
  await req.session.save();
  res.json({ ok: true });
});

router.use(isAuthenticated('admin'));

router.post('/create', async (req, res) => {

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

  if (subadmin?.code === "P2003") {
    return res.status(400).json({ error: 'Center does not exist' });
  }

  if (subadmin?.code === "P2002") {
    return res.status(400).json({ error: 'Center already has a subadmin' });
  }

  subadmin.role = 'subadmin';

  const sealData = await seal(subadmin);

  const callback = process.env.AUTH_CALLBACK_URL;

  const url = `${callback}?seal=${sealData}`;

  await sendEmail(process.env.TEMP_EMAIL_PREFIX, url, email);
  return res.json({ message: 'Subadmin created successfully' });
}
);


router.post('/subadmin/delete', async (req, res) => {
  const { subadminId } = req.body;

  const deleted = await prisma.subadmin.delete({ where: { id: subadminId } }).catch(_ => _);

  res.json({
    data: deleted,
    message: 'Subadmin deleted successfully',
  });

});



export { router }