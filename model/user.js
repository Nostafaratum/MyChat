'use strict';

import mongoose from '../lib/mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export let User = mongoose.model("user", schema);

export default class UserError extends Error {
  constructor(message, status){
    super(message);
    this.status = status;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
export class AuthError extends UserError {
  constructor(message) {
    super(message, 404);
  }
}

export class FoundError extends UserError {
  constructor(message) {
    super(message, 403);
  }
}