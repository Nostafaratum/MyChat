'use strict';

import { User } from '../model/user';
import mongoose from '../lib/mongoose';
//import chai from 'chai';

const expect = require('chai').expect;
const should = require('chai').should();

describe("User testing", () => {
    describe("Add new User", () => {
        
        after(() => {
            return User.deleteOne({ username: "UserToCheckForAdditions" })
        });
        
        it("Add new user", () => {
            if(mongoose.models.user) {
                let userToAdd = new User({ username: "UserToCheckForAdditions", 
                    password: "password" });
                return userToAdd.save()
                    .then(() => User.findOne({ username : "UserToCheckForAdditions" }))
                    .then(user => {
                        expect(userToAdd.username).to.equals(user.username);
                    });
            }
            else
                this.skip();
        });

        it("Add an existing user", () => {
            if(mongoose.models.user) {
                let user = new User ({ username : "UserToCheckForAdditions", 
                    password : "password"});
                return user.save((err) => {
                    should.exist(err);
                });
            }
            else
                this.skip();
        });

        it("Adding a user without a password", () => {
            if(mongoose.models.user) {
                let user = new User ({ username : "UserToCheckForAdditions"});
                return user.save((err) => {
                    should.exist(err);
                });
            }
            else
                this.skip();
        });

        it("Adding a user without a username", () => {
            if(mongoose.models.user) {
                let user = new User ({ password: "password"});
                return user.save((err) => {
                    should.exist(err);
                });
            }
            else
                this.skip();
        });
    });
});