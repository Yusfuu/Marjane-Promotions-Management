import express from "express";
import { prisma } from "../../prisma/client";
import { isAuthenticated } from "../middleware";

const router = express.Router();

router.use(isAuthenticated('subadmin'));
router.get('/dashboard', (req, res) => {

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

router.get('/dashboard/manger', async (req, res) => {
  const { id } = req.session.user;
  const managers = await prisma.manager.findMany({
    where: { subadminId: id }
  });

  res.render('pages/subadmin/manager', { managers });
});

router.get('/dashboard/category', async (req, res) => {
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

router.get('/dashboard/promotion', async (req, res) => {
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


// middleware for promotionTime

// router.use(promotionTime);


router.get('/promotions', async (req, res) => {
  const { id } = req.currentUser;
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
