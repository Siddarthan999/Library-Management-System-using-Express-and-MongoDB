const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        memberId: {
            type: String,
            required: true,
            unique: true
        },
        membershipDate: {
            type: Date,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        borrowedBooks: [{
            type: String
        }]
    },
    {
        collection: 'memberDataCollection'
    }
);

module.exports = mongoose.model('memberDataCollection', memberSchema);
