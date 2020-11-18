const port = 5004;
const express = require('express');
const User = require('./BorgerUser');
const axios = require('axios');

var app = express();

app.use(express.json());

app.get("/api/borger/:UserId", (req, res) => {
    let userId = req.params.UserId.toString();
    
    User.getUser(userId).then(list => {
        res.send(list).status(200);
    }).catch(err => {
        res.sendStatus(404);
    });
});

app.post("/api/borger/add-borger", (req, res) =>{
    let userId = req.body.UserId.toString();
    
    axios.post("http://localhost:5005/api/borger/new-borger", {"userId": userId}).then(response =>{
        User.setUserList(userId);
        User.createUser(userId);
        return res.status(200).send({"User has been added": userId});     
    }).catch(err =>{
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
    });
});

app.post("/api/borger/update-borger/:UserId", (req, res) =>{
    let newUserId = req.body.UserId.toString();
    let userId = req.params.UserId.toString();

    axios.post("http://localhost:5005/api/borger/updated-borger", {"userId": newUserId}).then(response =>{
        let checkUser = response.data.checkUser.toString();
        //let checkNewUser = response.data.checkNewUser.toString();
        //console.log(checkUser);
        //console.log(newUserId);
        User.updateUser(checkUser, newUserId);
        return res.status(200).send({"User has been updated": userId});
    }).catch(err =>{
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
    });
});

app.post("/api/borger/delete-borger", (req, res) =>{
    let userId = req.body.UserId.toString();

    axios.post("http://localhost:5005/api/borger/deleted-borger", {"userId": userId}).then(response =>{
        let checkUser = response.data.checkUser.toString();    
        User.deleteUser(checkUser);
        return res.status(200).send({"User has been deleted": userId});
    }).catch(err =>{
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
    });
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