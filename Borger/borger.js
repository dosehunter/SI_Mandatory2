const port = 5005;
const express = require('express');
const User = require('./BorgerUser');
const List = require('./testList')

var app = express();

app.use(express.json());

app.post("/api/borger/new-borger", (req, res) => {
    let userId = req.body.userId;

    res.status(200).send({"New user": userId}); 
    //res.status(200).send({message: "User has been added"});
});

app.post("/api/borger/updated-borger", (req, res) => {
    let userId = req.body.userId;
    //let newUserId = req.body.newUserId;
    //List.setAddressList("something", 2);
    console.log(List.getAddressList()[1]);
    for(i = 1; i < User.getUserList().length; i++)
    {
        if(userId == User.getUserListIndex(i))
        {
            //User.getUserList()[i].userId = newUserId;
            res.send({"checkUser": userId/*, "checkNewUser": newUserId*/}).status(200);
        }else
        {
            res.send({"checkUser": 400/*, "checkNewUser": 400*/}).status(400);
        }
    }
   
    //res.status(200).send({"New user": userId}); 
    //res.status(200).send({message: "User has been added"});
});

app.post("/api/borger/deleted-borger", (req, res) => {
    let userId = req.body.userId;

    for(i = 0; i < User.getUserList().length; i++)
    {
        if(userId == User.getUserList()[i].userId)
        {
            User.getUserList().splice(i, 1);
            res.send({"checkUser": userId}).status(200);
        }else
        {
            res.send({"checkUser": 400}).status(400);
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
        console.log("Borger system is running...");
    }
});