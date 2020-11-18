const port = 6005;
const express = require('express');
const Address = require('./BorgerAddress');
const User = require('./BorgerUser');

var app = express();

app.use(express.json());

app.post("/api/borger_address/new-address", (req, res) => {
    let userId = req.body.userId;

    for(i = 0; i < User.getUserList().length; i++)
    {
        if(userId == User.getUserList()[i].userId)
        {
            res.send({"checkUser": userId}).status(200);
        }else
        {
            res.send({"checkUser": 400}).status(400);
        }
    }

    //res.status(200).send({"New user": userId}); 
    //res.status(200).send({message: "User has been added"});
});

app.post("/api/borger/updated-borger", (req, res) => {
    let userId = req.body.userId;

    for(i = 0; i < User.getUserList().length; i++)
    {
        if(userId == User.getUserList()[i].userId)
        {
            res.send({"checkUser": userId}).status(200);
        }else
        {
            res.send({"checkUser": 400}).status(400);
        }
    }
    //res.status(200).send({"New user": userId}); 
    //res.status(200).send({message: "User has been added"});
});

app.post("/api/borger/deleted-borger", (req, res) => {
    let addressId = req.body.addressId;

    for(i = 0; i < Address.getAddressList.length; i++)
    {
        if(addressId == Address.getAddressList()[i].addressId)
        {
            res.send({"checkAddress": addressId}).status(200);
        }else
        {
            res.send({"checkAddress": 400}).status(400);
        }
    }
    //res.status(200).send({"New user": userId}); 
    //res.status(200).send({message: "User has been added"});
});

app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Listening on port " + port);
        console.log("Address system is running...");
    }
});