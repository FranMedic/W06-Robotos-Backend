require("dotenv").config();
const debug = require("debug")("robots:testroute");
const chalk = require("chalk");
const mongoose = require("mongoose");
const supertest = require("supertest");

const dataBaseInitializer = require("../../database");
const Robot = require("../../database/models/robot");
const { initializeServer, app } = require("..");

let server;
let token;

const fakeRobots = [
  {
    _id: "618560f227992e4f22e6ae6b",
    name: "MangoBB",
    image:
      "https://www.avforums.com/styles/avf/editorial/block//fac1e024ab104fa9939221aa7a592a15_3x3.jpg",
    features: { velocity: 2, resistance: 5, creationData: "2015-06-05" },
  },
  {
    _id: "6185611d27992e4f22e6ae6c",
    name: "Manivela",
    image:
      "https://images.hobbydatabase.com/processed_uploads/subject_photo/subject_photo/image/40952/1530552727-31404-3391/Fender_20Pinwheeler_large.jpg",
    features: { velocity: 8, resistance: 7, creationData: "2012-11-24" },
  },
];

jest.setTimeout(10000);

const request = supertest(app);

beforeAll(async () => {
  await dataBaseInitializer(process.env.MONGODB_TESTS);
  await Robot.deleteMany({});
  server = await initializeServer(process.env.SERVER_PORT_TEST);

  const loginResponse = await request
    .post("/users/login")
    .send({ username: "thegreatfranny", password: "zoylamazmejor" })
    .expect(200);

  token = loginResponse.body.token;
  console.log(token);
});

beforeEach(async () => {
  await Robot.deleteMany({});
  await Robot.create(fakeRobots[0]);
  await Robot.create(fakeRobots[1]);
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.connection.close();
    done();
    debug(chalk.red("server closed NOW YOU DIE!"));
  });
});

describe("Given a /robots router", () => {
  describe("when a get request to /robots arrives", () => {
    test("then it should respond with and array of robots and a 200 status", async () => {
      debug(chalk.green("Inside the test"));

      const { body } = await request
        .get("/robots")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      const fakeRobotsWithId = fakeRobots.map((fakeRobot) => {
        const fakeRobotWithId = {
          ...fakeRobot,
          // eslint-disable-next-line no-underscore-dangle
          id: fakeRobot._id,
        };
        // eslint-disable-next-line no-underscore-dangle
        delete fakeRobotWithId._id;

        return fakeRobotWithId;
      });
      console.log(fakeRobotsWithId);
      expect(body).toHaveLength(2);
      expect(body).toContainEqual(fakeRobotsWithId[1]);
    });
  });
});
/*
  describe("when a post request to /robots/create arrives with a robot", () => {
    test.skip("then it should respond with an status 201", async () => {
      const { body } = await request
        .get("/robots/create")
        .set("Authorization", `Bearer ${token}`)
        .send(newrobot);

      console.log(`${body}patata`);
    });
  });
*/
