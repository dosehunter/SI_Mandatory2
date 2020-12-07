/*
 * Contains CRUD operations for Bank.Loan
 *
 * Author: Arvid Larsen
 */
const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('../Bank/Bank.db');

/**
 * Gets a Loan record based on Id.
 * 
 * @param {Integer} loanId Id of loan to get.
 */
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

/**
 * Gets all loans related to a Bank User Id.
 * 
 * @param {Integer} bankUserId Bank User Id to all loans of.
 */
exports.getUserLoans = function(bankUserId){
    let queryGetLoans = "SELECT * FROM Loan WHERE BankUserId = ?"

    return new Promise((resolve, reject) => {
        db.all(queryGetLoans, [bankUserId], (err, rows) => {
            if (err || typeof rows === undefined){ // ??? it is not undefined, but it fails .forEach as it is undefined!?
                reject(err.message);
            }
            
            var list = [];

            rows.forEach(row => {
                list.push(row);
            })
            resolve(list);
        });
    });
}

/**
 * Responsible for creating a new loan.
 * 
 * @param {Integer} bankUserId BankUser.Id related to loan.
 * @param {Float} amount How much was loaned.
 */
exports.createLoan = function(bankUserId, amount){
    return new Promise((resolve, reject) => {
        let queryCreateLoan = "INSERT INTO Loan (BankUserId, CreatedAt, Amount) VALUES(?, ?, ?);";
        let creationDate = new Date().toISOString();
    
        db.run(queryCreateLoan, [bankUserId, creationDate, amount], function(err) {
            if (err || this.changes == 0){
                console.log(err);
                reject(false);
            }

            resolve(this.lastID);
        });
    });
}

/**
 * Responsible for resolving loans.
 * 
 * @param {Integer} loanId Id of loan to resolve.
 */
exports.resolveLoan = function(loanId){
    return new Promise ((resolve, reject) => {
        let queryResolveLoan = "UPDATE Loan SET ModifiedAt = ?, Amount = ? WHERE Id = ?;"
        let modifiedAt = new Date().toISOString();
    
        db.run(queryResolveLoan, [modifiedAt, 0, loanId], function(err) {
            if (err || this.changes == 0) {
                console.log(err.message);
                reject(false);
            }
            resolve(true);
        });
    });
}