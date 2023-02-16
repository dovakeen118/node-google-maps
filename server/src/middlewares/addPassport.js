import passport from "passport";
import strategy from "../authentication/passportStrategy.js";
import deserializeUser from "..//authentication/deserializeUser.js";

const addPassport = (app) => {
  app.use(passport.initialize()); // boot up passport
  app.use(passport.session()); // use session cookies for knowing who is logged in
};

passport.use(strategy); // use the strategy we have to look up a user by id to see if they existed  
passport.serializeUser((user, done) => {
  done(null, user.id);
}); // upon login, only store the user's id in the session. 

passport.deserializeUser(deserializeUser); // whenever we see if the user is logged in, find the user by the id stored in the session and return that user 
export default addPassport;
