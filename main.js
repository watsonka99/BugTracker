const express = require('express'),
    app = express(),
    mongoose = require("mongoose");

const indexRoutes = require("./routes/index"),
  bugsRoutes = require("./routes/bug");

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