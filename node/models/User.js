const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
    type: String,
    required: true,
    unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// password hashing before saving (pre save)
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // if the password wasnt changed -> skip hashing (disallows rehashing)
    this.password = await bcrypt.hash(this.password, 10); // hashes password with salt round of 10
    next();
});

module.exports = mongoose.model('User', UserSchema);