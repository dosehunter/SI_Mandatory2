/*
 * Contains CRUD operations for Skat.SkatUserYear
 *
 * Author: Arvid Larsen
 */


 const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('../Skat/Skat.db');

// /api/skat-year/:id
exports.getSkatYear = function (req, res){
    let queryGetSkatYear = "SELECT * FROM SkatYear WHERE Id = ?;"
    let id = req.params.id;

    db.get(queryGetSkatYear, [id], (err, row) => {
        if (err){
            res.send(500);
            return;
        }
        
        res.send(row).status(200);
    });
}

// /api/skat-year
exports.createSkatYear = function(req, res){
    let queryCreateSkatYear = "INSERT INTO SkatYear (Label, CreatedAt, StartDate, EndDate) VALUES(?, ?, ?, ?);"
    let label = req.body.label;
    let createdAt = new Date().toISOString();
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;


    db.run(queryCreateSkatYear, [label, createdAt, startDate, endDate], (err) => {
        if (err){
            console.log("SQLITE, skat_user CREATE ERROR!\n", err.toString());
            res.sendStatus(500);
            return
        }
        res.sendStatus(200);
    })
}

// /api/skat-year/:id
exports.updateSkatYear = function(req, res){
    let queryUpdateYear = "UPDATE SkatYear SET Label = ?, ModifiedAt = ?, StartDate = ?, EndDate = ?  WHERE Id = ?;";
    let label = req.body.label;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let modifiedAt = new Date().toISOString();
    let id = req.params.id;

    db.run(queryUpdateYear, [label, modifiedAt, startDate, endDate, id], (err) => {
        if (err){
            console.log("SQLITE, skat_user UPDATE ERROR!\n", err.toString());
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    });
}

// /api/skat-year/:id
exports.deleteSkatYear = function(req, res){
    let queryDeleteSkatYear = "DELETE FROM SkatYear WHERE Id = ?;";
    let id = req.params.id;

    db.run(queryDeleteSkatYear, [id], err => {
        if (err){
            console.log("SQLITE, skat_user DELETE ERROR!\n", err.toString());
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    });
}
