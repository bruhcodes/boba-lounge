import { Router, type IRouter } from "express";
import healthRouter from "./health";
import usersRouter from "./users";
import notificationsRouter from "./notifications";
import settingsRouter from "./settings";
import statsRouter from "./stats";
import pushRouter from "./push";
import authRouter from "./auth";

const router: IRouter = Router();

router.use(healthRouter);
router.use(usersRouter);
router.use(notificationsRouter);
router.use(settingsRouter);
router.use(statsRouter);
router.use(pushRouter);
router.use(authRouter);

export default router;
