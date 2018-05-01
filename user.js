'use strict';

const crypto = require('crypto');

import mongoose from '../lib/mongoose';
let Schema = mongoose.Schema;

let schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

schema.virtual('password')
  .set(function(password){
    const cipher = crypto.createCipher('aes192', 'qwerty');
    let encrypted = '';

    cipher.on('readable', () => {
      const data = cipher.read();
      if (data)
        encrypted += data.toString('hex');
    });
    
    cipher.on('end', () => {
    });

    cipher.write(password);
    cipher.end();
    this.hashedPassword = encrypted;
  })
  .get(function(){
    const decipher = crypto.createDecipher('aes192', 'qwerty');
    let decrypted = '';

    decipher.on('readable', () => {
      const data = decipher.read();
      if (data)
        decrypted += data.toString('utf8');
    });

    decipher.on('end', () => {
    });

    decipher.write(this.hashedPassword, 'hex');
    decipher.end();
    return decrypted;
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