const { image, datatype } = require("faker");
const { lorem } = require("faker/locale/es");
const { Factory } = require("fishery");

const factoryRobots = Factory.define(({ sequence }) => ({
  id: sequence,
  name: lorem.words(3),
  image: image.imageUrl(),
  features: {
    velocity: datatype.number({
      min: 0,
      max: 10,
    }),
    resistance: datatype.number({
      min: 0,
      max: 10,
    }),
    creationData: datatype.string(),
  },
}));

const getFakeRobot = () => factoryRobots.build();
const getFakeRobots = (total = 3) => factoryRobots.buildList(total);

module.exports = { getFakeRobot, getFakeRobots };
