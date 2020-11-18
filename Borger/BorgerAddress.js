const sqlite3 = require('sqlite3');

var fs = require('fs');
var db = new sqlite3.Database('../Borger/user_address_database.sqlite');
let addressList = [{}];

exports.createAddress = function (userId, address){
    let queryCreateAddress = "INSERT INTO Address (BorgerUserId, Address, CreatedAt, IsValid) VALUES(?, ?, ?, ?)"
    let creationDate = new Date().toISOString();
    let isValid = true;

    db.run(queryCreateAddress, [userId, address, creationDate, isValid], (err) => {
        if (err){
            return console.log(err.message);
        }
        console.log("Row added!")
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

exports.updateAddress = function (userId, address){
    let modifiedDate = new Date().toISOString();
    let queryUpdateUser = "UPDATE Address SET Address = ?, CreatedAt = ?, IsValid = ? WHERE BorgerUserId = ?";
    let isValid = true;

    db.run(queryUpdateUser, [address, modifiedDate, isValid, userId], (err) => {
        if (err){
            return console.log(err.message);
        }
        console.log("Address updated");
    });
}

exports.deleteAddress = function(userId){
    let quertyDeleteAddress = "DELETE FROM Address WHERE BorgerUserId = ?";
    db.run(quertyDeleteAddress, [userId], (err) => {
        if (err){
            return console.log(err.message);
        }

        console.log("Address removed");
    });
}

exports.setAddressList = function(userid, addressid)
{
    addressList.push({"userid": userid, "addressid": addressid});
    
    for(i = 1; i < addressList.length; i++)
    {
        if(addressList[i].userid == userid && addressList[i].addressid == addressid)
        {
            var text = userid + addressid;
            
            fs.appendFile('address_list.txt', text + "\n", function (err) {
                if (err) throw err;
                //console.log('Saved!');
            });
        }
    }
}
/*exports.getAddressListIndex = function(index)
{
    return addressList[index].userid + " " + addressList[index].addressid;
}*/

exports.getAddressList = function()
{
    fs.readFile('address_list.txt', 'utf-8', (err, data) => { 
        if (err) throw err; 
    
        var lines = data.split('\n');
        for(var line = 0; line < lines.length; line++){
          addressList[line] = lines[line];
        }
    });

    return addressList;
}



