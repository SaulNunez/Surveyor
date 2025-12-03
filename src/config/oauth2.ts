import { ClientModel } from "../models/auth/clientSchema";
import { RefreshTokenModel } from "../models/auth/tokensSchema";
import { UserModel } from "../models/auth/userSchema";
import { getClientById } from "../services/auth/clientService";
import { getUserByEmail } from "../services/auth/userService";
import oauth2orize from 'oauth2orize';

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Client = require("../models/client");
const passport = require("../config/passport");
const bcrypt = require("bcrypt");

export const server = oauth2orize.createServer();

server.exchange(
    oauth2orize.exchange.password(async (client, username, password, scope, done) => {
        try {
            const clientInfo = await getClientById(client.id);

            if (!clientInfo) {
                return done(new Error('Client not found'), false);
            }

            const user = await getUserByEmail(username);
            if (!user) {
                return done(new Error('Invalid credentials'), false);
            }

            const isMatch = bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(new Error('Invalid credentials'), false);
            }

            const accessToken = jwt.sign(
                { email: user.email },
                process.env.TOKEN_SIGNING_KEY,
                { 
                    expiresIn: "1h",
                    audience: client.id,
                    sub: user._id
                }
            );

            const refreshToken = jwt.sign(
                { email: user.email },
                process.env.TOKEN_SIGNING_KEY,
                { 
                    expiresIn: "90d",
                    audience: client,
                    sub: user._id
                }
            );
            const dbRefreshToken = new RefreshTokenModel({
                token: refreshToken,
                clientId: client,
                userId: user._id
            });

            await dbRefreshToken.save();
            done(null, accessToken, refreshToken);
        } catch (err) {
            if(err instanceof Error){
                done(err);
            } else
            {
                done(new Error(err?.toString()));
            }
        }
    })
);