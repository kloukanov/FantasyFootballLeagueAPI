const express = require('express');
const router = express.Router();
const User = require('../models/User');

// get all users
router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.json({message: err});
    }
})

// auth login
router.post('/login', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    try{
        const savedUsers = await User.find();
        var found = false;
        var valid = false;
        savedUsers.forEach(usr => {
            if(usr.username == user.username){
                found = true;
                if(usr.password == user.password){
                    valid = true;
                }
                else{
                    valid = false;
                }
            }
        });
        if(found && valid){
            console.log("success");
            res.json({ result: 'success' });
        }else if(found){
            console.log("invalid credentials");
            res.json({ result: 'invalid credentials' });
        }else{
            console.log("user not found");
            res.json({ result: 'user not found' })
        }

    }catch(err){
        res.json({message: err});
    }
})

// get specific user
router.get('/:userId', async (req, res) => {
    try{
       const user = await User.findById(req.params.userId);
       res.json(user);
    }catch(err){
        res.json({message: err});
    }
})

// create user
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    });

    try{
        const savedUser = await user.save();
        res.json(savedUser);
    }catch(err){
        res.json({message: err});
    }
})

// update user
router.patch('/:userId', async (req, res) => {
    try{
       const user = await User.updateOne(
           {_id: req.params.userId}, 
           {$set : { 
               name: req.body.name,
               username: req.body.username,
               password: req.body.password
            }});
       res.json(user);
    }catch(err){
        res.json({message: err});
    }
})

// delete user
router.delete('/:userId', async (req, res) => {
    try{
       const user = await User.remove({_id: req.params.userId});
       res.json(user);
    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;