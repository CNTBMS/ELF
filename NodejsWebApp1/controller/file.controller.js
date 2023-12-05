const uploadFile = require("../middleware/upload");
const db = require("../db/sql");
const fs = require("fs");

const Averaging = async (req, res) => {

  var newfilename = req.query.Filename;
  var algo = req.query.Algo;
  var variation = req.query.Variation;
  var round = req.query.Round;
  var description = req.query.Description;
  var Noise = req.query.Noise;

console.log(newfilename)

try{
await db.db_Averaging(newfilename,algo,variation,round,description,Noise)

res.status(200).send({
      message: "Averaging successfully ",
    });
}
catch(err){
res.status(500).send({
      message: 'error occured',
    });
}

};



const upload = async (req, res) => {

  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }


 } catch (err) {
console.log(err);
  }
};



const getListFiles = async (req, res) => {
  let fileInfos = [];
  result = await db.db_getFiles()

   await result.forEach((row) => {
      fileInfos.push({
        name: row.Name,
        hos: row.Hos,
        date: row.Date,
        size: row. Size,
        variation: row.Variation,
        round: row.Round,
        description: row.Description,
        algo:row.Algo,
        optimizer : row.Opt,
        loss : row.Loss,
        train : row.Tparam,
        nontrain : row.NTparam,
        lr : row.Lr
      });
    });

res.status(200).send(fileInfos);

};


const getReady = async (req, res) => {
  let Info = [];
  var map = new Map();
  const Algo = req.params.algo;
  const Variation = req.params.variation;
  
  result = await db.db_getPartList(Algo, Variation);

for await ( let item of result){
var rd = await db.db_getRound(Algo, Variation, item.Part)

map.set(item.Part, rd);
}


var round = map.get("CNT");
map.delete("CNT");

map.forEach((value,key) => {
var is_ready;

if(Number(value)>Number(round))
{
is_ready = 1;
}
else
{
is_ready = 0;
}

      Info.push({
        hos: key,
        ready: is_ready
      });
});

res.status(200).send(Info);

};


const download = (req, res) => {
  const Hos = req.params.hos;
  const fileName = req.params.name;
  const Algo = req.params.algo;
  const Variation = req.params.variation;
  const Round = req.params.round;
  const directoryPath = __basedir + {FILE_PATH};
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  Averaging,
  upload,
  getListFiles,
  getReady,
  download
};