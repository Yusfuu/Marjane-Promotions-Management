import { prisma } from "@lib/prisma";
import { Request, Response } from "express";


export const confirmPromotion = async (req: Request, res: Response) => {
  const { promotionId, confirmation }: any = { ...req.body };

  const updatePromotion = await prisma.promotion.update({
    where: { id: promotionId },
    data: { confirmation }
  }).catch(_ => _);

  res.json({ message: 'Promotion updated successfully', updatePromotion });
}