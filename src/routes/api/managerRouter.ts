import express from "express";
import { isAuthenticated } from "@middlewares/index";
import { confirmPromotion } from "@controllers/manager";

const router = express.Router();

router.use(isAuthenticated('manager'));

router.post('/promotion/confirm', confirmPromotion);

export { router };