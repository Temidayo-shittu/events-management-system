const _= require('lodash')
const { Event,validate }= require('../models/event')
const {Report,validateReport}= require('../models/report')
const mongoose= require('mongoose')
const express= require('express');
const router= express.Router()
const VerifyToken = require('../middleware/VerifyToken.js');
const validateObjectId= require('../middleware/validateObjectId')
const { Attendee } = require('../models/attendee');
const admin = require('../middleware/admin');


//APPROING EVENTS
router.patch('/approve/:id', [VerifyToken, admin], async (req,res)=>{
    const status = 'Approved';
    const event = await Event.findByIdAndUpdate(req.params.id,{
        status: status
    }, {new: true})

    if(!event) res.status(404).send('The event with the given ID was not found')
    res.send(event)   
});

// REJECTED EVENTS
router.patch('/reject/:id', [VerifyToken, admin], async (req,res)=>{
    const status = 'Rejected';
    const event = await Event.findByIdAndUpdate(req.params.id,{
        status: status
    }, {new: true})

    if(!event) res.status(404).send('The event with the given ID was not found')

    // mail.send({
    //     message: An event is clashing with another pproved this day
    // })
    res.send(event)   
})


module.exports= router;