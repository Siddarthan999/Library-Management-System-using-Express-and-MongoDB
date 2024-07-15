const {request, response} = require('express')
const librarianData = require('../data/librarianData')
const librarianModel = require('../models/librarianModel')

const getAllLibrarianData = async(request, response) => {
    try{
        let librarian = await librarianModel.find();
        if(librarian.length === 0)
        {
            const initialLibrarian = await librarianModel.insertMany(librarianData);
        }
        response.status(200).json(librarian);
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const getLibrarianDataById = async (request, response) => {
    const empIdtoFetch = request.params.id;
    try{
        const expectedlibrarianData = await librarianModel.findOne({employeeId: empIdtoFetch})
        if(expectedlibrarianData)
        {
            return response.status(200).json(expectedlibrarianData);
        }
        return response.status(404).json({message: `No Librarian was found with employeeId ${empIdtoFetch}`})
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const addNewLibrarianData = async(request, response) => {
    const newLibrarian = request.body
    try{
        const existingLibrarian = await librarianModel.findOne({employeeId: newLibrarian.employeeId})
        console.log(existingLibrarian);
        if(existingLibrarian)
        {
            return response.status(409).json({message: `A Librarian with ${newLibrarian.employeeId} already exists`})
        }
        const insertedLibrarian = await librarianModel.create(newLibrarian)
        response.status(201).json(insertedLibrarian)
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const updateLibrarianData = async (request, response) => {
    const empIdtoFetch = request.params.id;
    const LibrarianTobeUpdated = request.body;
    try{
        const updatedLibrarian = await librarianModel.findByIdAndUpdate({employeeId : empIdtoFetch}, LibrarianTobeUpdated, { new : true});
        if(updatedLibrarian) {
            return response.status(200).json({message: 'Updated Successfully', updatedLibrarian})
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

const deleteLibrarianData = async(request, response) => {
    const empIdtoFetch = request.params.id;
    try{
        const deletedLibrarian = await librarianModel.findOneAndDelete({employeeId : empIdtoFetch});
        if(deletedLibrarian) {
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

module.exports = {getAllLibrarianData, getLibrarianDataById, addNewLibrarianData, updateLibrarianData, deleteLibrarianData};