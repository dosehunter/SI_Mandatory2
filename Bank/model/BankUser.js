/*
 * Contains CRUD operations for Bank.BankUser
 *
 * Author: Arvid Larsen
 */
const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('../Bank/Bank.db');

/**
 * Responsible for creating a new (Unique only) BankUser.
 * 
 * @param {Integer} userId User Id of a new Bank user.
 */
exports.createUser = function (userId){
    let queryCreateUser = "INSERT INTO BankUser (UserId, CreatedAt) VALUES(?, ?)"
    let creationDate = new Date().toISOString();
    
    let queryFindUser = "SELECT * FROM BankUser WHERE UserId = ?";
    db.get(queryFindUser, [userId], (err, row) => {
        if(err){
            return console.log("Poor return of an error!");
        }

        if (!row){
            db.run(queryCreateUser, [userId, creationDate], (err) => {
                if (err){
                    return console.log(err.message);
                }
                console.log("Row added!")
            })
        } else {
            return console.log("USER ALREADY EXISTS");
        }
    });
}

/**
 * Responsible for getting a user based on User Id.
 * I want to argue that UserId could easily be Id, as it must be unique?
 * 
 * @param {Integer} userId User ID to get. 
 */
exports.getUser = function intGetUser(userId){
    return new Promise((resolve, reject) => {
        let queryFindUser = "SELECT * FROM BankUser WHERE UserId = ?";
        db.get(queryFindUser, [userId], (err, row) => {
            if (row){
                resolve(row);
            } else {
                reject(false);
            }
        });
    });
}

/**
 * Responsible for updating a user with a new User Id.
 * 
 * @param {Integer} userId User Id of user to update.
 * @param {Integer} newUserId New user Id of the user. 
 */
exports.updateUser = function (userId, newUserId){
    let modifiedDate = new Date().toISOString();
    let queryUpdateUser = "UPDATE BankUser SET UserId = ?, ModifiedAt = ? WHERE UserId = ?";

    db.run(queryUpdateUser, [newUserId, modifiedDate, userId], (err) => {
        if (err){
            return console.log(err.message);
        }
    });
}

/**
 * Deletes a user based on User Id.
 * 
 * @param {Integer} userId User Id of user to delete.
 */
exports.deleteUser = function(userId){
    let quertyDeleteUser = "DELETE FROM BankUser WHERE UserId = ?";
    db.run(quertyDeleteUser, [userId], (err) => {
        if (err){
            return console.log(err.message);
        }

        console.log("User removed");
    });
}