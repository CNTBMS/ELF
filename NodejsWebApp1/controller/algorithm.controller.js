/*
only used in substantiation
*/

const db = require("../db/sql");
const path = require('path')
const spawn = require('child_process').spawn;

function smc_algo(req, res){

try{

var input = req.body
var output; 
var inputstr = JSON.stringify(input);
inputstr = inputstr.replace('"',"'")

const result = spawn('python', [path.join(__dirname, {SMC_MODEL_PATH}), inputstr]);
result.stdout.on('data', function(data) {

    output = data.toString();
    output = output.replace("\r\n","")
    jsonstr = JSON.parse(output);

    db.db_exec_algo(req.session.userId,"SMC_ALGO");

    res.status(200).send(jsonstr);
});

result.stderr.on('data', function(data) {
    console.log(data.toString());
});

} catch(err){
console.log(err);
return res.status(400).end()
}

}

function smc_algo_3hour(req, res){

try{

var input = req.body
var output; 
input.delta_Hb=Number(input.a_Hb)-Number(input.b_Hb);
var inputstr = JSON.stringify(input);

inputstr = inputstr.replace('"',"'")

const result = spawn('python', [path.join(__dirname, {SMC_3HMODEL_PATH}), inputstr]);
result.stdout.on('data', function(data) {

    output = data.toString();
    output = output.replace("\r\n","")
    jsonstr = JSON.parse(output);

    db.db_exec_algo(req.session.userId,"SMC_ALGO_3h");

    res.status(200).send(jsonstr);
});

result.stderr.on('data', function(data) {
    console.log(data.toString());
});

}catch{
console.log(err);
 return res.status(400).end()
}

}

function kumc_algo(req, res){
try{

var input = req.body
var output; 
var inputstr = JSON.stringify(input);
inputstr = inputstr.replace('"',"'")

const result = spawn('python', [path.join(__dirname, {KUMC_MODEL_PATH}'), inputstr]);
result.stdout.on('data', function(data) {

    output = data.toString();
    output = output.replace("\r\n","")
    jsonstr = JSON.parse(output);

   db.db_exec_algo(req.session.userId,"KUMC_ALGO");

    res.status(200).send(jsonstr);
});

result.stderr.on('data', function(data) {
    console.log(data.toString());
});

}catch{
console.log(err);
 return res.status(400).end()
}

}

function survey(req, res){
try{

var input = req.body
db.db_survey(input.Q1,input.Q2,input.Q3,input.Q4,input.Q5,input.Q6,req.session.userId);
res.status(200).send({"status":"success"});
}catch{
console.log(err);
 return res.status(400).end()
}

}


module.exports = {
  smc_algo,
  kumc_algo,
  smc_algo_3hour,
  survey
};