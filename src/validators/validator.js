const { getValue, patchValue, skippable } = require('indicative-utils');
const { extend: extendValidator, configure, validateAll } = require('indicative/validator');
const { extend: extendSanatizer, sanitize } = require('indicative/sanitizer');
const mime = require('mime');

class Formatter {
  constructor() {
    this.errors = [];
  }

  addError(error, field) {
    this.errors.push({ error, field });
  }

  toJSON() {
    return this.errors.length ? this.errors : null;
  }
}

configure({
  existyStrict: true,
  removeAdditional: true,
  formatter: Formatter,
});

extendSanatizer('money', {
  sanitize(data, field, args, config) {
    const fieldValue = getValue(data, field);

    if (skippable(fieldValue, field, config)) {
      return;
    }

    patchValue(data, field, parseFloat(fieldValue).toFixed(2));
  },
});

extendValidator('fileSize', {
  validate(data, field, args, config) {
    const fieldValue = getValue(data, field);

    if (skippable(fieldValue, field, config)) {
      return true;
    }

    if (fieldValue.size > args[0] * 1024 * 1024) {
      return false;
    }

    return true;
  },
});

extendValidator('fileExt', {
  validate(data, field, args, config) {
    const fieldValue = getValue(data, field);

    if (skippable(fieldValue, field, config)) {
      return true;
    }

    if (!args.includes(mime.getExtension(fieldValue.mimetype))) {
      return false;
    }

    return true;
  },
});

const validate = (data, sanitizeRules, validateRules) => {
  const sanitizedData = sanitize(data, sanitizeRules);
  return validateAll(sanitizedData, validateRules);
};

module.exports.create = (data, sanitizeRules, validateRules) => (
  validate(data, sanitizeRules, validateRules)
);

module.exports.update = (data, sanitizeRules, validateRules) => {
  const parsedValidateRules = Object.keys(validateRules).reduce((result, key) => {
    const parsedResult = result;
    parsedResult[key] = validateRules[key].replace('required|', '');
    return parsedResult;
  }, {});

  return validate(data, sanitizeRules, parsedValidateRules);
};
