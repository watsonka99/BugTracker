const express = require('express'),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    flash = require("connect-flash"),
    LocalStrategy = require("passport-local");

const indexRoutes = require("./routes/index"),
    bugsRoutes = require("./routes/bug"),
    User = require("./models/user"),
    Bug = require("./models/bug");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public"))
app.use(methodOverride("_method"));
app.use(flash());
// passport config
app.use(require("express-session")({
    secret:"A lot of random words in a sentance",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.set("view engine", "ejs");
app.use(indexRoutes);
app.use("/bugs", bugsRoutes);

mongoose.connect("mongodb://localhost:27017/auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));   

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});