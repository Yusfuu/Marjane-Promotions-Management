import express, { Request, Response } from "express";
import { isAuthenticated } from "@middlewares/index";
import { prisma } from "@lib/prisma";

const router = express.Router();

router.use(isAuthenticated('subadmin'));
router.get('/dashboard', (req: Request, res: Response) => {

  const cards = [
    {
      title: 'Manager',
      description: 'Passwordless login that’s delightful, blazing-fast, and fully customizable',
      color: 'bg-purple-500',
      url: '/subadmin/dashboard/manger'
    },
    {
      title: 'Promotions',
      description: 'Passwordless login that’s delightful, blazing-fast, and fully customizable',
      color: 'bg-blue-400',
      url: '/subadmin/dashboard/promotion'
    },
    {
      title: 'Category',
      description: 'Passwordless login that’s delightful, blazing-fast, and fully customizable',
      color: 'bg-green-400',
      url: '/subadmin/dashboard/category'
    }
  ];

  res.render('pages/subadmin/dashboard', { cards });
});

router.get('/dashboard/manger', async (req: Request, res: Response) => {
  // @ts-ignore
  const { id } = req.session.user;
  const managers = await prisma.manager.findMany({
    where: { subadminId: id }
  });
  const categories = await prisma.category.findMany({
    select: { id: true, name: true }
  });

  res.render('pages/subadmin/manager', { managers, categories });
});

router.get('/dashboard/category', async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          products: true
        }
      }
    }
  });
  res.render('pages/subadmin/category', { categories });
});

router.get('/dashboard/promotion', async (req: Request, res: Response) => {
  //@ts-ignore
  const { id } = req.session.user;
  const promotions = await prisma.promotion.findMany({
    where: {
      subadminId: id
    },
    include: {
      product: {
        include: {
          Category: true
        }
      }
    }
  });
  res.render('pages/subadmin/promotion', { promotions });
});


router.get('/promotions', async (req: Request, res: Response) => {
  // @ts-ignore
  const { id } = req.session.user;

  const promotions = await prisma.promotion.findMany({
    where: {
      subadminId: id
    },
    include: {
      product: {
        include: {
          Category: true
        }
      }
    }
  });

  res.json({ promotions });
})

export { router };
