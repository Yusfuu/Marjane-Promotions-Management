import express from "express";
import { isAuthenticated } from "@middlewares/index";
import { confirmPromotion } from "@controllers/manager";

const router = express.Router();

// auth middleware for manager
router.use(isAuthenticated('manager'));

// manager confirm promotion router
router.post('/promotion/confirm', confirmPromotion);

export { router };