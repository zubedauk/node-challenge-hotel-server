const express = require("express");
const cors = require("cors");

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
})
//*******************8read all booking
app.get("/bookings",function(req,res){
  res.json(bookings);
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
