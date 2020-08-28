


var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongoose");;
const ObjectId = require('mongodb').ObjectID;

var db = mongo.connect("mongodb://127.0.0.1:27017/mydb", function(err, response){
   if(err){ console.log( err); }
   else{ console.log('Connected to ' + db); }
});


var app = express()
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));


app.use(function (req, res, next) {
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
     res.setHeader('Access-Control-Allow-Credentials', true);
     next();
 });

var Schema = mongo.Schema;

var UsersSchema = new Schema({
  name: { type: String   },
 email:{ type:String},
 password: { type: String   },
 confirm_pass:{ type:String}

},{ versionKey: false });

var userModel = mongo.model('UsersData', UsersSchema, 'UsersData');

app.post("/api/SaveUser",function(req,res)
{
    var mod = new userModel(req.body);

  userModel.find({"email":req.body.email},function(err, result) {
    if (err) throw err;
        if(result.length>0){
          res.send({'result':'email already exist'})
        }
        else{
              mod.save(function(err,data){

                if(err){
                  res.send(err);
                }
                else{
                    console.log('signed up')
                    console.log(data);
                    res.send({"result":true});
                }
              })
          }
  });

  }
)
app.post("/api/findUser",function(req,res)
{

  userModel.find({"email":req.body.email},function(err, result) {
  if (err) throw err;
  if(result.length>0)
  {
      if(result[0].password==req.body.pass)
      {
    res.send({"result":result});
      }
      else{
        res.send({"result":false});
           }
  }
  else{
    res.send({"result":"email does not exist"});
  }

  });
})



//----------------------------------------------



var dishSchema = new Schema({
  Name: { type: String   },
  Image:{ type:String},
  price: { type: String   },
  restaurantId:{type:String},
 },{ versionKey: false });


var dishModel = mongo.model('foodItems', dishSchema, 'foodItems');

app.post("/api/createDish",function(req,res)
{
  var mod = new dishModel(req.body);
  mod.save(function(err,data){
    if(err){
      res.send(err);
    }
    else{

        res.send({"result":true});
    }
  })
})

app.post("/api/getDish",function(req,res){

  dishModel.find({"restaurantId":req.body.id},function(err, result) {
      if (err) throw err;
      if(result.length>0)
      {

        res.send(result);
      }
      else
      {
        res.send({"result":"Food Items does not exist"});
      }
    });
})

//------------------------------------------------------


var hotelSchema = new Schema({
  name: { type: String   },
  city:{ type:String},
  image: { type: String   },
  veg:{ type:String}

 },{ versionKey: false });

var hotelModel = mongo.model('allHotel', hotelSchema, 'allHotel');
app.post("/api/saveRestuarent",function(req,res)
{
    var mod = new hotelModel(req.body);
    mod.save(function(err,data){
      if(err){
        res.send(err);
      }
      else{

        res.send({'result':true});
    }

  });

  }
)
app.get("/api/findRestuarent",function(req,res)
{

  hotelModel.find({},function(err,data){
      if(err){
        res.send(err);
      }
      else{

        res.send(data);
      }

  });
})

app.post("/api/getRes",function(req,res)
{

  var obj=new ObjectId(req.body.id)

  hotelModel.find({'_id':obj},function(err,data){
      if(err){
        res.send(err);
      }
      else{
        // console.log(data)

        res.send(data);
      }

  });
})


var orderSchema = new Schema({
  Name: { type: Object   },
  userId: {type:String},
  time:{type:String}
},{ versionKey: false });

 var orderModel = mongo.model('allOrder', orderSchema, 'allOrder');

 app.post("/api/placeOrders",function(req,res)
 {


    var current=new Date();
    var date=current.getDay()+"/"+current.getMonth()+"/"+current.getFullYear()

    req.body.time=date
    console.log(req.body)
     var ord = new orderModel(req.body);

  ord.save(function(err,data){
    if(err){
      res.send(err);
    }
    else{

      res.send({'result':"Order Placed"});
  }
 });
 })

 app.post("/api/findOrders",function(req,res){

    orderModel.find({"userId":req.body.id},function(err, result) {
          if (err) throw err;

          res.send(result)
        });
    })








app.post("/api/deleteHotel",function(req,res){

  hotelModel.deleteOne({"name":req.body.Name},function(err, result) {
        if (err) throw err;
      });
      dishModel.deleteMany({"restaurantId":req.body._id},function(err, result) {
        if (err) throw err;
        res.send(result)
      });
  })


  app.post("/api/updateHotel",function(req,res){

      var obj=new ObjectId(req.body._id)


    //   hotelModel.find({},function(err,data){
    //     if(err){
    //       res.send(err);
    //     }
    //     else{

    //       res.send(data);
    //     }

    // });

      hotelModel.update({'_id':obj},{$set:{'name':req.body.Name}},function(err, result) {
            if (err) throw err;

      });

      })
  app.post("/api/deleteDish",function(req,res){
    dishModel.deleteOne({"Name":req.body.Name},function(err, result) {
      if (err) throw err;
      // res.send(result)

    });
  })

app.listen(8080, function () {

 console.log('Example app listening on port 8080!')
})
