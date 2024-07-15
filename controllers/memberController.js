const {request, response} = require('express')
const memberData = require('../data/memberData')
const memberModel = require('../models/memberModel')

const getAllMemberData = async(request, response) => {
    try{
        let member = await memberModel.find();
        if(member.length === 0)
        {
            const initialMember = await memberModel.insertMany(memberData);
        }
        response.status(200).json(member);
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const getMemberDataById = async (request, response) => {
    const memberIdtoFetch = request.params.id;
    try{
        const expectedMemberData = await memberModel.findOne({memberId: memberIdtoFetch})
        if(expectedMemberData)
        {
            return response.status(200).json(expectedMemberData);
        }
        return response.status(404).json({message: `No Member was found with memberId ${memberIdtoFetch}`})
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const addNewMemberData = async(request, response) => {
    const newMember = request.body
    try{
        const existingMember = await memberModel.findOne({memberId: newMember.memberId})
        console.log(existingMember);
        if(existingMember)
        {
            return response.status(409).json({message: `A Member with ${newMember.memberId} already exists`})
        }
        const insertedMember = await memberModel.create(newMember)
        response.status(201).json(insertedMember)
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const updateMemberData = async (request, response) => {
    const memberIdtoFetch = request.params.id;
    const memberTobeUpdated = request.body;
    try{
        const updatedMember = await memberModel.findByIdAndUpdate({memberId : memberIdtoFetch}, memberTobeUpdated, { new : true});
        if(updatedMember) {
            return response.status(200).json({message: 'Updated Successfully', updatedMember})
        }
        else {
            return response.status(404).json({message: 'Invalid ID'});
        }
    }
    catch(error)
    {
        return response.status(500).json({message: error.message});
    }
}

const deleteMemberData = async(request, response) => {
    const memberIdtoFetch = request.params.id;
    try{
        const deletedMember = await memberModel.findOneAndDelete({memberId : memberIdtoFetch});
        if(deletedMember) {
            return response.status(200).json({message: 'Deleted Successfully'});
        }
        else {
            return response.status(400).json({message: 'Invalid ID'});
        }
    }
    catch(error)
    {
        return response.status(500).json({message: error.message});
    }
}

module.exports = {getAllMemberData, getMemberDataById, addNewMemberData, updateMemberData, deleteMemberData};