var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var email   = require('emailjs/email');
var prompt = require('prompt');
// Connection URL
var url = 'mongodb://localhost:27017/tender';

var uname;

  prompt.start();
  console.log("Enter Username to verify");

  prompt.get(['username'], function (err, result) {
    if (err) { return onErr(err); }
    console.log('Command-line input received:');
    console.log('  Username: ' + result.username);
    uname = result.username;
    MongoClient.connect(url, function (err, db) {
    assert.equal(err,null);
        var collection = db.collection("users");
	var set = {
            verify:"true"
        };
        collection.update(
            { username: uname },
            { $set: set },
            function (err, result) {
                if (err) throw err;
            console.log(result);
            });
        collection.find({username:uname}).toArray(function(err,docs){
            assert.equal(err,null);
            console.log("Found:");
            console.log(docs);
            console.log("#");
            var email1=docs[0].email;
            console.log(email);
    

var server  = email.server.connect({
   user:    "tenderdbms@gmail.com", 
   password:"dbmstender", 
   host:    "smtp.gmail.com", 
   ssl:     true
});

// send the message and get a callback with an error or details of the message that was sent
server.send({
   text:    "Your Account has been verified and now you can use the Tender Management Application", 
   from:    "CPWD Tenders <tenderdbms@gmail.com>", 
   to:      email1,
   subject: "Account Verified by CPWD"
}, function(err, message) { console.log(err || message); });
            
            
        });
    });
  });

  function onErr(err) {
    console.log(err);
    return 1;
  }