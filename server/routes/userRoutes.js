import { Router } from "express";
import { forgetPassword, getProfile, login, logout, register, resetPassword,  updateUser } from "../controllers/userController.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
//import { isLoggedIn } from "../middleware/auth.middleware.js";
const router = Router()

router.post('/register' , upload.single('avatar'), register)
router.post('/login' ,login)
router.post('/logout' ,logout)
 router.get('/me' , isLoggedIn, getProfile)
// router.route("/me").get(isLoggedIn, getProfile)
router.post('/reset' ,forgetPassword)
router.post('/reset/:resetToken' , resetPassword)
router.put("/update/:id" ,isLoggedIn,upload.single("avatar") ,updateUser)

export default router

