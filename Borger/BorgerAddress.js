//Author: Jack Zhong

//Description:
//Database connection and functionalities for "Address" - table 


const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('../Borger/user_address_database.sqlite');

//Function for creating address in database. The function checks for existing borger
//, then it checks for addresses correspondant to the existing borger and setting
//the previous old address to be inactive. After that, it creates the address for the borger  

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

//Function for getting address in database

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

//Function for updating address in database. It sets the new updated address
//to be active and all the old addresses to be inactive with the "setValid" - function

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

//Function for deleting address in the database

exports.deleteAddress = function(Id){
    let quertyDeleteAddress = "DELETE FROM Address WHERE Id = ?";
    db.run(quertyDeleteAddress, [Id], (err) => {
        if (err){
            return console.log(err.message);
        }

        console.log("Address removed");
    });
}




