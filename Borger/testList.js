let addressList = [{}];

//addressList.push({"userid": 2, "addressid": 4});

//var text = JSON.stringify(addressList[1].addressid).replace(/[{}]/g, '');
/*
var fs = require('fs');

fs.appendFile('testFile.txt', text + "\n", function (err) {
  if (err) throw err;
  //console.log('Saved!');
});


fs.readFile('testFile.txt', 'utf-8', (err, data) => { 
    if (err) throw err; 

    var lines = data.split('\n');
    for(var line = 0; line < lines.length; line++){
      //console.log(lines[line]);
    }
}) */
var fs = require('fs');
exports.setAddressList = function(userid, addressid)
{
    addressList.push({"userid": userid, "addressid": addressid});

    for(i = 1; i < addressList.length; i++)
    {
        if(addressList[i].userid == userid && addressList[i].addressid == addressid)
        {
            var text = userid + addressid;

            fs.appendFile('testFile.txt', text + "\n", function (err) {
              if (err) throw err;
              //console.log('Saved!');
            });
        }
    }
}
/*exports.getAddressListIndex = function(index)
{
    fs.readFile('testFile.txt', 'utf-8', (err, data) => { 
    if (err) throw err; 

    var lines = data.split('\n');
    for(var line = 0; line < lines.length; line++){
      //console.log(lines[line]);
      addressList[line] = lines[line];
      //console.log(addressList[line]);
    }
    });

    return addressList[index].userid + " " + addressList[index].addressid;
}*/

exports.getAddressList = function()
{
  fs.readFile('testFile.txt', 'utf-8', (err, data) => { 
    if (err) throw err; 

    var lines = data.split('\n');
    for(var line = 0; line < lines.length; line++){
      //console.log(lines[line]);
      addressList[line] = lines[line];
    }
  });

    return addressList;
}

//console.log(text);

