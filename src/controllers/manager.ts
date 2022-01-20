import { prisma } from "@lib/prisma";
import { catchAsync } from "@utils/catchAsync";
import { Request, Response } from "express";


// manager router for confirm promotion
export const confirmPromotion = catchAsync(async (req: Request, res: Response) => {
  const { promotionId, confirmation }: any = { ...req.body };

  // update promotion status or return error
  const updatePromotion = await prisma.promotion.update({
    where: { id: promotionId },
    data: { confirmation }
  }).catch(_ => _);

  res.json({ message: 'Promotion updated successfully', updatePromotion });
})