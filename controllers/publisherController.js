const {request, response} = require('express')
const publisherData = require('../data/publisherData')
const publisherModel = require('../models/publisherModel')

const getAllPublisherData = async(request, response) => {
    try{
        let publisher = await publisherModel.find();
        if(publisher.length === 0)
        {
            const initialPublisher = await publisherModel.insertMany(publisherData);
        }
        response.status(200).json(publisher);
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const getPublisherDataById = async (request, response) => {
    const publisherIdtoFetch = request.params.id;
    try{
        const expectedPublisherData = await publisherModel.findOne({publisherId: publisherIdtoFetch})
        if(expectedPublisherData)
        {
            return response.status(200).json(expectedPublisherData);
        }
        return response.status(404).json({message: `No publisher was found with publisherId ${publisherIdtoFetch}`})
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const addNewPublisherData = async(request, response) => {
    const newPublisher = request.body
    try{
        const existingPublisher = await publisherModel.findOne({publisherId: newPublisher.publisherId})
        console.log(existingPublisher);
        if(existingPublisher)
        {
            return response.status(409).json({message: `A Publisher with ${newPublisher.publisherId} already exists`})
        }
        const insertedPublisher = await publisherModel.create(newPublisher)
        response.status(201).json(insertedPublisher)
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const updatePublisherData = async (request, response) => {
    const publisherIdtoFetch = request.params.id;
    const publisherTobeUpdated = request.body;
    try{
        const updatedPublisher = await publisherModel.findByIdAndUpdate({publisherId : publisherIdtoFetch}, publisherTobeUpdated, { new : true});
        if(updatedPublisher) {
            return response.status(200).json({message: 'Updated Successfully', updatedPublisher})
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

const deletePublisherData = async(request, response) => {
    const publisherIdtoFetch = request.params.id;
    try{
        const deletedPublisher = await publisherModel.findOneAndDelete({publisherId : publisherIdtoFetch});
        if(deletedPublisher) {
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

module.exports = {getAllPublisherData, getPublisherDataById, addNewPublisherData, updatePublisherData, deletePublisherData};