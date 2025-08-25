import { Router } from "express";
import { getUserInfo,
         signup, 
         login ,
         updateProfile ,
         addProfileImage,
         removeProfileImage,
} from "../controllers/AuthController.js"; // ADD login import
import { verifyToken } from "../middlewares/AuthMiddleware.js"; // ADD verifyToken import
import multer  from "multer";



const authRoutes = Router();
const upload = multer({ dest: 'uploads/profiles/' });


authRoutes.post("/signup", signup);
authRoutes.post("/login", login); 
authRoutes.get("/user-info",verifyToken, getUserInfo); 
authRoutes.post("/update-profile",verifyToken,updateProfile); 
authRoutes.post("/add-profile-image",verifyToken,
     upload.single('profile-image'),
     addProfileImage); // ADD route for adding profile image

authRoutes.delete("/remove-profile-image",verifyToken, removeProfileImage); // ADD route for removing profile image

export default authRoutes;