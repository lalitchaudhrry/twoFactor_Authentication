import express from "express";
import {
  setup2FA,
  verify2FASetup,
  verify2FALogin,
} from "../controllers/twofa.controller.js";

const router = express.Router();

router.post("/setup", setup2FA);
router.post("/verify-setup", verify2FASetup);
router.post("/verify-login", verify2FALogin);

export default router;
