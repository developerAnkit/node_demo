const User = require('../models/user.model.js');
const Comment = require('../models/comment.model.js');

exports.create = (req, res) => {
    const user = new User(req.body);

    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

exports.create_comment = (req, res) => {
    const comment = new Comment(req.body);

    comment.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Comment."
        });
    });
};

exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

exports.findByInterests = (req, res) => {
    User.find({ interests: req.params.interests })
    .then(users => {
        if(!users) {
            return res.status(404).send({
                message: "Users not found with interests " + req.params.interests
            });            
        }
        res.send(users);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Users not found with interests " + req.params.interests
            });                
        }
        return res.status(500).send({
            message: "Error retrieving users with interests " + req.params.interests
        });
    });
};

exports.findComments = (req, res) => {
    Comment.find({ user_id: req.params.userId })
    .then(comments => {
        if(!comments) {
            return res.status(404).send({
                message: "Comments not found by " + req.params.userId
            });            
        }
        res.send(comments);
    }).catch(err => {
        console.error(err)
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Comments not found by " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Comments by " + req.params.userId
        });
    });
};

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "User can not be empty"
        });
    }

    User.findByIdAndUpdate(req.params.userId, req.body,
    {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};