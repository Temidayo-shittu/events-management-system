const request= require('supertest')
const {Event}= require('../../models/event')

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
   }) 
