/*
 * Contains CRUD operations for Skat.SkatUser
 *
 * Author: Arvid Larsen
 */
const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('../Skat/Skat.db');

exports.getSkatUser = function(id){
    let queryGetSkatUser = "SELECT * FROM SkatUser WHERE Id = ?;"

    return new Promise((resolve, reject) => {
        db.get(queryGetSkatUser, [id], (err, row) => {
            if (err){
                reject(err.message);
            }
            
            resolve(row);
        });
    });
}

function updateSkatUser(user){
    let queryUpdateUser = "UPDATE SkatUserYear SET(SkatUserId, SkatYearId, UserId, IsPaid, Amount) VALUES (?, ?, ?, ?, ?);";
    
    db.run(queryUpdateUser, [user.SkatUserId, user.SkatYearId, user.UserId, user.IsPaid, user.Amount], (err) => {
        console.log(err);
    })
}
