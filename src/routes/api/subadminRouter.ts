import express from "express";
import { isAuthenticated } from "@middlewares/index";
import { createCategory, createManager, createPromotion } from "@controllers/subadmin";

const router = express.Router();

// auth middleware for subadmin
router.use(isAuthenticated('subadmin'));

// subadmin create promotion router
router.post('/promotion/create', createPromotion);

// subadmin create manager router
router.post('/manger/create', createManager);

// subadmin create category router
router.post('/category/create', createCategory);

export { router }