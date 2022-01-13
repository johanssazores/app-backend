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


router.post("/all-analytics", async (req, res) => {
  try {
    const sharedFilter = {};

    if (req.body.address && req.body.role === 'QC-BARANGAY-DPO') {
      sharedFilter.streetName = req.body.address;
    }

    if (req.body.startDate || req.body.endDate) sharedFilter.createdAt = {};
    if (req.body.startDate) sharedFilter.createdAt.$gte = req.body.startDate;
    if (req.body.endDate) sharedFilter.createdAt.$lte = req.body.endDate;
    
    const personsCounts = await Person.find({
    }).countDocuments();

    const personsCountsPregnant = await Person.find({
      ...sharedFilter,
      pregnant: "Yes",
    }).countDocuments();

    const personsCountsMaintenance = await Person.find({
      ...sharedFilter,
      withMaintenance: "Yes"
    }).countDocuments();

    const personsCountsMale = await Person.find({
      ...sharedFilter,
      sex: "Male"
    }).countDocuments();
    
    const personsCountsFemale = await Person.find({
      ...sharedFilter,
      sex: "Female"
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