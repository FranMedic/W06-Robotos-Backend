const { Schema, model } = require("mongoose");

const featuresSchema = new Schema({
  velocity: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  resistance: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  creationData: {
    type: String,
    required: true,
  },
});

const robotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  features: {
    type: featuresSchema,
    required: true,
  },
});

const Robot = model("Robot", robotSchema, "Robots");

module.exports = Robot;
