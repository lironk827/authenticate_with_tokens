const jwt = require('jwt-simple');
const keys = require('../config/keys');
const User = require('../models/user');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp }, keys.secret);
}


module.exports.signin = (req, res, next) => {
    res.send({token: tokenForUser(req.user)});
}

module.exports.signup = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({email: email}, (err,existingUser) => {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            return res.status(422).send({error:'Email is in use'});
        }
        const user = new User({
            email, password
        })
        user.save((err) => {
            if (err) {
                return next(err);
            }
            res.send({token: tokenForUser(user)});
        });
    })
}
