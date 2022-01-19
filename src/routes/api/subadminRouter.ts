import express, { Request, Response } from "express";
import { sendEmail } from '@utils/email';
import { prisma } from "@lib/prisma";
import { seal } from "@lib/seal";
import { isAuthenticated } from "@middlewares/index";

const router = express.Router();


router.use(isAuthenticated('subadmin'))

router.post('/promotion/create', async (req: Request, res: Response) => {
  const body = { ...req.body };
  const { productId, discount, duration } = body;
  const product = await prisma.product.findUnique({ where: { id: productId }, include: { Promotion: true, Category: true } }).catch(_ => _);

  if (!product) {
    return res.status(400).json({ error: 'Product does not exist' });
  }

  if (product.Promotion) {
    return res.status(400).json({ error: 'Product already has a promotion' });
  }

  if (discount > 50) {
    return res.status(400).json({ error: 'Discount cannot be more than 50' });
  }


  if (product.Category.name === 'Multimedia' && discount > 20) {
    return res.status(400).json({ error: 'Discount cannot be more than 20 for Multimedia' });
  }

  //@ts-ignore
  const { id } = req.session.user

  const promotion = await prisma.promotion.create({
    data: {
      discount: +discount,
      productId,
      duration: +duration,
      subadminId: id,
      FidelityCard: (+discount / 5) * 50
    }
  });

  res.json({ message: 'Promotion created successfully', promotion });
}
);

router.post('/manger/create', async (req: Request, res: Response) => {
  const { email, name, categoryId } = req.body;
  //@ts-ignore
  const { id, center } = req.session.user;


  const manager = {
    email,
    name,
    categoryId,
    centerId: center.at(0).id,
    subadminId: id
  }


  const mangerCreated = await prisma.manager.create({ data: manager }).catch(_ => _);

  if (mangerCreated?.code === "P2003") {
    return res.status(400).json({ error: 'Category does not exist' });
  }

  if (mangerCreated?.code === "P2002") {
    return res.status(400).json({ error: 'Category already has a subadmin' });
  }

  mangerCreated.role = 'manager';

  const sealData = await seal(mangerCreated);

  const callback = process.env.AUTH_CALLBACK_URL;

  const url = `${callback}?seal=${sealData}`;

  await sendEmail(process.env.TEMP_EMAIL_PREFIX as string, url);

  res.json({ message: 'manager created successfully' });
});



router.post('/category/create', async (req: Request, res: Response) => {
  const { name } = req.body;

  const category = await prisma.category.create({ data: { name } }).catch(_ => _);

  if (category?.code === "P2002") {
    return res.status(400).json({ error: 'Category already exists' });
  }

  return res.json({ message: 'Category created successfully' });
});




export { router }