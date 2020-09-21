const express = require("express"),
      router  = express.Router(),
      Bug = require("../models/bug");
       
router.get("/", function(req, res){
    Bug.find({}, function(err, bugs){
        if (err) {
            console.log(err);
        } else {
            res.render("index", {bugs: bugs});  
        }
    });
});

module.exports = router;