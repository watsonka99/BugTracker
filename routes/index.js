const express = require("express"),
      router = express.Router(),
      models = require("../models");
    
router.get("/", function(req, res){
    res.render("landing")
});