const sqlite3 = require('sqlite3');

var fs = require('fs');
var db = new sqlite3.Database('../Borger/user_address_database.sqlite');
let userList = [{}];

exports.createUser = function (userId){
    let queryCreateUser = "INSERT INTO BorgerUser (UserId, CreatedAt) VALUES(?, ?)"
    let creationDate = new Date().toISOString();

    db.run(queryCreateUser, [userId, creationDate], (err) => {
        if (err){
            return console.log(err.message);
        }
        console.log("Row added!")
    })
}

exports.getUser = function (userId){
    return new Promise((resolve, reject) => {
        let queryFindUser = "SELECT * FROM BorgerUser WHERE UserId = ?";
        db.get(queryFindUser, [userId], (err, row) => {
            if (row){
                resolve(row);
            } else {
                reject(false);
            }
        });
    });
}

exports.updateUser = function (userId, newUserId){
    let modifiedDate = new Date().toISOString();
    let queryUpdateUser = "UPDATE BorgerUser SET UserId = ?, CreatedAt = ? WHERE UserId = ?";

    db.run(queryUpdateUser, [newUserId, modifiedDate, userId], (err) => {
        if (err){
            return console.log(err.message);
        }
        console.log("User updated");
    });
}

exports.deleteUser = function(userId){
    let quertyDeleteUser = "DELETE FROM BorgerUser WHERE UserId = ?";
    let queryDeleteAddress = "DELETE FROM Address WHERE BorgerUserId = ?";
    
    db.run(quertyDeleteUser, [userId], (err) => {
        if (err){
            return console.log(err.message);
        }

        console.log("User removed");

        db.run(queryDeleteAddress, [userId], (err) => {
            if (err){
                return console.log(err.message);
            }
    
            console.log("Addresses removed");
    
            
        });
    });
}