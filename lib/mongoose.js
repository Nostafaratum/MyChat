'use strict'

import mongoose from 'mongoose';
import config from '../config';

mongoose.connect(config.get('mongoose:uri'));

module.exports = mongoose;