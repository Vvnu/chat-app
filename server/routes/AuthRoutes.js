import { Router } from "express";
import { getUserInfo,signup, login ,updateProfile } from "../controllers/AuthController.js"; // ADD login import
import { verifyToken } from "../middlewares/AuthMiddleware.js"; // ADD verifyToken import

const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login); 
authRoutes.get("/user-info",verifyToken, getUserInfo); 
authRoutes.post("/update-profile",verifyToken,updateProfile); 

export default authRoutes;