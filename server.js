const express = require("express");
const path  = require("path");
const handlebars = require('express-handlebars');

const app = express();

var PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))

// Set app to use handlebar engine
app.set('view engine', 'hbs');

app.engine('hbs', handlebars({
    layoutsDir: path.join(__dirname, 'views/layouts') ,
    extname: 'hbs'
}))

// DATA

var tableData = [
{
    customerName: "Alfredo",
    customerEmail: "jorge@email.com",
    customerID: "4474774",
    phoneNumber: "000-000-000"
}
];

var waitListData = [
    {
        customerName: "Luis",
        customerEmail: "luis@email.com",
        customerID: "444332",
        phoneNumber: "N/A"
    }
    ];

// ROUTES API

app.get("/api/tables",function(req,res) {
res.json(tableData);
});

app.get("/api/waitlist",function(req,res) {
    res.json(waitListData);
    });

app.post("/api/tables",function(req,res) {

    if (tableData.length < 5){
        tableData.push(req.body)
        res.json(true);
    }
    else {
        waitListData.push(req.body)
        res.json(false);
    }
        });

app.post("/api/clear",function(req,res) {
  
    tableData = []
    waitListData = []
    res.json({ok: true})
            });


// ROUTES HTML
/*
app.get("/tables",function(req,res) {
    res.sendFile(path.join(__dirname, "public/tables.html"))
    //console.log(path.join(__dirname, "public/tables.html"))
    });*/

    app.get("/tables",function(req,res) {
        //res.sendFile(path.join(__dirname, "public/tables.html"))
        //console.log(path.join(__dirname, "public/tables.html"))
        res.render('tables',{layout:'index',tableData});
        });
    

    app.get("/reserve",function(req,res) {
        res.render('reserve',{layout:'index'});
    });

// IF no route match
    app.get("*",function(req,res) {
        //res.sendFile(path.join(__dirname, "public/home.html"))
        res.render('home',{layout:'index'});
    });


app.listen(PORT,function(){
    console.log("Server running on port: ", PORT);
})