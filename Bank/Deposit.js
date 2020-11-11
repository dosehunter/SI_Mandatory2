/*
 * Contains CRUD operations for Bank.Deposit
 *
 * Author: Arvid Larsen
 */
const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('../Bank/Bank.db');


exports.addDeposit = function (userId, amount){
    let queryAddDeposit = "INSERT INTO Deposit(BankUserId, CreatedAt, Amount) VALUES(?, ?);"
    let creationDate = new Date().toISOString();
    
    db.run(queryAddDeposit, [userId, creationDate, amount], (err) => {
        if (err){
            return err.message;
        }
        console.log("Deposit made!")
    });
}
