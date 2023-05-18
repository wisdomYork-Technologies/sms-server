import express from "express";
import SuperController from "../../controller/index";

const router = express.Router();

router.post("/signup", SuperController.SuperAdminRegister);
router.get("/verify/:signature", SuperController.VerifySuperAdmin);
router.post("/login", SuperController.SuperAdminLogin)


export default router;
