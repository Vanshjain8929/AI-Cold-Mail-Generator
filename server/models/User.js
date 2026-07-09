const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
    },

    username: {
        type: String,
        required: true,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    otp: {
        type: String,
    },

    otpExpiry: {
        type: Date,
    },

});

// Pre-save hook to hash the password before saving the user document
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare the provided password with the hashed password in the database
userSchema.methods.matchPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;