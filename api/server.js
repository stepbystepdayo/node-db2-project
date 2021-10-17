const express = require("express");

const carRouter = require("./cars/cars-router");

const server = express();

// DO YOUR MAGIC
server.use(express.json());

server.use("/api/cars", carRouter);

server.get("/", (req, res) => {
  res.send("hello! Im alive!");
});

module.exports = server;
