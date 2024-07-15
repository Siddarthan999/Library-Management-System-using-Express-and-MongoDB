const express = require('express')
const router = express.Router()

const {getAllMemberData, getMemberDataById, addNewMemberData, updateMemberData, deleteMemberData} = require('../controllers/memberController')

router.get('/getAllMemberData', getAllMemberData);

router.get('/getMemberDataById/:id', getMemberDataById);

router.post('/addNewMemberData', addNewMemberData);

router.put('/updateMemberData/:id', updateMemberData);

router.delete('/deleteMemberData/:id', deleteMemberData);

module.exports = router