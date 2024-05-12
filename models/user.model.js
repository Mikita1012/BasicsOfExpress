const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userid: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    first_name: String,
    last_name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    contact: String,
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Assuming user roles are limited to 'user' and 'admin'
        default: 'user'
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    uuid: String,
    accesstoken: String,
    coupens: [{
        id: Number,
        discountValue: Number
    }],
    bookingRequests: [{
        reference_number: Number,
        coupon_code: Number,
        show_id: Number,
        tickets: [Number]
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
