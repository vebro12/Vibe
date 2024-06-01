import express from "express";
import { loginUser, registeredUser } from "../Controllers/AuthController.js";

const router = express.Router();

router.post('/register',registeredUser)
router.post("/login", loginUser)

export default router;