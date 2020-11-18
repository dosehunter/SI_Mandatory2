const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('../Bank/Bank.db');

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

exports.updateUser = function (userId, newUserId){
    let modifiedDate = new Date().toISOString();
    let queryUpdateUser = "UPDATE BankUser SET UserId = ?, ModifiedAt = ? WHERE UserId = ?";

    db.run(queryUpdateUser, [newUserId, modifiedDate, userId], (err) => {
        if (err){
            return console.log(err.message);
        }
    });
}

exports.deleteUser = function(userId){
    let quertyDeleteUser = "DELETE FROM BankUser WHERE UserId = ?";
    db.run(quertyDeleteUser, [userId], (err) => {
        if (err){
            return console.log(err.message);
        }

        console.log("User removed");
    });
}