'use strict';

export default class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends HttpError {
  constructor(message) {
    super(message, 404);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message) {
    super(message, 403);
  }
}

export class InternalError extends HttpError {
  constructor(message) {
    super(message, 500);
  }
}