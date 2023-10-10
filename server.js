const express = require("express"),
    path = require("path"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    routes = require("./routes/routes.js"),
    app = express(),
    port = process.env.PORT || 5000,
    mysql = require('mysql');

require("dotenv").config({ path: ".env" });
app.use("/rdp/", express.static(`${__dirname}/client/build/`));
app.use("/rdp/*", express.static(`${__dirname}/client/build/`));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

const server = require("http").Server(app);

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "kmg20030116@",
    database: "rdp"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Mysql Connected!");
});

app.post("/fetch", function (req, res) {
    con.query("select * from connections", function (err, result, fields) {
        if (err) {
            res.json({
                result: "failed"
            });
            throw err;
        }
        res.json({
            result: "success",
            data: result
        })
    });
})

app.post("/signin", function (req, res) {
    // ---- ADFS SignIn Flow Start ----
    // ---- ADFS SignIn Flow End ----
    con.query(`select * from users where email='${req.body.email}'`, function (err, result, fields) {
        if (err) {
            res.json({
                result: "failed"
            });
            throw err;
        }
        if (result.length == 0){
            res.json({
                result: "failed"
            });
            return;
        }
        res.json({
            result: "success",
            name: result[0].name,
            email: result[0].email
        })
    });
})

app.post("/signup", function (req, res) {
    // ---- ADFS SignUp Flow Start ----
    // ---- ADFS SignUp Flow End ----
    con.query(`insert into users (name, email) VALUES ('${req.body.name}', '${req.body.email}')`, function (err, result, fields) {
        if (err) {
            res.json({
                result: "failed"
            });
            throw err;
        }
        res.json({
            result: "success"
        })
    });
})

server.listen(port, () => console.log(`Server is running on Port ${port}`));