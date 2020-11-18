const port = 6004;
const express = require('express');
const Address = require('./BorgerAddress');
const axios = require('axios');

var app = express();

app.use(express.json());

app.get("/api/borger_address/:UserId", (req, res) => {
    let userId = req.params.UserId.toString();
    
    Address.getAddress(userId).then(list => {
        res.send(list).status(200);
    }).catch(err => {
        res.sendStatus(404);
    });
});

app.post("/api/borger_address/add-address", (req, res) =>{
    let userId = req.body.UserId.toString();
    let address = req.body.Address.toString();
    
    axios.post("http://localhost:6005/api/borger_address/new-address", {"userId": userId, "address": address}).then(response =>{ 

        let checkUser = response.data.checkUser.toString();
        
        Address.createAddress(checkUser, address);
        return res.status(200).send({"Address has been added": userId});     
    }).catch(err =>{
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
    });
});

app.post("/api/borger_address/update-address/:UserId", (req, res) =>{
    let userId = req.params.UserId.toString();
    let address = req.body.Address.toString();

    axios.post("http://localhost:6005/api/borger_address/updated-address", {"address": address}).then(response =>{
        
        let checkUser = response.data.checkUser.toString();

        Address.updateAddress(checkUser, address);
        return res.status(200).send({"User has been updated": userId});
    }).catch(err =>{
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
    });
});

app.post("/api/borger_address/delete-address", (req, res) =>{
    let addressId = req.body.AddressId.toString();

    axios.post("http://localhost:6005/api/borger_address/deleted-address", {"addressId": addressId}).then(response =>{
        
        let checkAddress = response.data.checkAddress.toString();

        Address.deleteAddress(checkAddress);
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
        console.log("Address system is running...");
    }
});