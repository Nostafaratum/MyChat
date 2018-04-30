'use strict';

import session from 'express-session';
import mongoose from '../lib/mongoose';

let MongoStore = require("connect-mongo")(session);
let SessionStore = new MongoStore({ mongooseConnection: mongoose.connection });
export default SessionStore;