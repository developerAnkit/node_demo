const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CommentSchema = mongoose.Schema({
    user_id: {
        type: Schema.ObjectId,
        ref: 'User',
        required: 'Can not be blank'
      },
    comment_by: {
        type: Schema.ObjectId,
        ref: 'User',
        required: 'Can not be blank'
    },
    content: {
        type: String,
        required: 'Can not be blank'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema);