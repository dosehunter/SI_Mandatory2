/*
 * Responsible for all routes related to bank users (Bank.BankUser).
 * 
 * Author: Arvid Larsen
 */

const User = require('../model/BankUser');

/**
 * Endpoint for creating a new BankUser.
 * Endpoint: /api/user/:userId | /api/bank/user/:userId
 * 
 * @param {request} req Incoming request, parameter with userId.
 * @param {Response} res Outgoing response.
 */
exports.createUser = function(req, res){
    let userId = Number(req.params.userId);

    User.createUser(userId);
    res.sendStatus(200);
};

/**
 * Endpoint for getting a BankUser based on UserId.
 * Endpoint: /api/user/:userId | /api/bank/user/:userId
 * 
 * @param {request} req Incoming request, parameter with userId.
 * @param {Response} res Outgoing response.
 */
exports.getUser = function(req, res){
    let user = Number(req.params.userId);

    User.getUser(user).then(value => {
        res.send(value).status(200);
    }).catch(err => {
        res.sendStatus(500);
    });
};

/**
 * Endpoint for deleting a BankUser based on UserId.
 * Endpoint: /api/user/:userId | /api/bank/user/:userId
 * 
 * @param {request} req Incoming request, parameter with userId.
 * @param {Response} res Outgoing response.
 */
exports.deleteUser = function(req, res){
    let user = Number(req.params.userId);

    User.deleteUser(user);
    res.sendStatus(200);
};

/**
 * Endpoint for updating a BankUser.
 * Endpoint: /api/user/:userId | /api/bank/user/:userId
 * 
 * @param {request} req Incoming request, parameter with userId, JSON with newUserId.
 * @param {Response} res Outgoing response.
 */
exports.updateUser = function(req, res){
    let userId = Number(req.params.userId);
    let newUserId = Number(req.body.newUserId);
    
    User.updateUser(userId, newUserId); 
    res.sendStatus(200);
};
