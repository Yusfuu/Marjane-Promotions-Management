import express, { Request, Response } from "express";
import { isAuthenticated } from "@middlewares/index";
import { prisma } from "@lib/prisma";
const router = express.Router();

const cards = [
  {
    title: 'Subadmin',
    description: 'Passwordless login that’s delightful, blazing-fast, and fully customizable',
    color: 'bg-purple-500',
    url: '/admin/dashboard/subadmin'
  },
  {
    title: 'Stastics',
    description: 'Statistics of the Marjane including the number of promotion and others',
    color: 'bg-blue-500',
    url: '/admin/dashboard/stats'
  },
];


// render login page for admin
router.get('/login', isAuthenticated(), (req: Request, res: Response) => {
  res.render('pages/admin/login');
});

router.use(isAuthenticated('admin'));

// render dashboard page for admin
router.get('/dashboard', (req: Request, res: Response) => {
  res.render('pages/admin/dashboard', { cards });
});

router.get('/dashboard/stats', async (req: Request, res: Response) => {
  const promotions = await prisma.promotion.findMany({});
  console.log(promotions);
  res.render('pages/admin/stats');
});

router.get('/dashboard/subadmin', async (req: Request, res: Response) => {
  const subadmins = await prisma.subadmin.findMany({
    include: {
      _count: {
        select: {
          Promotion: true,
        }
      }
    }
  });
  const centers = await prisma.center.findMany({
    select: { id: true, name: true }
  }).catch(_ => _);
  res.render('pages/admin/subadmin', { subadmins, centers });
});


// router.get('/operations', requiredAuth({ role: 'ADMIN' }), async (req: Request, res: Response) => {
//   // validate body
//   const operations = await prisma.logs.findMany();

//   res.json({ operations });
// });


// router.get('/export', requiredAuth({ role: 'ADMIN' }), async (req: Request, res: Response) => {
//   // validate body
//   const operations = await prisma.logs.findMany();
//   require('fs').writeFileSync('./operations.json', JSON.stringify(operations));
//   res.json({ operations });
// });



export { router };