const port = 5004;
const express = require('express');
const User = require('./BorgerUser');

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
    
        User.createUser(userId);
        return res.status(200).send({"User has been added": userId});     
    });

app.post("/api/borger/update-borger/:UserId", (req, res) =>{
    let newUserId = req.body.UserId.toString();
    let userId = req.params.UserId.toString();

        User.updateUser(userId, newUserId);
        return res.status(200).send({"User has been updated": userId});
    });

app.post("/api/borger/delete-borger", (req, res) =>{
    let userId = req.body.UserId.toString();

    User.deleteUser(userId);
    return res.status(200).send({"User and addresses deleted": userId});
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