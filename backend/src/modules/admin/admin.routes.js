import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { getDashboard } from "../admin/admin.controller.js";

const router = Router();

router.get("/dashboard", authMiddleware, getDashboard);

export default router;