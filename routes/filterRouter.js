const router = require("express").Router();
const Person = require("../models/personModel");

router.post("/street", async (req, res) => {
  try {
    const persons = await Person.find({
      streetName: req.body.street
    });
    const personsCount = await Person.find({
      streetName:  req.body.street
    }).countDocuments();

    res.json({persons, personsCount});
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});


module.exports = router;