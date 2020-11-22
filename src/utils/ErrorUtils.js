/* eslint-disable lines-around-directive */
// eslint-disable-next-line max-classes-per-file
'use strict';

const ErrorUtils = module.exports;

class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class BadRequestError extends HttpError {
  constructor(message = 'Bad request') {
    super(message);
    this.status = 400;
  }
}

class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(message);
    this.status = 401;
  }
}

class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden') {
    super(message);
    this.status = 403;
  }
}

class NotFoundError extends HttpError {
  constructor(message = 'Not found') {
    super(message);
    this.status = 404;
  }
}

ErrorUtils.HttpError = HttpError;

ErrorUtils.BadRequestError = BadRequestError;

ErrorUtils.UnauthorizedError = UnauthorizedError;

ErrorUtils.ForbiddenError = ForbiddenError;

ErrorUtils.NotFoundError = NotFoundError;

ErrorUtils.getErrorLog = ({ message, status }) => `${message} :: status ${status}`;
