import express from "express";
import { callback } from "@controllers/callback";

const router = express.Router();

// callback router
router.get('/', callback);

export { router };
