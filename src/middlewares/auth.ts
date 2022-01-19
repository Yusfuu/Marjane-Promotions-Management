import { NextFunction, Request, Response } from "express";


export const isAuthenticated = (entity: any = null) => (req: Request, res: Response, next: NextFunction) => {

  //@ts-ignore
  const user = req.session.user!;
  if (!entity) {
    if (user && req.path === '/account/login') {
      return res.redirect(`/${user.role}/dashboard`);
    } else {
      return next();
    }
  }

  if (!user) {
    return res.redirect(`/`);
  }

  if (user?.role !== entity) {
    return res.render('pages/_403');
  }

  next();
}