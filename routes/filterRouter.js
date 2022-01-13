const router = require("express").Router();
const Person = require("../models/personModel");
const User = require("../models/userModel");

router.post("/street", async (req, res) => {
  try {

    if(req.body.role === 'ADMINISTRATOR') {
      const persons = await Person.find({});
      const personsCount = await Person.find({}).countDocuments();
      res.json({persons: persons, personsCount: personsCount});
    }

    if(req.body.role === 'QC-LGU-DPO') {
      const persons = await Person.find({});
      const personsCount = await Person.find({}).countDocuments();
      res.json({persons: persons, personsCount: personsCount});
    }

    if(req.body.role === 'QC-BARANGAY-DPO') {
      const persons = await Person.find({
        streetName: req.body.streetName
      });
      const personsCount = await Person.find({
        streetName:  req.body.streetName
      }).countDocuments();
      res.json({persons: persons, personsCount: personsCount});
    }

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.post("/user", async (req, res) => {
  try {
    const users = await User.find({
      address: req.body.address
    });
    res.json({users: users});
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});


router.get("/all-analytics", async (req, res) => {
  try {
    // const persons = await Person.find({
    //   streetName: "Don Crispulo",
    // });

    const personsCounts = await Person.find({
    }).countDocuments();

    const personsCountsPregnant = await Person.find({
      pregnant: "Yes",
      createdAt: {
        $gte: req.query.startDate,
        $lte: req.query.endDate
      }
    }).countDocuments();

    const personsCountsMaintenance = await Person.find({
      withMaintenance: "Yes",
      createdAt: {
        $gte: req.query.startDate,
        $lte: req.query.endDate
      }
    }).countDocuments();

    const personsCountsMale = await Person.find({
      sex: "Male",
      createdAt: {
        $gte: req.query.startDate,
        $lte: req.query.endDate
      }
    }).countDocuments();
    
    const personsCountsFemale = await Person.find({
      sex: "Female",
      createdAt: {
        $gte: req.query.startDate,
        $lte: req.query.endDate
      }
    }).countDocuments();


    res.json([
      personsCounts, 
      personsCountsPregnant,
      personsCountsMaintenance,
      personsCountsMale,
      personsCountsFemale
    ]);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});


module.exports = router;