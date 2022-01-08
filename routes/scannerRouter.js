const router = require("express").Router();
const Scanner = require("../models/ScannerModel");
// const auth = require("../middleware/auth");

router.post("/",   async (req, res) => {
  const newScanner = new Scanner(req.body);
  try {
    const savedScanner = await newScanner.save();
    res.status(200).json(savedScanner);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id",   async (req, res) => {
  try {
      const updatedScanner = await Scanner.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedScanner);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete("/:id",   async (req, res) => {
  try {
    const Scanner = await Scanner.findById(req.params.id);
      try {
          await Scanner.delete();
          res.status(200).json("Scanner has been deleted.");
      } catch(err) {
          res.status(500).json(err);
      }
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get("/:id",   async (req, res)=> {
    try {
      const Scanner = await Scanner.findById(req.params.id);
      res.status(200).json(Scanner);
    } catch (err) {
      res.status(500).json(err);
    }
})

router.get("/",   async (req, res) => {
  try {
    const Scanners = await Scanner.find();
    res.json(Scanners);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;