/*
 * Responsible for all routes related to Skat.SkatUser
 * 
 * Author: Arvid Larsen
 */
const SkatUser = require('../Model/SkatUser.js');

//app.get("/getUser/:id", (req, res) => {
exports.getSkatUser = function(req, res){
    let id = req.params.id;

    SkatUser.getSkatUser(id).then(row => {
        res.send(row).status(200);
    });
};


