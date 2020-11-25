'use strict';

const Ajv = require('ajv');

const { BadRequestError } = require('./ErrorUtils');

const SchemaUtils = module.exports;

SchemaUtils.validateSchema = (schema, data) => {
  const ajv = new Ajv();
  const compiler = ajv.compile(schema);

  const isValid = compiler(data);

  if (!isValid) {
    const validationError = compiler.errors[0];
    const { message, dataPath = '' } = validationError;
    const errorMessage = `${dataPath.replace('.', '')} ${message.replace('.', '')}`;

    throw new BadRequestError(errorMessage);
  }

  return isValid;
};
