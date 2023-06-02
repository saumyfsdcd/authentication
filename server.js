const express= require("express");
const ejs= require("ejs");
const mongoose= require("mongoose");
const bodyParser = require("body-parser");
const app=express();

app.set("view engine", "ejs")
mongoose.connect("mongodb+srv://samcode:bhagwati@cluster1.gn7ronj.mongodb.net/authenticate",{
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true
}).catch((e)=>{
    console.log(e)
})

var d="Cristiano Ronaldo";

const userSchema=new mongoose.Schema({
    username: String,
    password: String
})

const users=new mongoose.model("users", userSchema);
const secrets = new mongoose.model("secrets", {
    secret: String
})

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req,res)=>{
    d="Cristiano Ronaldo";
    res.render("home")
})

app.get("/register", (req,res)=>{
    res.render('register')
})

app.get("/login", (req,res)=>{
    res.render("login")
})

app.post("/register", (req,res)=>{
    const data= new users({
        username: req.body.username,
        password: req.body.password
    })
    data.save();
    res.render("secrets", {d: d})
})


app.get("/logout", (req,res)=>{
    res.render("home")
})

app.get("/submit", (req,res)=>{
    res.render("submit")
})

app.post("/submit", (req,res)=>{
    d=req.body.secret;
    const sec= new secrets({
        secret: d
    })
    sec.save();
    res.render("secrets", {d:d})
})

app.post("/login", (req,res)=>{
    users.findOne({username: req.body.username})
    .then((data)=>{
        if(data.password===req.body.password){
            res.render("secrets", {d:d})
        }
        res.redirect("/")
    })  
    .catch((err)=>{
        res.redirect("/")
        console.log("error")
    })
})

var port=process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Server started on port "+port)
})
