import express from "express";
import { prisma } from "../../../prisma/client";
import { isAuthenticated } from "../../middleware";

const router = express.Router();

router.use(isAuthenticated('manager'));

router.post('/promotion/confirm', async (req, res) => {
  const { promotionId, confirmation } = { ...req.body };

  const updatePromotion = await prisma.promotion.update({
    where: { id: promotionId },
    data: { confirmation }
  }).catch(_ => _);

  res.json({ message: 'Promotion updated successfully', updatePromotion });
});

export { router };