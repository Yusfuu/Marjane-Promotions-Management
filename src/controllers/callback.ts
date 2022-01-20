import { unseal } from "@lib/seal";
import { catchAsync } from "@utils/catchAsync";
import { Request, Response } from "express";

// callback router for passworddless login
export const callback = catchAsync(async (req: Request, res: Response) => {
  if (!req.query) res.json({ ok: false });

  const seal = await unseal(req.query.seal);

  //@ts-ignore
  req.session.user = { ...seal };
  await req.session.save();

  if (seal.role === 'subadmin') {
    return res.redirect('/subadmin/dashboard');
  }
  if (seal.role === 'manager') {
    return res.redirect('/manager/dashboard');
  }

  res.json(seal);
});