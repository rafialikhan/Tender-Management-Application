var config = require('config.json');
var mongo = require('mongodb');
//Monk for easily using mongodb with node
var monk = require('monk');
var db = monk(config.connectionString);
var tendersDb = db.get('tenders');
//For modular methods like iterating arrays
var _ = require('lodash');
var jwt = require('jsonwebtoken');
//Key derivation for passwords
var bcrypt = require('bcryptjs');
//q is for promise based
var Q = require('q');
var email   = require('emailjs/email');

var service = {};

service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.findAll = findAll;

module.exports = service;

function getById(tenderid) {
    var deferred = Q.defer();

    tendersDb.findById(tenderid, function (err, tender) {
        if (err) deferred.reject(err);

        if (tender) {
            deferred.resolve(_.omit(tender));
        } else {
            // tender not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function findAll() {
    var deferred = Q.defer();

    tendersDb.find({},(function(err,tender){
            if (err) deferred.reject(err);

        if (tender) {
            deferred.resolve(_.omit(tender));
        } else {
            // tender not found
            deferred.resolve();
        }
        }));
   

    return deferred.promise;
}

function create(tenderParam) {
    var deferred = Q.defer();

    // validation
    tendersDb.findOne(
        { tenderid: tenderParam.tenderid },
        function (err, tender) {
            if (err) deferred.reject(err);

            if (tender) {
                // tenderid already exists
                 deferred.reject('tenderId "' + tenderParam.tenderid + '" is already taken');
            } else {
                createtender();
            }
        });

    function createtender() {
        var tender = _.omit(tenderParam);
        if(tender.level == "Tender Approved"){
            
            var email1=tender.email;
            var server  = email.server.connect({
            user:    "tenderdbms@gmail.com", 
            password:"dbmstender", 
            host:    "smtp.gmail.com", 
            ssl:     true
            });

            // send the message and get a callback with an error or details of the message that was sent
            server.send({
        text:    "Your tender has been approved", 
        from:    "CPWD Tenders <tenderdbms@gmail.com>", 
        to:      email1,
        subject: "Tender Approved by CPWD"
        }, function(err, message) { console.log(err || message); });

            
            
        }
        tendersDb.insert(
            tender,
            function (err, doc) {
                if (err) deferred.reject(err);
                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, tenderParam) {
    var deferred = Q.defer();
console.log("#");
    // validation
    tendersDb.findById(_id, function (err, tender) {
        if (err) deferred.reject(err);

        if (tender.tendername !== tenderParam.tendername) {
            // tendername has changed so check if the new tendername is already taken
            tendersDb.findOne(
                { tendername: tenderParam.tendername },
                function (err, tender) {
                    if (err) deferred.reject("Not Found");
                    if (tender) {
                        // tendername already exists
                        updatetender();
                        //deferred.reject('tendername "' + tenderParam.tendername + '" is already taken')
                    } else {
                        updatetender();
                    }
                });
        } else {
            updatetender();
        }
    });

    function updatetender() {
        var set = {
            level: tenderParam.level,
        };

        tendersDb.findAndModify(
            { _id: _id },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    tendersDb.remove(
        { _id: _id },
        function (err) {
            if (err) deferred.reject(err);

            deferred.resolve();
        });

    return deferred.promise;
}