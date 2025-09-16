import { Request, Response, NextFunction } from "express";
import { createClient } from "../services/auth/clientService";
import { ClientInputDao } from "../models/auth/dao/clientCreationModel";

export const createClientRequest = async (req: Request, res: Response, next: NextFunction) => {
    if(req.body.clientName && req.body.clientDescription && req.body.redirectUris) {
            const clientDao = req.body as ClientInputDao;
            try {
                const client = await createClient(clientDao, "change_later");
                    res.status(201).json({
                    clientName: client.clientName,
                    clientDescription: client.clientDescription,
                    redirectUris: client.redirectUris,
                    clientId: client.clientId,
                    clientSecret: client.clientSecret
                });
            } catch (error) {
                res.status(500).send("Internal Server Error: Unable to create client");
            }
    } else {
        return res.status(400).send("Bad Request: Missing required fields");
    }
};
