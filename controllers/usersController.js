const express = require('express');
const router = express.Router();

const User = require('../models/user');


router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('users/index', { users });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById((req.session.user._id)).populate('pantry');
        res.render('users/show', { user });
    } catch (error) {
        console.log(error);
        res.redirect('/users');
    }
});
module.exports = router;