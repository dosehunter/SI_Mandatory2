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
var skatYear = require('./skat_year');
var taxes = require('./taxes.js');

//#region SKATUSER ROUTES
// GET list of user deposits
router.route('/skat-user/:id')
    .get(skatUser.getSkatUser)
    .put(skatUser.updateSkatUser)
    .delete(skatUser.deleteSkatUserYear);

router.post("/skat-user", skatUser.createSkatUser);
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

//#region TAX ROUTE
router.post('/pay-taxes', taxes.payTaxes);

//#endregion


//#region SKATYEAR ROUTE

router.route('/skat-year/:id')
    .get(skatYear.getSkatYear)
    .delete(skatYear.deleteSkatYear)
    .put(skatYear.updateSkatYear);

router.post("/skat-year", skatYear.createSkatYear);

//#endregion

module.exports = router;
