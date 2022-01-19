import express from "express";
import { isAuthenticated } from "@middlewares/index";
import { createSubadmin, deleteSubadmin, login } from "@controllers/admin";

const router = express.Router();

router.post('/login', login);

router.use(isAuthenticated('admin'));

router.post('/create', createSubadmin);

router.post('/subadmin/delete', deleteSubadmin);


export { router };