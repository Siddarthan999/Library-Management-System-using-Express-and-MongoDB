const express = require('express')
const router = express.Router()

const {getAllTransactionData, getTransactionDataById, addNewTransactionData, updateTransactionData, deleteTransactionData} = require('../controllers/transactionController')

router.get('/getAllTransactionData', getAllTransactionData);

router.get('/getTransactionDataById/:id', getTransactionDataById);

router.post('/addNewTransactionData', addNewTransactionData);

router.put('/updateTransactionData/:id', updateTransactionData);

router.delete('/deleteTransactionData/:id', deleteTransactionData);

module.exports = router