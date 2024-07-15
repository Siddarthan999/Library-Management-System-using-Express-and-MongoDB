const mongoose = require('mongoose');

const librarianSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        employeeId: {
            type: String,
            required: true,
            unique: true
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
        hireDate: {
            type: Date,
            required: true
        },
        role: {
            type: String,
            required: true
        }
    },
    {
        collection: 'librarianDataCollection'
    }
);

module.exports = mongoose.model('librarianDataCollection', librarianSchema);
