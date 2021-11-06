const router = require("express").Router();
const Division = require("../models/divisionModel");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { division } = req.body;

    const newDivision = new Divsion({
      division,
    });

    const savedDivision = await newDivision.save();

    res.json(savedDivision);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const divisions = await Division.find();
    res.json(divisions);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;