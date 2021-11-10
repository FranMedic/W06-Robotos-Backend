require("dotenv").config();

const debug = require("debug")("robots:usertest");

const mongoose = require("mongoose");
const dataBaseInitializer = require("../../database");

beforeAll(async () => {
  await dataBaseInitializer(process.env.MONGODB_TESTS);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(() => {
  debug("Antes del test");
});

afterEach(() => {
  debug("despues del test");
});

test("test1");
