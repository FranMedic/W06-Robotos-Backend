require("dotenv").config();
const debug = require("debug")("robots:testroute");
const chalk = require("chalk");

const mongoose = require("mongoose");
const supertest = require("supertest");
const dataBaseInitializer = require("../../database");
const Robot = require("../../database/models/robot");
const { app, initializeServer } = require("..");

let server;
let token;

const request = supertest(app);
const newrobot = {
  name: "Wall-Y ",
  image: "https://filmfilicos.com/wp-content/uploads/2020/06/wall-e.jpg",
  features: {
    velocity: 10,
    resistance: 5,
    creationData: "2019-11-24",
  },
};

beforeAll(async () => {
  await dataBaseInitializer(process.env.MONGODB_TESTS);
  server = await initializeServer(process.env.SERVER_PORT_TEST);
});

beforeEach(async () => {
  const loginResponse = await request
    .post("/users/login")
    .send({ username: "thegreatfranny", password: "zoylamazmejor" })
    .expect(200);

  token = loginResponse.body.token;
  console.log(token);

  await Robot.deleteMany();
  await Robot.create({
    _id: "618560f227992e4f22e6ae6b",
    name: "MangoBB",
    image:
      "https://www.avforums.com/styles/avf/editorial/block//fac1e024ab104fa9939221aa7a592a15_3x3.jpg",
    features: {
      velocity: 2,
      resistance: 5,
      creationData: "2015-06-05",
    },
  });
  await Robot.create({
    _id: "6185611d27992e4f22e6ae6c",
    name: "Manivela",
    image:
      "https://images.hobbydatabase.com/processed_uploads/subject_photo/subject_photo/image/40952/1530552727-31404-3391/Fender_20Pinwheeler_large.jpg",
    features: {
      velocity: 8,
      resistance: 7,
      creationData: "2012-11-24",
    },
  });
});

afterAll(async () => {
  await mongoose.connection.on("close", () => {
    debug(chalk.red("Connection with database finished, now i die"));
  });
  await mongoose.connection.close();
  await server.on("close", () => {
    debug(chalk.red("Connection with server finished, and now you die"));
  });
  await server.close();
});

describe("Given a /robots router", () => {
  describe("when a get request to /robots arrives", () => {
    test("then it should respond with and array of robots and a 200 status", async () => {
      debug(chalk.green("Inside the test"));

      const { body } = await request
        .get("/robots")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      const expectedRobot = {
        __v: 0,
        _id: "618560f227992e4f22e6ae6b",
        name: "MangoBB",
        image:
          "https://www.avforums.com/styles/avf/editorial/block//fac1e024ab104fa9939221aa7a592a15_3x3.jpg",
        features: {
          velocity: 2,
          resistance: 5,
          creationData: "2015-06-05",
        },
      };

      expect(body).toHaveLength(2);
      expect(body).toContainEqual(expectedRobot);
    });
  });

  describe("when a post request to /robots/create arrives with a robot", () => {
    test("then it should respond with an status 201", async () => {
      const { body } = await request
        .get("/robots/create")
        .set("Authorization", `Bearer ${token}`)
        .send(newrobot);

      console.log(`${body}patata`);
    });
  });
});
