var express =  require('express');
var app = express();
var mysql = require('mysql');
var cors = require('cors');

app.use(cors());

var port = process.env.PORT || 4000;

var pool = mysql.createPool({
    user     : 'bfbf26b860f82d',
    password : 'bb8328d7',
    host     : 'us-cdbr-iron-east-05.cleardb.net',
    database: 'ad_92b7970d9a2aa1d',
    port     : 3306
});

app.get('/locationMap', function(req, res, next) {

    var allowedOrigins = ['http://killian-apple.cfapps.io/', 'http://localhost:8000'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    let sql = "Select * FROM locationMap";

    pool.getConnection(function(err, connection) {
        console.log("connection started")
        connection.query(sql ,(err, rows) => {
            if (err) {
                throw err;
            }

            if (rows!=null && rows.length>0) {
                var i
                var locations = []
                for (i = 0; i < rows.length; i++) {

                    var obj = {
                        status: "success",
                        id: rows[i].locationID,
                        location: rows[i].locationName,
                    }
                    locations.push(obj)
                }
                res.send(locations);
                console.log('Maps found')
            }
            else{
                var obj1 = {
                    status: "none"
                }
                res.send(obj1);
                console.log('no players found')

            }
            });
        connection.release();
        console.log("connection ended")
    })
});

app.post('/locationYears', function(req, res, next) {

    var allowedOrigins = ['http://killian-apple.cfapps.io/', 'http://localhost:8000'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    var body = '';
    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        "use strict";
        var obj = JSON.parse(body);

        let sql = "Select SUBSTRING(`timeDate`, 1, 4) timeDate FROM locationData WHERE locationID='" + obj.id + "'GROUP BY SUBSTRING(`timeDate`, 1, 4)";

        pool.getConnection(function(err, connection) {
            console.log("connection started")
            connection.query(sql ,(err, rows) => {
                if (err) {
                    throw err;
                }

                if (rows!=null && rows.length>0) {
                    var i
                    var data = []
                    for (i = 0; i < rows.length; i++) {

                        var obj = {
                            status: "success",
                            year: rows[i].timeDate,
                        }
                        data.push(obj)
                    }
                    res.send(data);
                    console.log('Years found')
                }
                else{
                    var obj1 = {
                        status: "none"
                    }
                    res.send(obj1);
                    console.log('no years found')

                }
            });
            connection.release();
            console.log("connection ended")
        })
    })
});

app.get('/locationData', function(req, res, next) {

    var allowedOrigins = ['http://killian-apple.cfapps.io/', 'http://localhost:8000'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    let sql = "Select * FROM locationData WHERE (timeDate LIKE '2001-05%%%%%%%%%%%%%%%%%') AND (locationID = 'M2')";

    pool.getConnection(function(err, connection) {
        console.log("connection started")
        connection.query(sql ,(err, rows) => {
            if (err) {
                throw err;
            }

            if (rows!=null && rows.length>0) {
                var i
                var data = []
                for (i = 0; i < rows.length; i++) {

                    var obj = {
                        status: "success",
                        locationID: rows[i].locationID,
                        timeDate: rows[i].timeDate,
                        AtmosphericPressure: rows[i].AtmosphericPressure,
                        WindDirection: rows[i].WindDirection,
                        WindSpeed: rows[i].WindSpeed,
                        Gust: rows[i].Gust,
                    }
                    data.push(obj)
                }
                res.send(data);
                console.log('Locations found')
            }
            else{
                var obj1 = {
                    status: "none"
                }
                res.send(obj1);
                console.log('no locations found')

            }
        });
        connection.release();
        console.log("connection ended")
    })
});

app.post('/getData', function(req, res, next) {

    var allowedOrigins = ['http://killian-apple.cfapps.io/', 'http://localhost:8000'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    var body = '';
    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        "use strict";
        var obj = JSON.parse(body);
        console.log(obj)

        let sql = "Select * FROM locationData WHERE locationID='" + obj.id + "'AND SUBSTRING(`timeDate`, 1, 7) ='" + obj.date + "'"

        pool.getConnection(function(err, connection) {
            console.log("connection started")
            connection.query(sql + 'GROUP BY SUBSTRING(`timeDate`, 1, 10) ORDER BY timeDate' ,(err, rows) => {
                if (err) {
                    throw err;
                }

                if (rows!=null && rows.length>0) {
                    var i
                    var data = []
                    for (i = 0; i < rows.length; i++) {

                        var obj = {
                            status: "success",
                            locationID: rows[i].locationID,
                            timeDate: rows[i].timeDate,
                        }
                        data.push(obj)
                    }
                    res.send(data);
                    console.log('data found')
                }
                else{
                    var obj1 = {
                        status: "none"
                    }
                    res.send(obj1);
                    console.log('no data found')

                }
            });
            connection.release();
            console.log("connection ended")
        })
    })
});

app.post('/getDayData', function(req, res, next) {

    var allowedOrigins = ['http://killian-apple.cfapps.io/', 'http://localhost:8000'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    var body = '';
    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        "use strict";
        var obj = JSON.parse(body);
        console.log(obj)

        let sql = "Select * FROM locationData WHERE locationID='" + obj.id + "'AND SUBSTRING(`timeDate`, 1, 10) ='" + obj.day + "'"

        pool.getConnection(function(err, connection) {
            console.log("connection started")
            connection.query(sql + 'ORDER BY timeDate' ,(err, rows) => {
                if (err) {
                    throw err;
                }

                if (rows!=null && rows.length>0) {
                    var i
                    var data = []
                    for (i = 0; i < rows.length; i++) {

                        var obj = {
                            status: "success",
                            locationID: rows[i].locationID,
                            timeDate: rows[i].timeDate,
                            AtmosphericPressure: rows[i].AtmosphericPressure,
                            WindDirection: rows[i].WindDirection,
                            WindSpeed: rows[i].WindSpeed,
                            Gust: rows[i].Gust,
                        }
                        data.push(obj)
                    }
                    res.send(data);
                    console.log('data found')
                }
                else{
                    var obj1 = {
                        status: "none"
                    }
                    res.send(obj1);
                    console.log('no data found')

                }
            });
            connection.release();
            console.log("connection ended")
        })
    })
});


app.listen(port);
