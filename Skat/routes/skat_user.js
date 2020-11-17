/*
 * Responsible for all routes related to Skat.SkatUser
 * 
 * Author: Arvid Larsen
 */
//const SkatUser = require('../Model/SkatUser.js');
const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('../Skat/Skat.db');

// /api/skat/skat-user/:id
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

// /api/skat/skat-user/:id
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

// /api/skat/skat-user
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

// /api/skat/skat-user/:id
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

