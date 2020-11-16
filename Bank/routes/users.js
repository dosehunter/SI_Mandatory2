const User = require('../model/BankUser');


//app.post("/user/:userId", (req, res) => {
exports.createUser = function(req, res){
    let userId = Number(req.params.userId);

    User.createUser(userId);
    res.sendStatus(200);
};

//app.get("/user/:user", (req, res) => {
exports.getUser = function(req, res){
    let user = Number(req.params.userId);

    User.getUser(user).then(value => {
        res.send(value).status(200);
    }).catch(err => {
        res.sendStatus(500);
    });
};

//app.delete("/user/:user", (req, res) => {
exports.deleteUser = function(req, res){
    let user = Number(req.params.userId);

    User.deleteUser(user);
    res.sendStatus(200);
};

//app.get("/test-update", (req, res) => {
exports.updateUser = function(req, res){
    let userId = Number(req.params.userId);
    let newUserId = Number(req.body.newUserId);
    
    User.updateUser(userId, newUserId); 
    res.sendStatus(200);
};
