const router = require("express").Router();
const Division = require("../models/divisionModel");
// const auth = require("../middleware/auth");

router.post("/",   async (req, res) => {
  const newDivision = new Division(req.body);
  try {
    const savedDivision = await newDivision.save();
    res.status(200).json(savedDivision);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id",   async (req, res) => {
  try {
      const updatedDivision = await Division.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedDivision);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete("/:id",   async (req, res) => {
  try {
    const division = await Division.findById(req.params.id);
      try {
          await division.delete();
          res.status(200).json("Division has been deleted.");
      } catch(err) {
          res.status(500).json(err);
      }
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get("/:id",   async (req, res)=> {
    try {
      const division = await Division.findById(req.params.id);
      res.status(200).json(division);
    } catch (err) {
      res.status(500).json(err);
    }
})

router.get("/",   async (req, res) => {
  try {
    const divisions = await Division.find();
    res.json(divisions);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;