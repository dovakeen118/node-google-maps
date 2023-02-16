import local from "passport-local";

import User from "../models/User.js";

const authHandler = (email, password, done) => {
  // called when using passport's local strategy

  // take in the email, password from the sign in form, and try to use that to match a user in the DB
  // If the user is found, safely compared their password to the persisted one in the DB
  // if successful, return the user and move on, otherwise something is wrong with their credentials

  User.query()
    .findOne({ email })
    .then((user) => {
      if (user) {
        if (user.authenticate(password)) {
          return done(null, user);
        }

        return done(null, false, { message: "Invalid password credentials" });
      }
      return done(null, false, { message: "Invalid email credentials" });
    });
};

export default new local.Strategy({ usernameField: "email" }, authHandler);
// ensures that a user's identifier for authentication is their email
