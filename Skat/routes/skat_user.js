/*
 * Responsible for all routes related to Skat.SkatUser
 * 
 * Author: Arvid Larsen
 */
//const SkatUser = require('../Model/SkatUser.js');
const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('../Skat/Skat.db');

/**
 * Gets a SkatUser(Skat.SkatUser) based on parameters.
 * Endpoint: /api/skat-user/:id || /api/skat/skat-user/:id
 * @param {Request} req Contains data for server.
 * @param {Response} res Response to client.
 */
exports.getSkatUser = function(req, res){
    let id = req.params.id;

    let queryGetSkatUser = "SELECT * FROM SkatUser WHERE Id = ?;"

    db.get(queryGetSkatUser, [id], (err, row) => {
        if (err){
            res.sendStatus(404);
        }
        
        res.send(row).status(200);
    });
};

/**
 * Updates a SkatUser(Skat.SkatUser) from JSON in request body.
 * Endpoint: /api/skat-user/:id || /api/skat/skat-user/:id
 * @param {Request} req Contains data for server.
 * @param {Response} res Response to client.
 */
exports.updateSkatUser = function(req, res){
    let id = req.params.id;
    let userId = req.body.userId;
    let isActive = req.body.isActive;

    let queryUpdateUser = "UPDATE SkatUser SET UserId = ?, IsActive = ? WHERE Id = ?;";
    
    db.run(queryUpdateUser, [userId, isActive, id], (err) => {
        if (err){
            console.log("SQLITE, skat_user UPDATE ERROR!");
            console.log(err.toString());
            res.sendStatus(500);
            return
        }
        res.sendStatus(200)
    });
}

/**
 * Creates a SkatUser(Skat.SkatUser) from JSON body.
 * Endpoint: /api/skat-user || /api/skat/skat-user
 * @param {Request} req Contains data for server.
 * @param {Response} res Response to client.
 */
exports.createSkatUser = function(req, res){
    let createdAt = new Date();
    let userId = req.body.userId;
    let isActive = req.body.isActive;

    let queryCreate = "INSERT INTO SkatUser (UserId, CreatedAt, IsActive) VALUES(?, ?, ?);"

    db.run(queryCreate, [userId, createdAt, isActive], (err) => {
        if (err){
            console.log("SQLITE, skat_user CREATE ERROR!");
            console.log(err.toString());
            res.sendStatus(500);
            return
        }
        res.sendStatus(200);
    })
}

/**
 * Deletes a SkatUser(Skat.SkatUser) based on id from parameters.
 * Endpoint: /api/skat-user/:id || /api/skat/skat-user/:id
 * @param {Request} req Contains data for server.
 * @param {Response} res Response to client.
 */
exports.deleteSkatUserYear = function(req, res){
    let id = req.params.id;
    
    let queryDeleteSkatUser = "DELETE FROM SkatUser WHERE Id = ?";

    db.run(queryDeleteSkatUser, [id], err => {
        if (err){
            console.log("SQLITE, skat_user DELETE ERROR!");
            console.log(err.toString());
            res.sendStatus(500);
            return
        }
        res.sendStatus(200);
    });
}

