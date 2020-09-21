const express = require("express"),
      router  = express.Router(),
      Bug = require("../models/bug");

// INDEX
router.get("/", function(req, res){
    Bug.find({}, function(err, bugs){
        if (err) {
            console.log(err);
        } else {
            res.render("index", {bugs: bugs});  
        }
    });
});

// NEW
router.get("/new", function(req, res){
    res.render("new");
})




module.exports = router;