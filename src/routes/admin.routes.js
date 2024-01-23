import { Router } from "express";
import {
    getUsers,
    deleteUser,
    changeRole
} from "../controllers/admin.controller.js";
import { verifyAuth } from "../middlewares/auth.js";

const router = Router();

router.get("/users/", verifyAuth, getUsers);
router.post("/users/:id", changeRole);
router.delete("/users/:id", deleteUser);

export default router;