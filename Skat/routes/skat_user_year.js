/*
 * Responsible for all routes related to Skat.SkatUserYear.
 * 
 * Author: Arvid Larsen
 */

const SkatUserYear = require('../Model/SkatUserYear.js');
const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('../Skat/Skat.db');

/**
 * Retrieves a SkatUserYear based of Id.
 * Endpoint: /api/skatUserYear/:id || /api/skat/skatUserYear/:id
 * 
 * @param {Request} req Contains data for server, parameter: Id.
 * @param {Response} res Response to client.
 */
exports.getSkatUserYear = function(req, res){
    let id = req.params.id;

    let queryGetSkatUserYear = "SELECT * FROM SkatUserYear WHERE Id = ?;"
    
    db.get(queryGetSkatUserYear, [id], (err, row) => {
        if (err){
            console.log(err.message);
            res.sendStatus(500);
            return;
        }
        if (!row){
            res.sendStatus(400);
            return;
        }
        res.send(row);
    });

    //SkatUserYear.getSkatUserYear(id).then(row => {
    //    res.send(row).status(200);
    //});
}

/**
 * Creates a SkatUserYear.
 * Endpoint: /api/skatUserYear || /api/skat/skatUserYear
 * 
 * @param {Request} req Contains data for server, JSON: skatUserId, skatYearId, userId, isPaid, amount.
 * @param {Response} res Response to client.
 */
exports.createSkatUser = function(req, res){
    let skatUserId = Number(req.body.skatUserId);
    let skatYearId = Number(req.body.skatYearId);
    let userId = Number(req.body.userId);
    let isPaid = Number(req.body.isPaid);
    let amount = Number(req.body.amount);

    let queryCreate = "INSERT INTO SkatUserYear (SkatUserId, SkatYearId, UserId, IsPaid, Amount) VALUES(?, ?, ?, ?, ?);"

    db.run(queryCreate, [skatUserId, skatYearId, userId, isPaid, amount], (err) => {
        if (err){
            console.log("Hmm... An actual error message would probably be nice ...?");
            res.sendStatus(500);
            return;
        }
        res.sendStatus(201);
    })

    //SkatUserYear.createSkatUserYear(skatUserId, skatYearId, userId, isPaid, amount);
    //res.sendStatus(201);
}

/**
 * Deletes a SkatUserYear based on Id.
 * Endpoint: /api/skatUserYear/:id || /api/skat/skatUserYear/:id
 * 
 * @param {Request} req Contains data for server, parameter: Id.
 * @param {Response} res Response to client.
 */
exports.deleteSkatUserYear = function(req, res){
    let id = req.params.id;

    let queryDeleteSkatUserYear = "DELETE FROM SkatUserYear WHERE Id = ?";
    db.run(queryDeleteSkatUserYear, [id], err => {
        if (err) {
            console.log(err.toString());
            res.sendStatus(500);
            return;
        }
        res.sendStatus(222);
    });

    //SkatUserYear.deleteSkatUserYear(id);
    //res.sendStatus(204); // ZERO validation given, just following orders
}

/**
 * Updates a SkatUserYear based on JSON object.
 * Endpoint: /api/skatUserYear/:id || /api/skat/skatUserYear/:id
 * 
 * @param {Request} req Contains data for server, JSON object of SkatUserYear to update.
 * @param {Response} res Response to client.
 */
exports.updateSkatUserYear = function(req, res){   
    let id = req.params.id;
    let skatUserId = req.body.skatUserId;
    let skatYearId = req.body.skatYearId;
    let userId = req.body.userId;
    let isPaid = req.body.isPaid;
    let amount = req.body.amount;  

    let queryUpdateUserYear = "UPDATE SkatUserYear SET SkatUserId = ?, SkatYearId = ?, UserId = ?, IsPaid = ?, Amount = ? WHERE Id = ?;";
    
    db.run(queryUpdateUserYear, [skatUserId, skatYearId, userId, isPaid, amount,id], (err) => {
        if (err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.sendStatus(204);
    })
    //SkatUserYear.updateSkatUserYear(skatUserYear);
    //res.sendStatus(204);
}
