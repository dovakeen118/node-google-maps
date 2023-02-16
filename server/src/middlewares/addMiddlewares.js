import addEnvironmentMiddlewares from "./addEnvironmentMiddlewares.js";
import addExpressSession from "./addExpressSession.js";
import addClientMiddlewares from "./addClientMiddlewares.js";
import addPassport from "./addPassport.js";

const addMiddlewares = async app => {
  addExpressSession(app); // tells our app our store cookies in a session, using a hidden key for encryption, and with a specific half life
  addPassport(app); // configure all of the passport stuff to quickly use sessions to login and retrieve the user object as needed
  await addClientMiddlewares(app); // ignore, helpful configuration for when we deploy our apps 
  await addEnvironmentMiddlewares(app); // basically makes our app noiser when in development mode ("localhost:3000")
};



export default addMiddlewares;
