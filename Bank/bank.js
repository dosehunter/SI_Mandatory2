/**
 * Responsible for ... Not much
 * 
 * Author: Arvid Larsen
 */
const port = 8101;
const express = require('express');
const sqlite3 = require('sqlite3');

var app = express();
var db = new sqlite3.Database('../NemID_ESB/nem_id_database.sqlite');

app.use(express.json());


app.post('/user-deposit', (req, res) =>{
    let amount = req.body.amount.toString();
    if (!amount || amount < 0){
        console.log("What the hell dude?")
        res.sendStatus(403);
    }
    
    let queryFindUser = "SELECT * FROM user WHERE NemID = ? AND Password = ?"

    // Retreive user from database
    db.get(queryFindUser, [nemId, password], (err, row) => {
        if (row){
            rand_code = "";
            for(i = 0; i < 6; i++)
                rand_code += Math.floor(Math.random() * Math.floor(10)).toString();
            
            res.status(200).send({generatedCode: rand_code});
        }else 
            res.sendStatus(403);
        if(err){
            console.log(err);
        }
    });
});

app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Listening on port " + port);
        console.log("Auth/Code generator is running...");
    }
});