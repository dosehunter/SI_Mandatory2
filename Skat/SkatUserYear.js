/*
 * Contains CRUD operations for Skat.SkatUserYear
 *
 * Author: Arvid Larsen
 */
const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('../Skat/Skat.db');

exports.getSkatUserYear = function (userId){
    let queryGetSkatUserYear = "SELECT * FROM SkatUserYear WHERE SkatUserId = ?;"

    return new Promise((resolve, reject) => {
        db.get(queryGetSkatUserYear, [userId], (err, row) => {
            if (err){
                reject(err.message);
            }
            
            resolve(row);
        });
    });
}

exports.updateUser = function(user){
    let queryUpdateUser = "UPDATE SkatUserYear SET(SkatUserId, SkatYearId, UserId, IsPaid, Amount) VALUES (?, ?, ?, ?, ?);";
    
    db.run(queryUpdateUser, [user.SkatUserId, user.SkatYearId, user.UserId, user.IsPaid, user.Amount], (err) => {
        console.log(err);
    })
}
