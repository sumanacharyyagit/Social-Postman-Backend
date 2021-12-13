const express = require ("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const User = require("../models/users");


// Get the UserDatabase Data
router.get('/', (req, resp, next) => {
    User.find()
    .then(result => {
        console.log(result);
        resp.status(200).json({
            "newUser": result,
        })
    })
    .catch(error => {
        console.log(error);
        resp.status(500).json({
            "error": error,
        })
    });
});


// Get the UserDatabase Data by their Id

router.get('/:id', (req, resp) => {
    console.log(req.params.id);
    User.findById(req.params.id)
    .then(result => {
        console.log(result);
        resp.status(200).json({
            "getUserMsg": result,
        })
    })
    .catch(error => {
        console.log(error);
        resp.status(500).json({
            "error": error,
        })
    });
});


// REGISTRATION : POST or Insert Data to the UserDatabase 

router.post('/register', (req, resp) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
            return resp.status(500).json({
                "hashErrMsg": err
            })
        }
        else{
            const user = new User({
                "_id": new mongoose.Types.ObjectId,
                "name": req.body.name,
                "email": req.body.email,
                "password": hash,
            });

            user.save()
            .then(result => {
                console.log(result);
                resp.status(200).json({
                    "newUserMsg": result,
                })
            })
            .catch(error => {
                console.log(error);
                resp.status(500).json({
                    "error": error,
                })
            });
        }
    });
});



// REGISTRATION : POST or Insert Data to the UserDatabase 

router.post('/login', (req, resp) => {
    User.find({"email": req.body.email})
    .exec()
    .then(keyUser => {
        if(keyUser.length < 1){
            return resp.status(401).json({
                "userNotInDB": "User not found...!"
            })
        }
        bcrypt.compare(req.body.password, keyUser[0].password, (err, result) => {
            if(!result){
                return resp.status(401).json({
                    "passwordMismatchMsg": "Passsword not matched...!"
                })
            }
            if(result){
                const token = jwt.sign({
                    "_id": keyUser[0].id,
                    "name": keyUser[0].name,
                    "email": keyUser[0].email,
                }, 'All verified with JWT Token',
                {
                   "expiresIn": "1h" 
                });
                resp.status(200).json({
                    "name": keyUser[0].name,
                    "email": keyUser[0].email,
                    "token": token
                })
            }
        });
    })
    .catch(error => {
        console.log(error);
        resp.status(500).json({
            "error": error,
        })
    });
});



// PUT/Update the UserDatabase Data by Id

router.put('/:id', (req, resp) => {
    console.log(req.params.id);
    User.findOneAndUpdate({_id: req.params.id}, {
        $set: {
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password,
        }
    })
    .then(result => {
        console.log(result);
        resp.status(200).json({
            "updateUserMsg": result,
        })
    })
    .catch(error => {
        console.log(error);
        resp.status(500).json({
            "error": error,
        })
    });
});



// Delete the UserDatabase Data by Id

router.delete('/:id', (req, resp) => {
    User.remove({"_id": req.params.id})
    .then(result => {
        console.log(result);
        resp.status(200).json({
            "message": "User deleted..!",
            "removedUserMsg": result,
        })
    })
    .catch(error => {
        console.log(error);
        resp.status(500).json({
            "error": error,
        })
    });
});

module.exports = router;
