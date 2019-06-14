const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    phone_number: String,
    designation: String,
    address: String,
    interests: {
        type: [String],
        required: true,
        validate: [(value) => value.length > 0, 'Can not be blank'],
      },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);