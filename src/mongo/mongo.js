const MongoClient=require('mongodb').MongoClient;
const url="mongodb://localhost:8080/";
// const createuser=async (req,res,next) => {
//   const newuser={
//     email:req.body.email,
//     pass:req.body.pass
//   };


// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
// const getuser=async (req,res,next) => {


//   };
// exports.createuser=createuser;
// exports.getuser=getuser;
