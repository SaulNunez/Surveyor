import { getClientById } from "../services/auth/clientService";
import { getUserByEmail } from "../services/auth/userService";

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcryptjs');
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

passport.use(new BearerStrategy(async (token, cb) => {
    try {
        const decoded = await jwt.verify(token, process.env.TOKEN_SIGNING_KEY);
        decoded.email ? cb(null, (await getUserByEmail(decoded.email)), { scope: 'all' }) : cb(null, false);
    } catch(err) {
        cb(null, false);
    }
  }));

module.exports = passport;