/**
 * Responsible for ... Not much
 * 
 * Author: Arvid Larsen
 */

const port = 8101;
const express = require('express');
const Account = require('./Account');
const User = require('./BankUser');
const Loan = require('./Loan');
const Deposit = require('./Deposit');
const axios = require('axios');

var app = express();

app.use(express.json());

// http://localhost:8101/list-deposits/99999
app.get("/list-deposits/:bankUserId", (req, res) => {
    let bankUserId = req.params.bankUserId.toString();
    
    Deposit.getUserDeposits(bankUserId).then(list => {
        res.send(list).status(200);
    }).catch(err => {
        res.sendStatus(404);
    });
});

// http://localhost:8101/list-loans/122
// let userId = req.query.userId.toString();
app.get("/list-loans/:userId", (req, res) => {
    let userId = req.params.userId.toString();  // This is better, userId is NOT optional
    Loan.getUserLoans(userId).then(list => {
        res.send(list).status(200);
    }).catch(err => {
        res.sendStatus(404);
    });
});


app.post('/add-deposit', (req, res) =>{
    let amount = req.body.amount.toString();
    let userId = req.body.userId.toString();

    if (!amount || amount < 0){
        console.log("What the hell dude?")
        res.sendStatus(403);
    }

    // Send request to interest rate system to get amount with interest
    axios.post('http://localhost:8103/calculate-interest_rate', {"depositAmount": amount}).then(response =>{
        // Update amount in BankUser
        let newAmount = response.data.newAmount.toString();
        
        Account.updateAmount(userId, newAmount);
        //Save to Deposit
        Deposit.addDeposit(userId, amount);
        
        return res.status(200).send({"Deposited": newAmount});
    }).catch(err =>{
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
    });
});

app.post("/create-loan", (req, res) => {
    let bankUserId = req.body.bankUserId.toString();
    let loanAmount = req.body.loanAmount.toString();

    Account.getUserAccount(bankUserId).then(account => {
        let totalAccountAmount = account.Amount.toString();
        axios.post('http://localhost:8102/loan-calculate', {loanAmount, totalAccountAmount}).then(loanApproved => {
            Loan.createLoan(bankUserId, loanAmount);
            
            res.sendStatus(200);
        }).catch(err => {
            res.sendStatus(400);
        });
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

app.post("/pay-loan", (req, res) => {
    let bankUserId = req.body.bankUserId.toString();
    let loanId = req.body.loanId.toString();
    
    Account.getUserAccount(bankUserId).then(account => {
        Loan.getLoan(loanId).then(loan => {
            if (account.Amount < loan.Amount){
                res.sendStatus(403);
            } else {
                Loan.resolveLoan(loanId);
                res.sendStatus(200);
            }
        }).catch(err => {
            console.log("ERRROR")
        });
    }).catch(err => {
        res.sendStatus(500);
    });
});

app.post("/withdrawl-money", (req, res) => {
    let userId = req.body.userId.toString();
    let amount = req.body.amount.toString();

    Account.getUserAccount(userId).then(account => {
        
        if (account.Amount - amount > 0){
            Account.updateAmount(userId, -amount);
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }

    }).catch(err => {
        res.sendStatus(403);
    });
});

/*
#############################################################################
#####################    FOR TEMPORARY TESTING ONLY!    ##################### 
 */
//#region 
app.get("/test-add", (req, res) => {
    User.createUser(1233312);
    res.sendStatus(200);
});
app.get("/test-read", (req, res) => {
    User.getUser(1233312).then(value => {
        console.log(value);
    });
    res.sendStatus(200);
});
app.get("/test-remove", (req, res) => {
    User.deleteUser(1233312);
    res.sendStatus(200);
});
app.get("/test-update", (req, res) => {
    User.updateUser(1233312, 99999);
    res.sendStatus(200);
});

app.get("/test-create-acc", (req, res) => {
    Account.createAccount(99999, 0, 0.3, 100);
    res.sendStatus(200);
});

app.get("/test-get-acc", (req, res) => {
    Account.getAccount(8383905086).then(account => {
        console.log(account);
    })
    res.sendStatus(200);
});
app.get("/test-update-acc", (req, res) => {
    Account.updateAccount(8383905026, 8383905026, 99999, 0, 0.2, 200);
    res.sendStatus(200);
})

app.get("/test-get-loans", (req, res) => {
    Loan.getUserLoans(122).then(list => {
        list.forEach(element => {
            console.log(element);
        });
    });
    res.sendStatus(200);
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
