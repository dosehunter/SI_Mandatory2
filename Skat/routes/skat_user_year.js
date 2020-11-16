/*
 * Responsible for all routes related to Skat.SkatUserYear
 * 
 * Author: Arvid Larsen
 */

const SkatUserYear = require('../Model/SkatUserYear.js');

//app.get("/getUser/:id", (req, res) => {
exports.getSkatUserYear = function(req, res){
    let id = req.params.id;

    SkatUserYear.getSkatUserYear(id).then(row => {
        res.send(row).status(200);
    });
}

exports.createSkatUser = function(req, res){
    let skatUserId = Number(req.body.skatUserId);
    let skatYearId = Number(req.body.skatYearId);
    let userId = Number(req.body.userId);
    let isPaid = Number(req.body.isPaid);
    let amount = Number(req.body.amount);

    SkatUserYear.createSkatUserYear(skatUserId, skatYearId, userId, isPaid, amount);
    res.sendStatus(200);
}

exports.deleteSkatUserYear = function(req, res){
    let id = req.params.id;

    SkatUserYear.deleteSkatUserYear(id);
    res.sendStatus(200); // ZERO validation given, just following orders
}

exports.updateSkatUserYear = function(req, res){
    // Or just expect to get a json object with all of that instead?
    // Like let skatUserYear = req.body.skatUserYear;
    let skatUserYear = {
        "id": req.params.id,
        "skatUserId": req.body.skatUserId,
        "skatYearId":req.body.skatYearId,
        "userId":req.body.userId,
        "isPaid":req.body.isPaid,
        "amount":req.body.amount
    };
    SkatUserYear.updateSkatUserYear(skatUserYear);
    res.sendStatus(200);
}
