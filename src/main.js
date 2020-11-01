const mysql = require("mysql");
const bodyParser = require('body-parser');
const express = require("express");
const app = express();

// initial and connect database
const init = mysql.createConnection(
    {
        host: "208.109.8.4",
        user: "developer",
        password: "chaluideveloper",
        database: "education"
    }
);
init.connect(function(error) {
    if (error) throw error;
    console.log("connected");
});

// agree body type request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router basic
app.post("/basic", function(req, res) {
    let response = { query: null, code: 200, value: [] };
    if (req.body.animal) {
        if (req.body.animal == "cat") {
            response.value.push({ animals: "cat", people: "soup" });
        }
    }
    response.value.push({ animals: "dog", people: "max" });
    res.json(response);
});

// router advance
app.post("/advance", function(req, res) {
    let response = { query: null, code: 200, value: [] };
    let condition = "";
    if ( req.body.nickname ) {
        condition = " WHERE nickname = '" + req.body.nickname + "'";
    }
    let sql = "SELECT * FROM students" + condition;
    init.query(sql, function(error ,result) {
        if (error) throw error;
        response.value = result;
        res.json(response);
    });    
});

// start server
app.listen(10000, () => { console.log("listen port 10000"); });