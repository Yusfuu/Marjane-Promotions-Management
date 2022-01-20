import express from "express";
import { isAuthenticated } from "@middlewares/index";
import { createSubadmin, deleteSubadmin, login } from "@controllers/admin";

const router = express.Router();

// admin login router
router.post('/login', login);

// auth middleware
router.use(isAuthenticated('admin'));

// admin create subadmin router
router.post('/create', createSubadmin);

// admin delete subadmin router
router.post('/subadmin/delete', deleteSubadmin);


export { router };