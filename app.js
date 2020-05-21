var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var app = express();

var urlencodedParser =bodyParser.urlencoded({extended:false});

app.use(bodyParser.json());


app.listen(3000,console.log("SERVER STARTED"));





//setting up the db
// Enter the url of mongodb
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect('mongodb://localhost:27017', function(err){
    if(err)
    console.log(err);
    else
    console.log("Successfully connected to Database");
});






//Creating Object
var Schema =mongoose.Schema;

var data =new Schema({

    username: String,
    mobile_no :Number,
    email_id : String
});

var Person=mongoose.model('Person',data);






//END POINTS





//starting screen
app.get('/', function(req,res){
    res.send("welcome");
   });








// CREATING 
app.post('/info',function(req,res){


    //Creating new Object when creating a new data 
    var Man=new Person({
        username :req.body.username,
        mobile_no:req.body.mobile_no,
        email_id : req.body.email_id
    
     });

    Man.save(function(err,data){
    if(err)
    res.send("Error");
    else
    res.send(data);
    });

});




//RETRIEVING All People info
app.get('/info',function(req,res){

    Person.find(function(err,data){
        if(err)
        res.send("Eroor");
        else
        res.send(data);
    });
});






//Retrieving a single person by id
app.get('/info/:id',function(req,res){

    Person.findById(req.params.id,function(err,data){
        if(err)
        res.send("no person with this id");
        else
        res.send(data);


    });
});




//DELETING A DOC BY ID
app.delete('/info/:id',function(req,res){

    Person.findByIdAndRemove(req.params.id,function(err){
        if(err)
        res.send("Error");
        else
        res.send("Deleted");
    });
});







//UPDATING THE DOC BY ID
app.put('/info/:id',function(req,res){
Person.findByIdAndUpdate(req.params.id,{
    username : req.body.username,
        mobile_no : req.body.mobile_no,
        email_id : req.body.email_id
    },
        
        function(err){
        if(err)
        res.send("Eroor");
        else
        res.send("Updated");                   

    })

});









