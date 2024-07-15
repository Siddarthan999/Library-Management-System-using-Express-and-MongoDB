const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        memberId: {
            type: String,
            required: true
        },
        bookId: {
            type: String,
            required: true
        },
        borrowDate: {
            type: Date,
            required: true
        },
        dueDate: {
            type: Date,
            required: true
        },
        returnDate: {
            type: Date,
            default: null
        },
        librarianId: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ['Borrowed', 'Returned']
        }
    },
    {
        collection: 'transactionDataCollection'
    }
);

module.exports = mongoose.model('transactionDataCollection', transactionSchema);
