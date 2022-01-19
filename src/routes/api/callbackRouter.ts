import express from "express";
import { callback } from "@controllers/callback";

const router = express.Router();

router.get('/', callback);

export { router };
