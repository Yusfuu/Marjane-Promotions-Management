import express from "express";
import { login, logout } from "@controllers/auth";
const router = express.Router();


// auth router
router.post('/login', login);
// logout router
router.post('/logout', logout);

export { router };