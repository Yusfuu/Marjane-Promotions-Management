import express from "express";
import sendEmail from '../utils/email';
import { prisma } from "../../prisma/client";
import { seal } from "../lib/seal";
import { isAuthenticated } from "../middleware";

const router = express.Router();

// render login page for admin
router.get('/login', isAuthenticated(), (req, res) => {
  res.render('pages/admin/login');
});

router.use(isAuthenticated('admin'));
// render dashboard page for admin
router.get('/dashboard', (req, res) => {
  const { action } = req.query;

  if (action === 'create') {
    res.render('pages/admin/create');
  }

  const cards = [
    {
      title: 'Subadmin',
      description: 'Passwordless login that’s delightful, blazing-fast, and fully customizable',
      color: 'bg-purple-500',
      url: '/admin/dashboard/subadmin'
    },
  ];
  res.render('pages/admin/dashboard', { cards });
});

router.get('/dashboard/subadmin', async (req, res) => {
  const subadmins = await prisma.subadmin.findMany({
    include: {
      _count: {
        select: {
          Promotion: true,
        }
      }
    }
  });
  res.render('pages/admin/subadmin', { subadmins });
});







// router.get('/operations', requiredAuth({ role: 'ADMIN' }), async (req, res) => {
//   // validate body
//   const operations = await prisma.logs.findMany();

//   res.json({ operations });
// });


// router.get('/export', requiredAuth({ role: 'ADMIN' }), async (req, res) => {
//   // validate body
//   const operations = await prisma.logs.findMany();
//   require('fs').writeFileSync('./operations.json', JSON.stringify(operations));
//   res.json({ operations });
// });



export { router };