
/*
 * Contains CRUD operations for Bank.Loan
 *
 * Author: Arvid Larsen
 */
const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('../Bank/Bank.db');


exports.getUserLoans = function CreateAccount(userId){
    let queryGetLoans = "SELECT * FROM Loan WHERE UserId = ?"

    return new Promise((resolve, reject) => {
        db.all(queryGetLoans, [userId], (err, rows) => {
            if (err || !rows)
                reject(err.message);
            
            var list = [];

            rows.forEach(row => {
                list.push(row);
            })
            resolve(list);
        });
    });
}
