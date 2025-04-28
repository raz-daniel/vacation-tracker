import { sign } from "jsonwebtoken"
import app, { start } from "../app"
import request from "supertest"
import config from "config"


describe('vacations router tests', () => {

    describe('/ endpoint tests', () => {
        let jwt: string;
    
        beforeEach(async () => {
            await start()
            jwt = sign({ id: '6b6cb3ce-871f-4554-bf23-723b15d2be74' }, config.get<string>('app.jwtSecret'))
        })
    
        test('it should return 401 if no authorization header', async () => {
            const result = await request(app).get('/vacations')
            expect(result.statusCode).toBe(401)
        })
    
        test('it should return vacations with pagination data', async () => {
            const result = await request(app)
                .get('/vacations')
                .set({ 'Authorization': `Bearer ${jwt}` })
            
            expect(result.statusCode).toBe(200)
            expect(result.body).toHaveProperty('vacations')
            expect(Array.isArray(result.body.vacations)).toBeTruthy()
            expect(result.body).toHaveProperty('totalItems')
            expect(result.body).toHaveProperty('totalPages')
            expect(result.body).toHaveProperty('currentPage')
            expect(result.body).toHaveProperty('limit')
        })
    
        test('it should respect pagination parameters', async () => {
            const result = await request(app)
                .get('/vacations?page=2&limit=5')
                .set({ 'Authorization': `Bearer ${jwt}` })
            
            expect(result.statusCode).toBe(200)
            expect(result.body.currentPage).toBe(2)
            expect(result.body.limit).toBe(5)
        })
    })

    describe('/follower endpoint tests', () => {
        let jwt: string;
    
        beforeEach(async () => {
            await start()
            jwt = sign({ id: '6b6cb3ce-871f-4554-bf23-723b15d2be74' }, config.get<string>('app.jwtSecret'))
        })
    
        test('it should return 401 if no authorization header', async () => {
            const result = await request(app).get('/vacations/follower')
            expect(result.statusCode).toBe(401)
        })
    
        test('it should return followed vacations with pagination data', async () => {
            const result = await request(app)
                .get('/vacations/follower')
                .set({ 'Authorization': `Bearer ${jwt}` })
            
            expect(result.statusCode).toBe(200)
            expect(result.body).toHaveProperty('vacations')
            expect(Array.isArray(result.body.vacations)).toBeTruthy()
            expect(result.body).toHaveProperty('totalItems')
            expect(result.body).toHaveProperty('totalPages')
            expect(result.body).toHaveProperty('currentPage')
            expect(result.body).toHaveProperty('limit')
        })
    })

    describe('/:id endpoint tests', () => {
        let jwt: string;
        const validVacationId = 'b3a10bba-12a9-4e9f-b6c1-5f2db25abb6d'; // Use an ID that exists in your test database
        const invalidVacationId = 'invalid-id';
    
        beforeEach(async () => {
            await start()
            jwt = sign({ id: '6b6cb3ce-871f-4554-bf23-723b15d2be74' }, config.get<string>('app.jwtSecret'))
        })
    
        test('it should return 401 if no authorization header', async () => {
            const result = await request(app).get(`/vacations/${validVacationId}`)
            expect(result.statusCode).toBe(401)
        })
    
        test('it should return vacation details for valid ID', async () => {
            const result = await request(app)
                .get(`/vacations/${validVacationId}`)
                .set({ 'Authorization': `Bearer ${jwt}` })
            
            expect(result.statusCode).toBe(200)
            expect(result.body).toHaveProperty('id', validVacationId)
            expect(result.body).toHaveProperty('destination')
            expect(result.body).toHaveProperty('description')
            expect(result.body).toHaveProperty('beginDate')
            expect(result.body).toHaveProperty('endDate')
            expect(result.body).toHaveProperty('price')
        })
    
        test('it should return 400 for invalid ID format', async () => {
            const result = await request(app)
                .get(`/vacations/${invalidVacationId}`)
                .set({ 'Authorization': `Bearer ${jwt}` })
            
            expect(result.statusCode).toBe(400)
        })
    
        test('it should return 404 for non-existent vacation ID', async () => {
            // Use a well-formatted but non-existent UUID
            const nonExistentId = '00000000-0000-0000-0000-000000000000';
            
            const result = await request(app)
                .get(`/vacations/${nonExistentId}`)
                .set({ 'Authorization': `Bearer ${jwt}` })
            
            expect(result.statusCode).toBe(404)
        })
    })

    describe('POST / endpoint tests', () => {
        let regularUserJwt: string;
        let adminUserJwt: string;
    
        beforeEach(async () => {
            await start()
            // Admin user daniel raz
            adminUserJwt = sign({ id: '6b6cb3ce-871f-4554-bf23-723b15d2be74' }, config.get<string>('app.jwtSecret'))
            
            // Regular user
            regularUserJwt = sign({ id: '7f6b53da-d17b-41c2-a378-145bee0ad620' }, config.get<string>('app.jwtSecret'))
        })
    
        test('it should return 401 if no authorization header', async () => {
            const result = await request(app).post('/vacations')
            expect(result.statusCode).toBe(401)
        })
    
        test('it should return 422 if required files are missing', async () => {
            const vacationData = {
                destination: 'Test Destination',
                description: 'Test Description',
                beginDate: new Date().toISOString(),
                endDate: new Date(Date.now() + 86400000).toISOString(),
                price: 999.99
            }
    
            const result = await request(app)
                .post('/vacations')
                .set({ 'Authorization': `Bearer ${adminUserJwt}` })
                .send(vacationData)
            
            expect(result.statusCode).toBe(422)
        })
    
        test('it should return 403 if user is not admin when files are provided', async () => {
            const vacationData = {
                destination: 'Test Destination',
                description: 'Test Description',
                beginDate: new Date().toISOString(),
                endDate: new Date(Date.now() + 86400000).toISOString(),
                price: 999.99
            }
    
            // Create a small test buffer for a mock JPG file
            const buffer = Buffer.from('test image content');
    
            const result = await request(app)
                .post('/vacations')
                .set({ 'Authorization': `Bearer ${regularUserJwt}` })
                .field('destination', vacationData.destination)
                .field('description', vacationData.description)
                .field('beginDate', vacationData.beginDate)
                .field('endDate', vacationData.endDate)
                .field('price', vacationData.price.toString())
                .attach('image', buffer, { filename: 'test.jpg', contentType: 'image/jpeg' })
            
            expect(result.statusCode).toBe(403)
        })
    
        test('it should create a vacation when admin makes valid request with file', async () => {
            const vacationData = {
                destination: 'Test Destination',
                description: 'Test Description',
                beginDate: new Date().toISOString(),
                endDate: new Date(Date.now() + 86400000).toISOString(),
                price: 999.99
            }
    
            // Create a small test buffer for a mock JPG file
            const buffer = Buffer.from('test image content');
    
            const result = await request(app)
                .post('/vacations')
                .set({ 'Authorization': `Bearer ${adminUserJwt}` })
                .field('destination', vacationData.destination)
                .field('description', vacationData.description)
                .field('beginDate', vacationData.beginDate)
                .field('endDate', vacationData.endDate)
                .field('price', vacationData.price.toString())
                .attach('image', buffer, { filename: 'test.jpg', contentType: 'image/jpeg' })
            
            expect(result.statusCode).toBe(201)
            expect(result.body).toHaveProperty('id')
            expect(result.body.destination).toBe(vacationData.destination)
            expect(result.body.description).toBe(vacationData.description)
            expect(result.body.price).toBe(999.99)        })
    })


})