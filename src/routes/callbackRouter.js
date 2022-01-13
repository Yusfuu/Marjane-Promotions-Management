import express from "express";
import { prisma } from "../../prisma/client";
import { seal, unseal } from "../lib/seal";

const router = express.Router();


router.get('/', async (req, res) => {
  if (!req.query) res.json({ ok: false });

  const seal = await unseal(req.query.seal);

  req.session.user = { ...seal };
  await req.session.save();

  if (seal.role === 'subadmin') {
    return res.redirect('/subadmin/dashboard');
  }
  if (seal.role === 'manager') {
    return res.redirect('/manager/dashboard');
  }

  res.json(seal);
  // res.render('pages/subadmin/index')
});

export { router };
