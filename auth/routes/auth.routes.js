const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserModel = require('../models/user.model');
const secretKey = 'OurSecretKey';

router.post('/auth/register', async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        const existingUser = await UserModel.findOne({email});
        if (existingUser) return res.json({message: 'User already existing !'});

        const newUser = new UserModel({firstName, lastName, email, password});
        newUser.save().then(user => {
            res.send('New User Added to DB !');
        }).catch(err => {
            res.status(400).send(err);
        });
    } catch(err) {
        console(`Error from register endpoint (TryCatch)`);
    }
});

router.post('/auth/signin', async (req, res) => {
    try {
        const {email, password} = req.body;
        const existingUser = await UserModel.findOne({email});
        if (!existingUser) return res.json({message: 'User does not exist !'});
        else {
            if (password !== existingUser.password) return res.json({message: 'Password is incorrect !'});
            else {
                const payload = {name: existingUser.firstName, email};
                jwt.sign(payload, secretKey,{expiresIn: '1d'}, (err, token) => {
                    if (err) return console.log(err);
                    else return res.json({token, user: payload});
                });
            }
        }
    } catch(err) {
        console(`Error from signin endpoint (TryCatch)`);
    }
});

// router.get('/auth/verify', (req, res) => {
//     const authHeader = req.headers.authorization;
//     if (authHeader) {
//         const token = authHeader.split(' ')[1];
//         jwt.verify(token, secretKey, (err, user) => {
//             if (err) {
//                 return res.json({err});
//             }
//             else return res.json({message: `Authenticated !`, user});
//         });

//         jwt.verify()
//     }
// });

router.get('/auth/users', async (req, res) => {
    try {
        const users = await UserModel.find();
        if (users) return res.status(200).json(users);
        else return res.status(500).json({message: `Server error !`});
    } catch(err) {
        console(`Error from /auth/users endpoint (TryCatch)`);
    }
    
});

module.exports = router;