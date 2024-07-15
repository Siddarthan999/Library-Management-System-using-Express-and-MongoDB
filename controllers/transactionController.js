const {request, response} = require('express')
const transactionData = require('../data/transactionData')
const transactionModel = require('../models/transactionModel')

const getAllTransactionData = async(request, response) => {
    try{
        let transaction = await transactionModel.find();
        if(transaction.length === 0)
        {
            const initialTransaction = await transactionModel.insertMany(transactionData);
        }
        response.status(200).json(transaction);
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const getTransactionDataById = async (request, response) => {
    const memberIdtoFetch = request.params.id;
    try{
        const expectedTransactionData = await transactionModel.findOne({memberId: memberIdtoFetch})
        if(expectedTransactionData)
        {
            return response.status(200).json(expectedTransactionData);
        }
        return response.status(404).json({message: `No transaction was found with memberId ${memberIdtoFetch}`})
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const addNewTransactionData = async(request, response) => {
    const newTransaction = request.body
    try{
        const existingTransaction = await transactionModel.findOne({memberId: newTransaction.memberId})
        console.log(existingTransaction);
        if(existingTransaction)
        {
            return response.status(409).json({message: `A transaction with ${newTransaction.memberId} already exists`})
        }
        const insertedTransaction = await transactionModel.create(newTransaction)
        response.status(201).json(insertedTransaction)
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const updateTransactionData = async (request, response) => {
    const memberIdtoFetch = request.params.id;
    const transactionTobeUpdated = request.body;
    try{
        const updatedTransaction = await transactionModel.findByIdAndUpdate({memberId : memberIdtoFetch}, transactionTobeUpdated, { new : true});
        if(updatedTransaction) {
            return response.status(200).json({message: 'Updated Successfully', updatedTransaction})
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

const deleteTransactionData = async(request, response) => {
    const memberIdtoFetch = request.params.id;
    try{
        const deletedTransaction = await transactionModel.findOneAndDelete({memberId : memberIdtoFetch});
        if(deletedTransaction) {
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

module.exports = {getAllTransactionData, getTransactionDataById, addNewTransactionData, updateTransactionData, deleteTransactionData};