const express = require("express");
const axios = require("axios");
const mvg = require("mvg-node");
const router = express.Router();
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const admin = require("firebase-admin");
const serviceAccount = require("../../../serviceAccountKey.json");

require("dotenv").config();

const apiKey = process.env.API_KEY;

// Get Weather
router.get("/trams", async (req, res) => {
  let home = await mvg.getStation("Mutschellestrasse");
  let departures = await mvg.getDepartures(home);

  // Get trams
  let trams = departures.filter((e) => e["product"] == "TRAM");

  res.send({ trams: trams });
});

router.get("/ubahns", async (req, res) => {
  let home = await mvg.getStation("kreillerstrasse");
  let departures = await mvg.getDepartures(home);

  // Get trams
  // let trams = departures.filter((e) => e["product"] == "TRAM");
  let ubhans = departures.filter((e) => e["product"] == "UBAHN");

  res.send({ ubahns: ubhans });
});

module.exports = router;
