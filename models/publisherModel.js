const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        address: {
            type: String,
            required: true
        },
        publisherId: {
            type: String,
            required: true,
            unique: true
        },
        contactInformation: {
            type: String,
            required: true
        }
    },
    {
        collection: 'publisherDataCollection'
    }
);

module.exports = mongoose.model('publisherDataCollection', publisherSchema);
