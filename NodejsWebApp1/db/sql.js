const request = require('request');
const path = require("path");
const fs = require("fs");
const crypto = require('crypto');

const pool = {DB_INFO}  // write database info



function Request(url) {
  return new Promise(function (resolve, reject) {
    request(url, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

function get_Time(){  // function returns present time 
var now = new Date();
now.setHours(now.getHours()+9);
var Now = now.toISOString().slice(0, 19).replace('T', ' ');
return Now
}

async function db_Averaging(Newfilename,Algo,Variation,Round,Description,Noise){ // averaging weights and getting parameters API requests to Flask 
  let conn;
  let Size;
  let Now = await get_Time();
  
var options = {
  uri: "{FLASK_URL}/avg",  //write FLASK API URL
  qs:{
    Filename: Newfilename,
    Algo: Algo,
    Variation : Variation,
    Round : Round,
    Noise : Noise
  }
};

 await Request(options);

 let filepath = path.join(__dirname, {STORAGE_PATH}); // write storage path


fs.stat(filepath, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    Size=stats.size;
  }
});

var options = {
  uri: "{FLASK_URL}/param", //write FLASK API URL
  qs:{
    Path: filepath,
  }
};

let hyper = await Request(options);
let obj = JSON.parse(hyper);

  conn = await pool.getConnection();
  try {	
          const rows = await conn.query({QUERY_STRING_1}); // write Query using param info

  } catch (err) {
	throw err;
  } finally {

	if (conn) return conn.end();
  }
}



async function db_getPartList(Algo, Variation){
 let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query({QUERY_STRING_2}); // write Query to get particaipants info
            if (conn) conn.end();
            return rows;
  } catch (err) {
	throw err;
  }
}

async function db_getRound(Algo, Variation, Hos){
 let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query(QUERY_STRING_3); // write Query to get present FL round
            if (conn) conn.end();
            return rows[0].Round;
  } catch (err) {
	throw err;
  }
}

async function db_getFiles(){
 let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query({QUERY_STRING_4}); // write Query to get files info
            if (conn) conn.end();
            return rows;
  } catch (err) {
	throw err;
  }
}

async function chk_exist(Name, Hos, Algo,Variation,Round){
let rows;

  try {
conn = await pool.getConnection();
	 rows = await conn.query({QUERY_STRING_5}); // write Query to get file existence
if (conn) {conn.end();}

}catch (err) {
	throw err;
}

return rows.length;
}

async function chk_user(ID, password){
let rows;
let PW;
crypto.pbkdf2(PW, '{SALT_VALUE}', 1000000, 64, 'sha512', (err, key) => { // write salt value 
  PW = password
});

  try {
conn = await pool.getConnection();
	 rows = await conn.query({QUERY_STRING_6}); //write Query to compare account info
if (conn) {conn.end();}

}catch (err) {
	throw err;
}
if( Number(rows[0].c.toString().replace("n",""))>0){

return true;
}
else{

return false;
}
}

async function chk_hos(ID){
let rows;
  try {
conn = await pool.getConnection();
	 rows = await conn.query({QUERY_STRING_7}); //write Query to check hospital info
if (conn) {conn.end();}

}catch (err) {
	throw err;
}

return rows[0];

}

async function chk_part(Algo, Variation, Hos){
let rows;
  try {
conn = await pool.getConnection();
	 rows = await conn.query({QUERY_STRING_8});// write Query to compare particaipants list 
if (conn) {conn.end();}

}catch (err) {
	throw err;
}

if( Number(rows[0].c.toString().replace("n",""))>0){

return true;
}
else{

return false;
}

}

async function db_Model_up(Name,Hos,Algo,Variation,Round,Description){
  let conn;
  let Now = await get_Time();
  
  let filepath = path.join(__dirname, {STORAGE_PATH}); // write file storage path
  let Size;
fs.stat(filepath, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    Size=stats.size;
  }
});

var options = {
  uri: "{FLASK_URL}/param", // write Flask API URL
  qs:{
    Path: filepath,
  }
};

let hyper = await Request(options);
let obj = JSON.parse(hyper);

  conn = await pool.getConnection();
  try {	

if( await chk_exist(Name, Hos, Algo,Variation,Round)>0){

  const rows = await conn.query({QUERY_STRING_9}); // write Insert Query 


}
else{

           const rows = await conn.query({QUERY_STRING_10}); //write Update Query 

}

  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

async function db_exec_algo(ID,algo){
  let conn;
  let Now = await get_Time();
  conn = await pool.getConnection();

try {	
  const rows = await conn.query({QUERY_STRING_11}) //write Query to leave a log
}catch(err){
   throw err;
}finally{
   if (conn) return conn.end();
}

}

async function db_survey(Q1,Q2,Q3,Q4,Q5,Q6,ID){
  let conn;
  let Now = await get_Time();
  conn = await pool.getConnection();

try {	
  const rows = await conn.query({QUERY_STRING_12}) //write Query to get report
}catch(err){
console.log(err);
   throw err;
}finally{
   if (conn) return conn.end();
}

}


async function add_part(Algo,Variation,Hos){

  let conn;
  conn = await pool.getConnection();
  if(!(await chk_part(Algo,Variation,"CNT")))
{
 try {	

           const rows = await conn.query({QUERY_STRING_13}); //write Query to participate FL

  } catch (err) {
	throw err;
  }
}


  try {	

           const rows = await conn.query({QUERY_STRING_14}); //write Query to participate FL

  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }



}


module.exports = {  
  db_Averaging,
  db_getPartList,
  db_getRound,
  db_getFiles,
  chk_exist,
  chk_user,
  chk_hos,
  chk_part,
  add_part,
  db_Model_up,
  db_exec_algo,
  db_survey
};
