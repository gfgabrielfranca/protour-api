const Vehicle = require('./Vehicle');

const models = {
  Vehicle,
};

// const parsedModels = Object.keys(models).reduce((result, key) => {
//   models[key].show = () => 'a';

//   const parsedResult = result;

//   parsedResult.show = () => 'a';

//   return parsedResult;

//   return 'a';
// }, {});

module.exports = models;
