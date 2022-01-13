import express from "express";
import { prisma } from "../../prisma/client";
import { promotionTime, isAuthenticated } from "../middleware";

const router = express.Router();

router.use(isAuthenticated('manager'));

router.get('/dashboard', (req, res) => {

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

router.get('/dashboard/promotion', async (req, res) => {
  const { categoryId, centerId } = req.session.user;
  const confirmation = req?.query?.confirmation || false;
  const promotions = await prisma.promotion.findMany({
    where: {
      product: { categoryId: { equals: categoryId } },
      subadminId: { equals: centerId },
      confirmation
    },
    include: {
      product: true
    }
  }).catch(_ => _);
  res.render('pages/manager/promotion', { promotions });
});




export { router };