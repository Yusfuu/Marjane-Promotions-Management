import express from "express";
import { isAuthenticated } from "@middlewares/index";
import { createCategory, createManager, createPromotion } from "@controllers/subadmin";

const router = express.Router();

router.use(isAuthenticated('subadmin'));

router.post('/promotion/create', createPromotion);

router.post('/manger/create', createManager);

router.post('/category/create', createCategory);


export { router }