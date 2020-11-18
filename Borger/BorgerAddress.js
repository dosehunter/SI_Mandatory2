const sqlite3 = require('sqlite3');

var fs = require('fs');
var db = new sqlite3.Database('../Borger/user_address_database.sqlite');
let addressList = [{}];

exports.createAddress = function (userId, address){
    let queryCreateAddress = "INSERT INTO Address (BorgerUserId, Address, CreatedAt, IsValid) VALUES(?, ?, ?, ?)"
    let queryCheckUser = "SELECT * FROM BorgerUser WHERE UserId = ?"
    let queryCheckAddress = "SELECT * FROM Address WHERE BorgerUserId = ? ORDER BY Id DESC LIMIT 1"
    let querySetActiveFalse = "UPDATE Address SET IsValid = 0 WHERE Id = ?"
    let creationDate = new Date().toISOString();
    let isValid = true;

    db.get(queryCheckUser, [userId], (err) => {
        if (err){
            return console.log(err.message);
        }
        console.log("User found!")

        db.get(queryCheckAddress, [userId], (err, row) => {
            if (err){
                return console.log(err.message);
            }
            console.log("Old address found!")

            let id;

            if (typeof(row) != "undefined")
            {
                id = row.Id;

                db.run(querySetActiveFalse, [id], (err) => {
                    if (err){
                        return console.log(err.message);
                    }
                    console.log("Address is set to inactive!")
                });
            }
        });

        db.run(queryCreateAddress, [userId, address, creationDate, isValid], (err) => {
            if (err){
                return console.log(err.message);
            }
            console.log("Row added!")
        });
    });
}

exports.getAddress = function (userId){
    return new Promise((resolve, reject) => {
        let queryFindAddress = "SELECT * FROM Address WHERE BorgerUserId = ?";
        db.get(queryFindAddress, [userId], (err, row) => {
            if (row){
                resolve(row);
            } else {
                reject(false);
            }
        });
    });
}

exports.updateAddress = function (Id, address, userId){
    let modifiedDate = new Date().toISOString();
    let queryUpdateUser = "UPDATE Address SET Address = ?, CreatedAt = ?, IsValid = ? WHERE Id = ?";
    let isValid = true;

    db.run(queryUpdateUser, [address, modifiedDate, isValid, Id], (err) => {
        if (err){
            return console.log(err.message);
        }
        console.log("Address updated");
        setValid(Id, userId);
    });
}

function setValid(Id, userid){
    let queryGetAddresses = "SELECT * FROM Address WHERE BorgerUserId = ?;";
    let querySetValid = "UPDATE Address SET IsValid = 0 WHERE Id = ?;";
 
    db.all(queryGetAddresses, [userid], (err, rows) => {
        if (err){
            return console.log(err.message);
        }
 
        console.log("Got all addresses")
        rows.forEach(row => {
            if(row.Id != Id){
                db.run(querySetValid, [row.Id], (err) => {
                    if (err){
                        return console.log(err.message);
                    }
                    console.log("Address is inactive");
                })
            }
        })
    })
}

exports.deleteAddress = function(Id){
    let quertyDeleteAddress = "DELETE FROM Address WHERE Id = ?";
    db.run(quertyDeleteAddress, [Id], (err) => {
        if (err){
            return console.log(err.message);
        }

        console.log("Address removed");
    });
}




