const router = require("express").Router();
const Movement = require("../models/movementModel");
// const auth = require("../middleware/auth");

router.post("/",   async (req, res) => {
  const newMovement = new Movement(req.body);
  try {
    const savedMovement = await newMovement.save();
    res.status(200).json(savedMovement);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id",   async (req, res) => {
  try {
      const updatedMovement = await Movement.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovement);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete("/:id",   async (req, res) => {
  try {
    const Movement = await Movement.findById(req.params.id);
      try {
          await Movement.delete();
          res.status(200).json("Movement has been deleted.");
      } catch(err) {
          res.status(500).json(err);
      }
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get("/:id",   async (req, res)=> {
    try {
      const Movement = await Movement.findById(req.params.id);
      res.status(200).json(Movement);
    } catch (err) {
      res.status(500).json(err);
    }
})

router.get("/",   async (req, res) => {
  try {
    const Movements = await Movement.find();
    res.json(Movements);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;