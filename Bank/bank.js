/*
 * Responsible for ... Not much
 * 
 * Author: Arvid Larsen
 */

/*
I think I understand the task now?
CHANGE SO THAT BankUserId PONINTS TO ID of BankUser and NOT UserId
TODO Make foreign keys in DB
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
    let bankUserId = req.body.bankUserId.toString();

    if (!amount || amount < 0){
        console.log("What the hell dude?")
        res.sendStatus(403);
    }

    // Send request to interest rate system to get amount with interest
    axios.post('http://localhost:8103/calculate-interest_rate', {"depositAmount": amount}).then(response =>{
        // Update amount in BankUser
        let newAmount = response.data.newAmount.toString();
        
        Account.updateAmount(bankUserId, newAmount);
        //Save to Deposit
        Deposit.addDeposit(bankUserId, amount);
        
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
            console.log("ERROR")
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
