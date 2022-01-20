import { Request, Response } from "express";
import { prisma } from "@lib/prisma";
import { seal } from "@lib/seal";
import { catchAsync } from "@utils/catchAsync";
import { sendEmail } from "@utils/email";

// subadmin router for create promotion
export const createPromotion = catchAsync(async (req: Request, res: Response) => {
  const body = { ...req.body };
  const { productId, discount, duration } = body;

  // find product or return error
  const product = await prisma.product.findUnique({ where: { id: productId }, include: { Promotion: true, Category: true } }).catch(_ => _);

  // if product is not found
  if (!product) {
    return res.status(400).json({ error: 'Product does not exist' });
  }

  // if product is already promoted
  if (product.Promotion) {
    return res.status(400).json({ error: 'Product already has a promotion' });
  }

  // if product is more than 50% discount
  if (discount > 50) {
    return res.status(400).json({ error: 'Discount cannot be more than 50' });
  }

  // if product is in category multimedia and more than 3 20%
  if (product.Category.name === 'Multimedia' && discount > 20) {
    return res.status(400).json({ error: 'Discount cannot be more than 20 for Multimedia' });
  }

  //@ts-ignore
  const { id } = req.session.user

  // finaly create promotion or return error
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
});

// create new manager router
export const createManager = catchAsync(async (req: Request, res: Response) => {
  const { email, name, categoryId } = req.body;

  // get user from session
  //@ts-ignore
  const { id, center } = req.session.user;

  const manager = {
    email,
    name,
    categoryId,
    centerId: center[0].id,
    subadminId: id
  }

  // create new manager or return error
  const mangerCreated = await prisma.manager.create({ data: manager }).catch(_ => _);

  // if category is not found
  if (mangerCreated?.code === "P2003") {
    return res.status(400).json({ error: 'Category does not exist' });
  }

  // if category is already exist
  if (mangerCreated?.code === "P2002") {
    return res.status(400).json({ error: 'Category already has a subadmin' });
  }

  // store manager in session
  mangerCreated.role = 'manager';

  const sealData = await seal(mangerCreated);

  const callback = process.env.AUTH_CALLBACK_URL;

  // create passwordless login link
  const url = `${callback}?seal=${sealData}`;


  res.json({ message: 'manager created successfully' });

  // send passwordless login email
  return await sendEmail(process.env.TEMP_EMAIL as string, url);
});

// create new category router
export const createCategory = catchAsync(async (req: Request, res: Response) => {
  const { name } = req.body;

  // create new category or return error
  const category = await prisma.category.create({ data: { name } }).catch(_ => _);

  // if category is already exist
  if (category?.code === "P2002") {
    return res.status(400).json({ error: 'Category already exists' });
  }

  return res.json({ message: 'Category created successfully' });
});