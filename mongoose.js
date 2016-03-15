// servers.js for Quoting Dojo Redux
//
// Require the Express Module
var express = require("express");
// Create an Express App
var app = express();
// // Require body-parser (to receive post data from clients)
var bodyParser = require("body-parser");
// // Integrate body-parser with our App
app.use(bodyParser.urlencoded());
// Require path
var path = require("path");
// Require Mongoose
var mongoose = require('mongoose');
// Setting our Static Folder Directory
app.use(express.static(__dirname + "./static"));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
//  connect to the mongodb database using mongoose
mongoose.connect('mongodb://localhost/Dashboard');
//Create Schema
var AnimalSchema = new mongoose.Schema({
    name: String,
    location: String,
    age: Number, },
    { timestamps: {
        createdAt: 'created',
        updatedAt: 'LMD'
    }
});
//console.log(AnimalSchema);
mongoose.model('Animal', AnimalSchema); // We are setting this Schema in our Models as 'Animal'
var Animal = mongoose.model('Animal'); // We are retrieving this Schema from our Models, named 'Animal'
//console.log(Animal);
// Routes

// Root Request
app.get('/', function(req, res) {                      //show them all
    Animal.find({}, function(err, animals){
        if(err){
            console.log(err);
            //res.render("mongooses", {err: err});
        } else {
            console.log(animals);
            res.render("mongooses", {animals: animals});
        }
    });
});

// id request
app.get('/mongooses/:id', function(req, res) {                    //show just one
    Animal.find({id: req}, function(err, animals){
        if(err){
            console.log(err);
            res.render("mongooses", {err: err});
        } else {
            console.log(animals);
            res.render("mongooses", {animals: animals});
        }
    });
});

// new request
app.get('/mongooses/new', function(req, res) {                    //show blank edit form
    console.log("new path");
    //res.render("new", {title: "New one"});
});

// Post new Animal
app.post('/mongooses', function(req, res) {             // save new animal
    console.log("POST DATA", req.body);
    // This is where we would add the user from req.body to the database.
    var animal = new Animal({
        name: req.body.name,
        location: req.body.location,
        age: req.body.age
    });
    console.log(animal);
    // Try to save that new animal to the database
    animal.save(function(err) {
        // if there is an error console.log that something went wrong!
        if (err) {
            console.log('something went wrong');
            res.render("edit", {err: err});
        } else { // else console.log that we did well and then redirect root route
            console.log('successfully added a animal!');
            res.redirect('/');
        }
    });
});

// edit request
app.get('/mongooses/:id/edit', function(req, res) {                //show populated edit form
    console.log("log =" + req.params.id );
    Animal.find({ _id: req.params.id }, function(err, animals){
        if(err) {
            console.log(err);
            res.render("mongooses", {err: err});
        } else {
            console.log(animals);
            res.render("edit", {animals: animals});
        }
    });
});

// Post Edits to existing animal Animal
app.post('/mongooses/:id', function(req, res) {         // save edit form
    console.log("POST DATA", req.body);
    // This is where we would add the user from req.body to the database.
    var animal = new Animal({
        name: req.body.name,
        location: req.body.location,
        age: req.body.age
    });
    console.log(animal);
    // Try to save that new user to the database (
    //this is the method that actually inserts into the db) and
    // run a callback function with an error (if any) from the operation.
    animal.save(function(err) {
        // if there is an error console.log that something went wrong!
        if (err) {
            console.log('something went wrong');
            res.render("edit", {err: err});
        } else { // else console.log that we did well and then redirect root route
            console.log('successfully added a animal!');
            res.redirect('/');
        }
    });
});

// destroy animal (record, not a real animal ;-)
app.get('/mongooses/:id/destroy', function(req, res) {                //destroy one
    Animal.remove({id: req}, function(err, animals){
        if(err){
            console.log(err);
            res.render("mongooses", {err: err});
        } else {
            console.log(animals);
            res.render("mongooses", {animals: animals});
        }
    });
});

// Setting our Server to Listen on Port: 8001
app.listen(8001, function() {
    console.log("listening on port 8001 - mongoose_dashboard");
});
