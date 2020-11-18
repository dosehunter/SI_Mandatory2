/*
 * Contains CRUD operations for Skat.SkatUserYear
 *
 * Author: Arvid Larsen
 */
const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('../Skat/Skat.db');

/**
 * Retreives a SkatUserYear based on Id.
 * 
 * @param {Integer} id Id of SkatUserYear to get.
 */
exports.getSkatUserYear = function (id){
    let queryGetSkatUserYear = "SELECT * FROM SkatUserYear WHERE Id = ?;"

    return new Promise((resolve, reject) => {
        db.get(queryGetSkatUserYear, [id], (err, row) => {
            if (err){
                reject(err.message);
            }
            
            resolve(row);
        });
    });
}

/**
 * Retrieves a SkatUserYear based on UserId.
 * 
 * @param {Integer} userId UserId of skatUserYear to get.
 */
exports.getSkatUserYearUserId = function (userId){
    let queryGetSkatUserYear = "SELECT * FROM SkatUserYear WHERE UserId = ?;"
    
    return new Promise((resolve, reject) => {
        db.get(queryGetSkatUserYear, [userId], (err, row) => {
            if (err){
                reject(err.message);
            }
            
            resolve(row);
        });
    });
}

/**
 * Responsible for creating a new SkatUserYear.
 * 
 * @param {Integer} skatUserId SkatUserId to insert.
 * @param {Integer} skatYearId SkatYearId related to this SkatUserId.
 * @param {Integer} userId User Id related.
 * @param {Integer} isPaid Boolean(0/1) wether paid or not.
 * @param {Float} amount Amount to be paid to skat?.
 */
exports.createSkatUserYear = function(skatUserId, skatYearId, userId, isPaid, amount){
    let queryCreate = "INSERT INTO SkatUserYear (SkatUserId, SkatYearId, UserId, IsPaid, Amount) VALUES(?, ?, ?, ?, ?);"

    db.run(queryCreate, [skatUserId, skatYearId, userId, isPaid, amount], (err) => {
        console.log("Hmm... An actual error message would probably be nice ...?");
    })
}

/**
 * Updates a SkatUserYear based on Id.
 * 
 * @param {Integer} skatUserYear SkatUserYear object to be updated.
 */
exports.updateSkatUserYear = function(skatUserYear){
    let queryUpdateUserYear = "UPDATE SkatUserYear SET SkatUserId = ?, SkatYearId = ?, UserId = ?, IsPaid = ?, Amount = ? WHERE Id = ?;";
    
    db.run(queryUpdateUserYear, [skatUserYear.SkatUserId, skatUserYear.SkatYearId, skatUserYear.UserId, skatUserYear.IsPaid, skatUserYear.Amount, skatUserYear.Id], (err) => {
        console.log(err);
    })
}

/**
 * Deletes a record based on Id.
 * 
 * @param {Integer} id Id to delete.
 */
exports.deleteSkatUserYear = function(id){
    let queryDeleteSkatUserYear = "DELETE FROM SkatUserYear WHERE Id = ?";
    db.run(queryDeleteSkatUserYear, [id], err => {
        console.log(err.toString());
    });
}
