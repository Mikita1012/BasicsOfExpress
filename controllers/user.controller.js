const User = require('../models/user.model');


exports.signUp = async (req, res) => {
    try {
        const { userid, email, first_name, last_name, username, contact, password, role } = req.body;
        const userId = req.body.userId || req.query.userId;

        const newUser = new User({
            userid,
            email,
            first_name,
            last_name,
            username,
            contact,
            password,
            role,
            isLoggedIn: false,
            uuid: '',
            accesstoken: '',
            coupens: [],
            bookingRequests: []
        });
        const user = await newUser.save();
        if (user) {
            user.isLoggedIn = false;
            user.uuid = '';
            user.accesstoken = '';

            await user.save();
            res.status(200).json({ message: 'Logout successful' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (user) {
            user.isLoggedIn = true;
            user.uuid = 'generated_uuid';
            user.accesstoken = 'generated_access_token';
            await user.save();
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(404).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.logout = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (user) {
            user.isLoggedIn = false;
            user.uuid = '';
            user.accesstoken = '';
            await user.save();
            res.status(200).json({ message: 'Logout successful' });
        } else {

            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getCouponCode = async (req, res) => {
    try {
        const couponCode = "YOUR_COUPON_CODE";
        res.status(200).json({ couponCode });
    } catch (error) {
        console.error('Error generating coupon code:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.bookShow = async (req, res) => {
    try {
        const { userId, showId } = req.body;
        res.status(200).json({ message: 'Show booked successfully' });
    } catch (error) {
        console.error('Error booking show:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
