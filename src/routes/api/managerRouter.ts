import express, { Request, Response } from "express";
import { prisma } from "@lib/prisma";
import { isAuthenticated } from "@middlewares/index";

const router = express.Router();

router.use(isAuthenticated('manager'));

router.post('/promotion/confirm', async (req: Request, res: Response) => {
  const { promotionId, confirmation }: any = { ...req.body };

  const updatePromotion = await prisma.promotion.update({
    where: { id: promotionId },
    data: { confirmation }
  }).catch(_ => _);

  res.json({ message: 'Promotion updated successfully', updatePromotion });
});

export { router };