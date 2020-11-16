/*
 * Responsible for ... Not much
 * 
 * Author: Arvid Larsen
 */
const port = 8101;
const express = require('express');
const Account = require('./model/Account');
const Loan = require('./model/Loan');

const catalogue = require('./routes/catalogue.js');

var app = express();
app.use(express.json());

app.use('/api/bank', catalogue);

/*
#############################################################################
#####################    FOR TEMPORARY TESTING ONLY!    ##################### 
 */
//#region 

app.get("/test-get-loans/:user", (req, res) => {
    let user = Number(req.params.user);

    Loan.getUserLoans(user).then(list => {
        //list.forEach(loans => {
        //    console.log(loans);
        //});
        res.send(list).status(200);
    }).catch(err => {
        res.sendStatus(500);
    });
})
//#endregion
/*
#####################    END OF TEMPORARY TESTING!    ####################### 
############################################################################# 
*/

app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Listening on port " + port);
        console.log("Bank system is running...");
    }
});
