const { validateStore, validateUpdate } = require('./validator');

const validateRules = {
  name: 'required|min:1|max:256',
  photo: 'required|file|fileSize:1|fileExt:png,jpg,jpeg',
  description: 'max:256',
  activated: 'boolean',
  price: 'required|float|range:0.01,99999999.99',
  quantity: 'required|integer|range:0,9999999999',
};

const sanitizeRules = {
  name: 'trim',
  description: 'trim',
  price: 'money',
};

module.exports = {
  validateStore: (body, files) => validateStore({ body, files }, validateRules, sanitizeRules),
  validateUpdate: data => validateUpdate(data, sanitizeRules, validateRules),
};
