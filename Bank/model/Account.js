/*
 * Contains CRUD operations for Bank.Account
 *
 * Author: Arvid Larsen
 */
const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('../Bank/Bank.db');

/**
 * Responsible for creating a new Account.
 * 
 * @param {Integer} bankUserId The foreign key pointing to BankUser.Id.
 * @param {Integer} isStudent Boolean int (0/1) if user is student.
 * @param {Float} interestRate Interest rate for the account.
 * @param {Float} amount Amount of money tied to account.
 */
exports.createAccount = function(bankUserId, isStudent, interestRate, amount){
    return new Promise((resolve, reject) => {
        let queryCreateAccount = "INSERT INTO Account (BankUserId, AccountNo, IsStudent, CreatedAt, InterestRate, Amount) VALUES(?, ?, ?, ?, ?, ?)"
        let creationDate = new Date().toISOString();
        let accountNo = Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000);

        if (interestRate == 0)
            interestRate = 0.2;

        db.run(queryCreateAccount, [bankUserId, accountNo, isStudent, creationDate, interestRate, amount], function(err){
            if (err)
                reject(err.message);
            
            if (this.changes == 1){
                console.log("Account added!");
                resolve({BankUserId: this.lastID, AccountNo:accountNo, IsStudent:isStudent, CreatedAt:creationDate, InterestRate:interestRate, Amount:amount});
            }else{
                reject("Error in creation process");
            }
        })
    })
}

/**
 * Gets a specific Account from Account Number.
 * 
 * @param {Integer} accountNo Account Number of account
 */
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

/**
 * Gets a specific account from its BankUser.Id.
 * 
 * @param {Integer} bankUserId The foreign key pointing to BankUser.Id.
 */
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


/**
 * Updates an Account based on provided account Number.
 * TODO, this should be based on Id and NOT accountNo
 * 
 * @param {Integer} accountNo Account Number of account to update.
 * @param {Integer} newAccountNo New account number.
 * @param {Integer} bankUserId The foreign key pointing to BankUser.Id.
 * @param {Integer} isStudent Boolean int (0/1) if user is student.
 * @param {Float} interestRate Interest rate for the account.
 * @param {Float} amount Amount of money tied to account.
 */
exports.updateAccount = function(accountNo, newAccountNo, bankUserId, isStudent, interestRate, amount){
    return new Promise((resolve, reject) => {
        let modifiedDate = new Date().toISOString();
        let queryUpdateAccount = "UPDATE Account SET BankUserId = ?, AccountNo = ?, IsStudent = ?, ModifiedAt = ?, InterestRate = ?, Amount = ? WHERE AccountNo= ?";

        db.run(queryUpdateAccount, [bankUserId, newAccountNo, isStudent, modifiedDate, interestRate, amount, accountNo], function(err) {
            if (err || this.changes == 0){
                reject(false);
            } else {
                console.log("Account updated");
                resolve(true);
            }
        });
    })
}

/**
 * Responsible for adding an amount to an Account based on BankUserId
 * TODO, again, should be based on ID.
 * 
 * @param {Integer} bankUserId The foreign key pointing to BankUser.Id.
 * @param {Float} amount Amount of money to add to account.
 */
exports.updateAmount = function(bankUserId, amount){
    return new Promise ((resolve, reject) => {
        let modifiedDate = new Date().toISOString();
        let queryUpdateAccount = "UPDATE Account SET ModifiedAt = ?, Amount = Amount + ? WHERE BankUserId = ?";
    
        db.run(queryUpdateAccount, [modifiedDate, amount, bankUserId], function(err) {
            if (err || this.changes == 0){
                console.log(err);
                reject(false);
            }
            console.log("Account amount updated");
            resolve(true);
        });
    });
}

/**
 * Deletes an Account based on Account number.
 * 
 * @param {Integer} accountNo Account number of account to delete.
 */
exports.deleteAccount = function DeleteAccount(accountNo){
    return new Promise((resolve, reject) => {
        let quertyDeleteAccount = "DELETE FROM Account WHERE AccountNo = ?";
        db.run(quertyDeleteAccount, [accountNo], function(err) {
            if (err || this.changes == 0){
                console.log(err);
                reject(false);
            } else {
                console.log("Account removed");
                resolve(true);
            }
        });
    });
}

