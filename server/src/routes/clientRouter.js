import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

const clientRoutes = [
  "/",
  "/advanced-js-loader-map",
  "/react-google-map",
  "/simple-js-loader-map",
  "/user-sessions/new",
  "/users/new",
  "/vanilla-google-map"
];

const authedClientRoutes = ["/authed-profile"];

router.get(clientRoutes, (req, res) => {
  console.log(req.user)
  res.sendFile(getClientIndexPath());
});

router.get(authedClientRoutes, (req, res) => {
  
  console.log(req.user)
  if (req.user) {
    res.sendFile(getClientIndexPath());
  } else {
    res.redirect("/user-sessions/new");
  }
});

export default router;
