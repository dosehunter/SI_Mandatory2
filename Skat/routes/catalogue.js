/*
 * Responsible for defining all routes related to skat system.
 * I think the CRUD operations should have been endpoints like done with skat_user.
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
// GET, DELETE, and PUT for getting, deleting, or updating a SkatUser based on Id.
router.route('/skat-user/:id')
    .get(skatUser.getSkatUser)
    .put(skatUser.updateSkatUser)
    .delete(skatUser.deleteSkatUserYear);

// POST for creating a new SkatUser.
router.post("/skat-user", skatUser.createSkatUser);
//#endregion


//#region SKATUSERYEAR ROUTES
// GET, DELETE, and PUT for getting, deleting, or updating a SkatUserYear based on Id.
router.route('/skatUserYear/:id')
    .get(skatUserYear.getSkatUserYear)
    .delete(skatUserYear.deleteSkatUserYear)
    .put(skatUserYear.updateSkatUserYear);

// Post for creating a new SkatUserYear.
router.route('/skatUserYear')
    .post(skatUserYear.createSkatUser);
//#endregion

//#region TAX ROUTE
// POST for paying taxes.
// taxes.payTaxes -> getSkatUserYear -> Skat_Tax_calculator -> SkatUserYear.updateSkatUserYear -> Bank.pay_userId_taxes -> getAcc -> Bank.withdrawl_money
router.post('/pay-taxes', taxes.payTaxes);

//#endregion


//#region SKATYEAR ROUTE
// GET, DELETE, and PUT for getting, deleting, or updating a SkatYear based on Id.
router.route('/skat-year/:id')
    .get(skatYear.getSkatYear)
    .delete(skatYear.deleteSkatYear)
    .put(skatYear.updateSkatYear);

// POST for creating a SkatYear.
router.post("/skat-year", skatYear.createSkatYear);

//#endregion

// Export all routes.
module.exports = router;
