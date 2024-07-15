const express = require('express')
const router = express.Router()

const {getAllLibrarianData, getLibrarianDataById, addNewLibrarianData, updateLibrarianData, deleteLibrarianData} = require('../controllers/librarianController')

router.get('/getAllLibrarianData', getAllLibrarianData);

router.get('/getLibrarianDataById/:id', getLibrarianDataById);

router.post('/addNewLibrarianData', addNewLibrarianData);

router.put('/updateLibrarianData/:id', updateLibrarianData);

router.delete('/deleteLibrarianData/:id', deleteLibrarianData);

module.exports = router