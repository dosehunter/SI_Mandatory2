/*
 * Responsible for all routes related to Skat.SkatUserYear.
 * 
 * Author: Arvid Larsen
 */

const SkatUserYear = require('../Model/SkatUserYear.js');

/**
 * Retrieves a SkatUserYear based of Id.
 * Endpoint: /api/skatUserYear/:id || /api/skat/skatUserYear/:id
 * 
 * @param {Request} req Contains data for server, parameter: Id.
 * @param {Response} res Response to client.
 */
exports.getSkatUserYear = function(req, res){
    let id = req.params.id;

    SkatUserYear.getSkatUserYear(id).then(row => {
        res.send(row).status(200);
    });
}

/**
 * Creates a SkatUserYear.
 * Endpoint: /api/skatUserYear || /api/skat/skatUserYear
 * 
 * @param {Request} req Contains data for server, JSON: skatUserId, skatYearId, userId, isPaid, amount.
 * @param {Response} res Response to client.
 */
exports.createSkatUser = function(req, res){
    let skatUserId = Number(req.body.skatUserId);
    let skatYearId = Number(req.body.skatYearId);
    let userId = Number(req.body.userId);
    let isPaid = Number(req.body.isPaid);
    let amount = Number(req.body.amount);

    SkatUserYear.createSkatUserYear(skatUserId, skatYearId, userId, isPaid, amount);
    res.sendStatus(200);
}

/**
 * Deletes a SkatUserYear based on Id.
 * Endpoint: /api/skatUserYear/:id || /api/skat/skatUserYear/:id
 * 
 * @param {Request} req Contains data for server, parameter: Id.
 * @param {Response} res Response to client.
 */
exports.deleteSkatUserYear = function(req, res){
    let id = req.params.id;

    SkatUserYear.deleteSkatUserYear(id);
    res.sendStatus(200); // ZERO validation given, just following orders
}

/**
 * Updates a SkatUserYear based on JSON object.
 * Endpoint: /api/skatUserYear/:id || /api/skat/skatUserYear/:id
 * 
 * @param {Request} req Contains data for server, JSON object of SkatUserYear to update.
 * @param {Response} res Response to client.
 */
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
