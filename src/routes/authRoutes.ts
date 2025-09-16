import { Router } from "express";
import { server } from "../config/oauth2";
import passport from "passport";

const router = Router();

router.get("/v2/token", passport.authenticate(['oauth2-client-password'], 
    { 
        session: false 
    }), 
        server.token(), server.errorHandler());

export default router;