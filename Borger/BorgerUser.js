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
    db.run(quertyDeleteUser, [userId], (err) => {
        if (err){
            return console.log(err.message);
        }

        console.log("User removed");
    });
}

exports.setUserList = function(userid)
{
    userList.push({"userid": userid});
    
    for(i = 1; i < userList.length; i++)
    {
        if(userList[i].userid == userid)
        {
            var text = userid;
            
            fs.appendFile('user_list.txt', text + "\n", function (err) {
                if (err) throw err;
                //console.log('Saved!');
            });
        }
    }
}

exports.getUserListIndex = function(index)
{
    fs.readFile('user_list.txt', 'utf-8', (err, data) => { 
    if (err) throw err; 

    var lines = data.split('\n');
    for(var line = 0; line < lines.length; line++){
      //console.log(lines[line]);
      userList[line] = lines[line];
      //console.log(addressList[line]);
    }
    });

    return userList[index].userid;
}

exports.getUserList = function()
{
    fs.readFile('user_list.txt', 'utf-8', (err, data) => { 
        if (err) throw err; 
    
        var lines = data.split('\n');
        for(var line = 0; line < lines.length; line++){
          userList[line] = lines[line];
        }
    });
    
    return userList;
}