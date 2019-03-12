var express = require("express");
var router = express.Router();
var burger = require("../models/burger");

// I change `/index` to `/`, the index route should be `/` (the root)
router.get("/", function (req, res) {
    burger.all(function (data) {
        // eslint-disable-next-line no-console
        console.log(data);
        res.render("index", { burgers: data });
    });
});

router.post("/api/burgers", function (req, res) {
    // TODO: here you are passing 3 parameters to the insert method...
    // the field name, the data and the callback... but on your
    // model you defined just 2 parameters
    // You do not need to pass the field name here.
    // In any case, it should be handle by the model.
    // The controller should not deal with database details.
    burger.insert("name", req.body.name, function (result) {
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function (req, res) {
    burger.update("id", req.params.id, function (result) {
        if (result.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

module.exports = router;
