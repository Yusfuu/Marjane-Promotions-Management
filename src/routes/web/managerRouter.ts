import express, { Request, Response } from "express";
import { prisma, } from "@lib/prisma";
import { isAuthenticated } from "@middlewares/index";
import { Promotion } from "@prisma/client";

const router = express.Router();

router.use(isAuthenticated('manager'));

router.get('/dashboard', (req: Request, res: Response) => {

  const cards = [
    {
      title: 'Promotions',
      description: 'Passwordless login that’s delightful, blazing-fast, and fully customizable',
      color: 'bg-purple-500',
      url: '/manager/dashboard/promotion'
    }
  ];

  res.render('pages/manager/dashboard', { cards });
});



router.get('/dashboard/promotion', async (req: Request, res: Response) => {
  //@ts-ignore
  const { categoryId, centerId } = req.session?.user;
  const confirmation = req?.query?.confirmation || false as any;

  const promotions: Promotion = await prisma.promotion.findMany({
    where: {
      product: { categoryId: { equals: categoryId } },
      subadminId: { equals: centerId },
      confirmation: confirmation
    },
    include: {
      product: true
    }
  }).catch(_ => _);
  res.render('pages/manager/promotion', { promotions });
});




export { router };