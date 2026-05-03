import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.post("/auth/verify", (req, res) => {
  const { password } = req.body;
  // Fallback to "12345" if not set in .env
  const adminPassword = process.env.ADMIN_PASSWORD || "12345";
  
  if (password === adminPassword) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, error: "Incorrect password" });
  }
});

export default router;
