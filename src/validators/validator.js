const { extend: extendValidator, configure, validateAll } = require('indicative/validator');
const { extend: extendSanatizer, sanitize } = require('indicative/sanitizer');
const { getValue, patchValue, skippable } = require('indicative-utils');
const mime = require('mime');

class Formatter {
  constructor() {
    this.errors = [];
  }

  addError(error, field) {
    // const ifAddError = this.errors.forEach((err) => {
    //   if (err.field !== field) {
    //     return false;
    //   }
    //   return true;
    // });

    // console.log(ifAddError);

    const errorExist = this.errors.find(err => err.field === field);

    if (!errorExist) {
      this.errors.push({ error, field });
    }
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


extendValidator('file', {
  validate(data, field, args, config) {
    const fieldValue = getValue(data, field);

    if (skippable(fieldValue, field, config)) {
      return true;
    }

    if (!fieldValue) {
      return false;
    }

    return true;
  },
});

extendValidator('fileSize', {
  validate(data, field, args, config) {
    const fieldValue = getValue(data, field);

    if (skippable(fieldValue, field, config)) {
      return true;
    }

    if (!fieldValue) {
      return false;
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

    if (!fieldValue) {
      return false;
    }

    if (!args.includes(mime.getExtension(fieldValue.mimetype))) {
      return false;
    }

    return true;
  },
});

const validate = (data, validateRules, sanitizeRules) => {
  let sanitizedData = data;

  if (sanitizeRules) {
    sanitizedData = sanitize(data, sanitizeRules);
  }

  return validateAll(sanitizedData, validateRules);
};

const parseFiles = (data, validateRules) => {
  if (data.files) {
    const fileFieldName = Object.keys(validateRules).find(key => (
      validateRules[key].includes('file|')
    ));

    const parsedbody = data.body;
    parsedbody[fileFieldName] = data.files.find(file => file.fieldname === 'photo') || null;

    return parsedbody;
  }

  return data.body;
};

module.exports.validateStore = (data, validateRules, sanitizeRules) => {
  const parsedData = parseFiles(data, validateRules);
  return validate(parsedData, validateRules, sanitizeRules);
};

module.exports.validateUpdate = (data, sanitizeRules, validateRules) => {
  const parsedValidateRules = Object.keys(validateRules).reduce((result, key) => {
    const parsedResult = result;
    parsedResult[key] = validateRules[key].replace('required|', '');
    return parsedResult;
  }, {});

  return validate(data, parsedValidateRules, sanitizeRules);
};
