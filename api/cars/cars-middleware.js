const { restart } = require("nodemon");
const Cars = require("./cars-model");
var vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  const id = req.params.id;
  await Cars.getById(id).then((cars) => {
    if (!cars) {
      // console.log(cars);
      res.status(404).json({ message: `car with id ${id} is not found` });
    } else {
      req.cars = cars;
      next();
    }
  });
};

const checkCarPayload = (req, res, next) => {
  const payload = req.body;
  if (payload.vin === undefined) {
    res.status(400).json({ message: "vin is missing" });
  } else if (payload.make === undefined) {
    res.status(400).json({ message: "make is missing" });
  } else if (payload.model === undefined) {
    res.status(400).json({ message: "model is missing" });
  } else if (payload.title === undefined) {
    res.status(400).json({ message: "title is missing" });
  } else if (payload.mileage === undefined) {
    res.status(400).json({ message: "mileage is missing" });
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  const vinChecking = req.body.vin;
  if (vinValidator.validate(vinChecking) !== true) {
    res.status(400).json({ message: `vin ${vinChecking} is invalid` });
  } else {
    next();
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  const vinUnique = req.body.vin;
  const currentCars = await Cars.getAll();
  console.log("check current car array for vin", currentCars);
  const [sameVin] = currentCars.filter((car) => car.vin === vinUnique);

  console.log("does sameVin exist?", sameVin);
  if (sameVin) {
    console.log("does this trigger?");
    res.status(400).json({ message: `vin ${vinUnique} already exists` });
  } else {
    next();
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
