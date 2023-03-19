const _ = require("lodash");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { validate, Organiser } = require("../models/organiser");
const express = require("express");
const router = express.Router();
const VerifyToken= require('../middleware/VerifyToken')
const jwt= require('jsonwebtoken')



router.get('/me', VerifyToken, async(req,res)=>{
  const organiser= await Organiser.findById(req.organiser._id).select('-password')
  res.send(organiser)
})

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

   let organiser = await Organiser.findOne({ email: req.body.email });
   if (organiser) res.status(400).send("User already registered");
  organiser = new Organiser(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  organiser.password = await bcrypt.hash(organiser.password, salt);
  organiser = await organiser.save();
  const token= organiser.generateAuthToken()
  res.header('x-auth-token',token).send(_.pick(organiser, ["_id", "name", "email"]));
});

module.exports = router;
