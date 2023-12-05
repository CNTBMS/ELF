const db = require("../db/sql");
const path = require('path');
const request = require('request');

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



const login = async (req, res) => {
  let body = req.body;
  const id = body.ID;
  const pw = body.PW;
  
  if( await db.chk_user(id,pw)){ 
    req.session.userId = body.ID;
    row = await db.chk_hos(req.session.userId);
    req.session.hos = row.Hos;
    req.session.role = row.Role;
    req.session.is_logined = true;
    req.session.save(function() {
    const jsobj = {
    "hos" : row.Hos,
    "role" : row.Role 
}
    return res.send(JSON.stringify(jsobj,null,5));
        });
  } else {
    return res.json(`로그인 실패`);
  }
}


const logout = (req, res) => {
  req.session.destroy();  
  res.clearCookie('ELF-cookie');
  res.end();
}

const session_check = (req, res) => { 
  if(req.session.is_logined === true ){
    return res.json(`${req.session.userId} 접속`);
  }else{
    return res.json('session 없음');
  }
}

module.exports = {
  login,
  logout,
  session_check,
  flask_check
};