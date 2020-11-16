/*
 * Responsible for ... Not much
 * 
 * Author: Arvid Larsen
 */
const port = 8101;
const express = require('express');
const Account = require('./model/Account');
const User = require('./model/BankUser');
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
app.post("/test-add", (req, res) => {
    let userId = Number(req.body.userId);

    User.createUser(userId);
    res.sendStatus(200);
});
app.get("/test-read/:user", (req, res) => {
    let user = Number(req.params.user);

    User.getUser(user).then(value => {
        res.send(value).status(200);
    }).catch(err => {
        res.sendStatus(500);
    });
});
app.delete("/test-remove/:user", (req, res) => {
    let user = Number(req.params.user);

    User.deleteUser(user);
    res.sendStatus(200);
});
app.get("/test-update", (req, res) => {
    User.updateUser(1233312, 99999);
    res.sendStatus(200);
});

app.post("/test-create-acc", (req, res) => {
    let userId = Number(req.body.userId);
    let isStudent = Number(req.body.isStudent);
    let interestRate = Number(req.body.interestRate);
    let amount = Number(req.body.amount);

    Account.createAccount(userId, isStudent, interestRate, amount);
    res.sendStatus(200);
});

app.get("/test-get-acc/:account", (req, res) => {
    let account = Number(req.params.account);

    Account.getAccount(account).then(account => {
        res.send(account).status(200);
    }).catch(err => {
        res.sendStatus(500);
    })
});
app.patch("/test-update-acc", (req, res) => {
    let accNo = Number(req.body.accountNo);
    let newAccNo = Number(req.body.newAccountNo);
    let bankUserId = Number(req.body.bankUserId);
    let isStudent = Number(req.body.isStudent);
    let interestRate = Number(req.body.interestRate);
    let amount = Number (req.body.amount);

    Account.updateAccount(accNo, newAccNo, bankUserId, isStudent, interestRate, amount);
    res.sendStatus(200);
})

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
