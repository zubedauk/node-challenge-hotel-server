const express = require("express");
const cors = require("cors");
var moment = require('moment'); 
var validator = require("email-validator");

const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});
//***************Create a new booking */
app.post("/bookings",function(req,res){
  //validator.validate(req.body.email)===false;
  if(req.body.title===undefined
    || req.body.firstName===undefined || req.body.surname===undefined || req.body.email===undefined || req.body.roomId===undefined || req.body.checkInDate===undefined || req.body.checkOutDate===undefined ){
    res.status(400);
    res.send("fill all fields please")
  }else if(!validator.validate(req.body.email)){
    res.send("correct email formate ie test@hotail.com");
  }
  else{
    const id=bookings.length+1;
    bookings.push( {
      "id": id,
      "title": req.body.title,
      "firstName": req.body.firstName,
      "surname": req.body.surname,
      "email": req.body.email,
      "roomId": req.body.roomId,
      "checkInDate": req.body.checkInDate,
      "checkOutDate": req.body.checkOutDate
    })
    res.send("addedd successfully")
  }

})
//*******************8read all booking
app.get("/bookings",function(req,res){
  res.json(bookings);
})
//**************search by term */
//***************search by date */
app.get("/bookings/search",function(req,res){

  //res.send("please put date formate yyyy:mm:dd ie search?date=2019-05-20")
  //const date = moment(req.body.date)
  if(req.query.date){
    const found=bookings.find(function(obj){
        return obj.checkInDate==req.query.date || obj.checkOutDate==req.query.date;
    })
    if(found){
      res.send(found)
    }else{
      res.send("no found search date")
    }
  }else{
    const found=bookings.find(function(obj){
      return obj.firstName.toLowerCase().includes(req.query.term.toLowerCase()) || obj.surname.toLowerCase().includes(req.query.term.toLowerCase()) || obj.email.toLowerCase().includes(req.query.term.toLowerCase())
    })
    if(found){
      res.json(found)
    }
    else{
      res.send("no term exist")
    }
  }
})
//**************************Read one booking, specified by an ID */
app.get("/bookings/:id",function(req,res){
  const id=req.params.id;
  const found=bookings.find(function(obj){
    return obj.id.toString()===id
  })
  if(found){
    res.json(found)
  }
  else{
    res.status(404);
    res.send("not found this id")
  }
 
})
//************Delete a booking, specified by an ID */
app.delete("/bookings/:id",function(req,res){
  const id=req.params.id;
  const found=bookings.find(function(obj){
    return obj.id.toString()===id
  })
  if(found){
    bookings.splice(bookings.indexOf(found),1)
    res.send("deleted")
  }
  else{
    res.status(404).send("Not data found to delete");
  }
  
})
// TODO add your routes and helper functions here
//process.env.PORT
const listener = app.listen(3001, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
