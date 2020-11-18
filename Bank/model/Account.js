/*
 * Contains CRUD operations for Bank.Account
 *
 * Author: Arvid Larsen
 */
const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('../Bank/Bank.db');

exports.createAccount = function(bankUserId, isStudent, interestRate, amount){
    let queryCreateAccount = "INSERT INTO Account (BankUserId, AccountNo, IsStudent, CreatedAt, InterestRate, Amount) VALUES(?, ?, ?, ?, ?, ?)"
    let creationDate = new Date().toISOString();
    let accountNo = Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000);

    if (interestRate == 0)
        interestRate = 0.2;

    db.run(queryCreateAccount, [bankUserId, accountNo, isStudent, creationDate, interestRate, amount], (err) => {
        if (err)
            return console.log(err.message);
        
        console.log("Account added!");
    })
}

exports.getAccount = function GetAccount(accountNo){
    return new Promise((resolve, reject) => {
        let queryFindAccount = "SELECT * FROM Account WHERE AccountNo = ?";
        db.get(queryFindAccount, [accountNo], (err, row) => {
            if (err)
                reject(false);
            
            if (row){
                resolve(row);
            } else {
                reject(false);
            }
        });
    });
}

exports.getUserAccount = function (bankUserId){
    return new Promise((resolve, reject) => {
        let queryFindAccount = "SELECT * FROM Account WHERE BankUserId = ?;";
        db.get(queryFindAccount, [bankUserId], (err, row) => {
            if (err || !row)
                reject(false);
            
            if (row)
                resolve(row);
        });
    });
}

// Yea... What's the easy way to do this? So that it only updates new/not null values
exports.updateAccount = function(accountNo, newAccountNo, bankUserId, isStudent, interestRate, amount){
    let modifiedDate = new Date().toISOString();
    let queryUpdateAccount = "UPDATE Account SET BankUserId = ?, AccountNo = ?, IsStudent = ?, ModifiedAt = ?, InterestRate = ?, Amount = ? WHERE AccountNo= ?";

    db.run(queryUpdateAccount, [bankUserId, newAccountNo, isStudent, modifiedDate, interestRate, amount, accountNo], (err) => {
        if (err){
            return console.log(err.message);
        }
        console.log("Account updated");
    });
}

exports.updateAmount = function(bankUserId, amount){
    let modifiedDate = new Date().toISOString();
    let queryUpdateAccount = "UPDATE Account SET ModifiedAt = ?, Amount = Amount + ? WHERE BankUserId = ?";

    db.run(queryUpdateAccount, [modifiedDate, amount, bankUserId], (err) => {
        if (err){
            return console.log(err.message);
        }
        console.log("Account amount updated");
    });
}

exports.deleteAccount = function DeleteAccount(accountNo){
    let quertyDeleteAccount = "DELETE FROM Account WHERE AccountNo = ?";
    db.run(quertyDeleteAccount, [accountNo], (err) => {
        if (err){
            return console.log(err.message);
        }

        console.log("Account removed");
    });
}

