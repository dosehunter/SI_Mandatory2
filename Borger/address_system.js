//Author: Jack Zhong

//Description:  
//Endpoints for CRUD functionalities in Address  


const port = 6004;
const express = require('express');
const Address = require('./BorgerAddress');

var app = express();

app.use(express.json());

//Getting address by userid 

app.get("/api/borger_address/:UserId", (req, res) => {
    let userId = req.params.UserId.toString();
    
    Address.getAddress(userId).then(list => {
        res.send(list).status(200);
    }).catch(err => {
        res.sendStatus(404);
    });
});

//Creating address by passing a userid and an andress

app.post("/api/borger_address/add-address", (req, res) =>{
    let userId = req.body.UserId.toString();
    let address = req.body.Address.toString();
        
    Address.createAddress(userId, address);
    return res.status(200).send({"Address has been added to the user": userId});     
    });

//Updating address by address id and passing userid along with new address

app.post("/api/borger_address/update-address/:Id", (req, res) =>{
    let Id = req.params.Id.toString();
    let address = req.body.Address.toString();
    let userId = req.body.UserId.toString();

    Address.updateAddress(Id, address, userId);
    return res.status(200).send({"Address has been updated": userId});
    });

//Deleted address by address id

app.post("/api/borger_address/delete-address", (req, res) =>{
    let addressId = req.body.Id.toString();

    Address.deleteAddress(addressId);
    return res.status(200).send({"Address has been deleted": addressId});
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