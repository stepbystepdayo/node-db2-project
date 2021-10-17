// DO YOUR MAGIC

const router = require("express").Router();
// const db = require("../../data/db-config");

const Cars = require("./cars-model");

//middleware import
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

router.get("/", (req, res) => {
  Cars.getAll()
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error all cars" });
    });
});

router.get("/:id", checkCarId, (req, res) => {
  res.status(200).json(req.cars);
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  (req, res) => {
    const newCar = req.body;
    Cars.create(newCar)
      .then((car) => {
        res.status(201).json(car);
      })
      .catch((err) => {
        res.status(500).json({ message: "Error creating teh car information" });
      });
  }
);

router.use((err, req, res) => {
  res.status(500).json({
    message: "something died",
    error: err.message,
  });
});

module.exports = router;
