import { getUserByEmail } from "../services/auth/userService";

const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require("jsonwebtoken");
/*
passport.use(new BasicStrategy(
    async function (username, password, done) {
        try {
            const user = await getUserByEmail(username);
            if (!user) {
                console.log('User not found');
                return done(null, false);
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            console.log('Error:', err);
            return done(err);
        }
    }
));

passport.use('client-basic', new BasicStrategy(
    async function (clientId, clientSecret, done) {
        try {
            const client = await getClientById(clientId);
            if (!client || client.clientSecret !== clientSecret) {
                console.error(`Client not found or secret does not match. ClientId: ${clientId}`);
                return done(null, false);
            }
            return done(null, client);
        } catch (err) {
            console.log('Error:', err);
            return done(err);
        }
    }
)); */

passport.use(new BearerStrategy(async (token : string, cb: (err: Error | null, user?: Object | boolean, info?: Object | null) => void) => {
    try {
        const decoded = await jwt.verify(token, process.env.TOKEN_SIGNING_KEY);
        const user = await getUserByEmail(decoded.email);
        decoded.email ? cb(null, user, { scope: 'all' }) : cb(null, false);
    } catch(err) {
        cb(null, false);
    }
  }));

module.exports = passport;