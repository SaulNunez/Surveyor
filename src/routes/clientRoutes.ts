import { Router } from "express";
import { createClientRequest } from "../controllers/clientController";

const router = Router();

router.post("/", createClientRequest);

export default router;