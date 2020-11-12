
/*
 * Contains CRUD operations for Bank.Loan
 *
 * Author: Arvid Larsen
 */
const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('../Bank/Bank.db');

exports.getLoan = function(loanId){
    let queryGetLoan = "SELECT * FROM Loan WHERE Id = ?"
    
    return new Promise((resolve, reject) => {
        db.get(queryGetLoan, [loanId], (err, row) => {
            if (err || !row){
                reject(err);
            }

            resolve(row);
        });
    });
}

exports.getUserLoans = function(userId){
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

exports.createLoan = function(userId, amount){
    let queryCreateLoan = "INSERT INTO Loan (UserId, CreatedAt, Amount) VALUES(?, ?, ?);";
    let creationDate = new Date().toISOString();

    db.run(queryCreateLoan, [userId, creationDate, amount], err => {
        if (err)
            return console.log(err.message);
    });
}

exports.resolveLoan = function(loanId){
    let queryResolveLoan = "UPDATE Loan SET ModifiedAt = ?, Amount = ? WHERE Id = ?;"
    let modifiedAt = new Date().toISOString();

    db.run(queryResolveLoan, [modifiedAt, 0, loanId], err => {
        if (err) 
            return console.log(err.message);
    });
}