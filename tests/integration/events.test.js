const request= require('supertest')
const {Event}= require('../../models/event')
const {Organiser}= require('../../models/organiser')

let server;

describe('/events',()=>{
    beforeEach(()=>{server= require('../../index')})
    afterEach(async ()=>{
        server.close();
        await Event.remove({})
    })
    describe ('GET /', ()=>{
        it('should return all events', async ()=>{
            await Event.collection.insertMany([{ name:'Event1'},{name:'Event2'}])
            const res= await request(server).get('/events');
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)
            expect(res.body.some(e=> e.name==='Event1')).toBeTruthy();
            expect(res.body.some(e=> e.name==='Event2')).toBeTruthy();
        })
    })
    describe('GET /:id', ()=>{
        it('should return an event if a valid ID is passed',async()=>{
            const event= new Event({name:'Event1'})
            await event.save()
            const res= await request(server).get(`/events/${event._id}`)
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('name',event.name)
        })
    })
    describe('POST /', ()=>{
        it('should return 401 if organiser isnt logged in', async ()=>{
            const res= await request(server).post('/events').send({name:'Event1'})
            expect(res.status).toBe(401)
        })
        it('should return 400 if event has less than 5 characters', async ()=>{
            const token= new Organiser().generateAuthToken()
            const res= await request(server).post('/events').set('x-auth-token',token).send({name:'1234'})
            expect(res.status).toBe(400)
        })
        it('should return 400 if event has more than 50 characters', async ()=>{
            const name= new Array(52).join('a')
            const token= new Organiser().generateAuthToken()
            const res= await request(server).post('/events').set('x-auth-token',token).send({name:name})
            expect(res.status).toBe(400)
        })
        it('should save the event if it is valid', async ()=>{
            const token= new Organiser().generateAuthToken()
            const res= await request(server).post('/events').set('x-auth-token',token).send({name:'Event1'})
            const event= await Event.find({name:'Event1'})
            expect(event).not.toBeNull(400)
        })
        it('should return the event if it is valid', async ()=>{
            const token= new Organiser().generateAuthToken()
            const res= await request(server).post('/events').set('x-auth-token',token).send({name:'Event1'})
            expect(res.body).toHaveProperty('name','Event1')
        })
    })

   }) 
