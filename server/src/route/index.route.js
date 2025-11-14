import { Router } from "express";
import apiRouter from "./apis/api.index.js";

const router = Router()

router.use("/api", apiRouter)


export default router;