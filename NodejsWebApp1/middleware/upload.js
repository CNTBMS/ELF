const util = require("util");
var multiparty = require('multiparty');
const fs = require("fs");
const db = require("../db/sql");

let uploadFile = async (req,res) => {

var map = new Map();
map.set("Hos",req.session.hos)

const multi = (req,res) => new Promise((resolve, reject) => {
      var form = new multiparty.Form();

            form.parse(req, function(err, fields, files){
      if (err) return reject(err);
      return resolve([fields, files]);
     });
})

const stream = (readStream,writeStream) => new Promise((resolve, reject) => {
readStream.pipe(writeStream);
writeStream.on('finish', resolve);
     
})

const [fields, files] = await multi(req, res);

for (const element in fields) {
  map.set( element, fields[element]);
}
var makepath = __basedir + {FILEPATH}
var path = makepath+"/" + {SUBPATH}

if(!fs.existsSync(makepath)){
fs.mkdirSync(makepath , {recursive: true}, err => {});
}

            var readStream = fs.createReadStream(files.file[0].path, {flags:'r'});
            var writeStream = fs.createWriteStream(path, {flags:'w'});
           writeStream.filename = map.get("Filename");


            await stream(readStream,writeStream)
            if(! (await db.chk_part(map.get("Algo"),map.get("Variation"),map.get("Hos") ) ))
{

await db.add_part(map.get("Algo"),map.get("Variation"),map.get("Hos"));
}

           await db.db_Model_up(map.get("Filename"),map.get("Hos"),map.get("Algo"),map.get("Variation"),map.get("Round"),map.get("Description"))

res.status(200).send('Upload complete');
}


let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;