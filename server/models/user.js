const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    email:{type: String, unique: true, lowercase:true},
    password:String,
    results: Array
})

userSchema.pre('save', function(next) {
    const user = this;
    bcrypt.genSalt(10,(err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatedPassword, callback) {
    bcrypt.compare(candidatedPassword, this.password, function(err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
}   

const modelClass = mongoose.model('users',userSchema);

module.exports = modelClass;


