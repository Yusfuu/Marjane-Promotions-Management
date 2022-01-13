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
      title: 'Create a Subadmin',
      description: 'Passwordless login that’s delightful, blazing-fast, and fully customizable',
      color: 'bg-purple-500',
      url: '/admin/dashboard?action=create'
    },
  ];
  res.render('pages/admin/dashboard', { cards });
});




// router.delete('/delete', requiredAuth({ role: 'ADMIN' }), async (req, res) => {
//   // validate body
//   const body = { ...req.body };

//   const subadminId = body.subadminId;

//   // check if subadmin exists
//   const subadmin = await prisma.subadmin.findUnique({ where: { id: subadminId } });

//   if (!subadmin) {
//     return res.status(400).json({ error: 'Subadmin does not exist' });
//   }

//   const deleted = await prisma.subadmin.delete({ where: { id: subadminId } });

//   res.json({
//     data: deleted,
//     message: 'Subadmin deleted successfully',
//   });

// });


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