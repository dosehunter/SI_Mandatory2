/*
 * Responsible for defining all routes related to skat system
 * I think the CRUD operations should have been endpoints
 * 
 * Author: Arvid Larsen
*/
const express = require('express');
var router = express.Router();

var skatUser = require('./skat_user.js');
var skatUserYear = require('./skat_user_year.js');

//#region SKATUSER ROUTES
// GET list of user deposits
router.route('/skatUser/:id')
    .get(skatUser.getSkatUser);

//#endregion


//#region SKATUSERYEAR ROUTES
// GET list of user deposits
router.route('/skatUserYear/:id')
    .get(skatUserYear.getSkatUserYear)
    .delete(skatUserYear.deleteSkatUserYear)
    .put(skatUserYear.updateSkatUserYear);

router.route('/skatUserYear')
    .post(skatUserYear.createSkatUser);
//#endregion


module.exports = router;
