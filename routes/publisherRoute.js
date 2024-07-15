const express = require('express')
const router = express.Router()

const {getAllPublisherData, getPublisherDataById, addNewPublisherData, updatePublisherData, deletePublisherData} = require('../controllers/publisherController')

router.get('/getAllPublisherData', getAllPublisherData);

router.get('/getPublisherDataById/:id', getPublisherDataById);

router.post('/addNewPublisherData', addNewPublisherData);

router.put('/updatePublisherData/:id', updatePublisherData);

router.delete('/deletePublisherData/:id', deletePublisherData);

module.exports = router