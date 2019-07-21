const { update, create } = require('./validator');

const validateRules = {
  name: 'required|min:1|max:256',
  photo: 'required|fileSize:1|fileExt:png,jpg,jpeg',
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

module.exports.validateCreate = data => create(data, sanitizeRules, validateRules);
module.exports.validateUpdate = data => update(data, sanitizeRules, validateRules);
