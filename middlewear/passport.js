const passport = require('passport');
const User = require('../models/user')
const dotenv = require('dotenv')
dotenv.config();
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: '777'
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId).select('email id');
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                console.error(error);
                return done(error, false);
            }
        })
    );
};

