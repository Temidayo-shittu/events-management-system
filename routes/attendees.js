const _= require('lodash')
const { Attendee,validate }= require('../models/attendee')
const {Event}= require('../models/event')
const mongoose= require('mongoose')
const express= require('express');
const router= express.Router();

const VerifyToken = require('../middleware/VerifyToken.js');

//FOR GETTING A GENERAL ATTENDEE OVERVIEW
router.get('/', VerifyToken, async (req,res)=>{
    const attendees= await Attendee.find().sort('fullName').populate('eventId','name')
    res.send(attendees)
})

//FOR CREATING A NEW ATTENDEE
router.post('/', VerifyToken, async (req,res)=>{
    const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const event = await Event.findById(req.body._id);
    if(!event) return res.status(400).send('The event with the given ID not found')
   // _.pick(req.body,['fullName','email','cityLocation','event'])
    let attendee= new Attendee({
        fullName: req.body.fullName,
        email:  req.body.email,
        cityLocation: req.body.cityLocation,
        eventId: req.body._id,
        eventName: req.body.eventName
    })
    attendee = await attendee.save()
    res.send(attendee)

})

//FOR UPDATING A NEW ATTENDEE
router.put('/:id', VerifyToken, async (req,res)=>{
    const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const attendee= await Attendee.findByIdAndUpdate(req.params.id,{
        fullName:req.body.fullName,
        email: req.body.email,
        cityLocation: req.body.cityLocation,
        eventId: req.body._id,
        eventName: req.body.eventName
    }, {new: true})

    if(!attendee) return res.status(404).send('The attendee with the given ID was not found')
    res.send(attendee)   
})

//FOR DELETING A NEW ATTENDEE
router.delete('/:id', VerifyToken, async (req,res)=>{
    const attendee= await Attendee.findByIdAndRemove(req.params.id)
    if (!attendee) return res.status(404).send("The attendee with the given ID was not found.");
    res.send(attendee)
    })

//FOR GETTING A SPECIFIC ATTENDEE
router.get('/:id', async (req,res)=>{
    const attendee= await Attendee.findById(req.params.id)
    if(!attendee) return res.status(404).send('The attendee with the given ID was not found')
    res.send(attendee)
    })

//NOTE: each module should be responsible for doing one thing.Hence the need for the 
//Single Responsiblity Module Principle

module.exports= router;