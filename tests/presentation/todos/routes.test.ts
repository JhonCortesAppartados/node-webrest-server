import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';

describe('Todo route testing', () => {

    beforeAll(async () => {
        await testServer.start();
    });

    afterAll(() => {
        testServer.close();
    });

    beforeEach(async () => {
        //Con este se borra los registros de la base de datos:
        await prisma.todo.deleteMany();
    });

    const todo1 = {text: 'Hola Mundo 1'};
    const todo2 = {text: 'Hola Mundo 2'};

    test('should return TODOs api/todos', async () => {

        await prisma.todo.createMany({
            data: [todo1, todo2]
        });

        const {body} = await request(testServer.app)
            .get('/api/todos')
            .expect(200);

        // console.log({body});

        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBe(2);
        expect(body[0].text).toBe(todo1.text);
        expect(body[1].text).toBe(todo2.text);
        expect(body[0].completedAt).toBeUndefined();
        
    });


    test('should return a TODO api/todos/:id', async () => {

        const todo = await prisma.todo.create({
            data: todo1
        });

        const {body} = await request(testServer.app)
            .get(`/api/todos/${todo.id}`)
            .expect(200);

        expect(body).toEqual({
            id: todo.id,
            text: todo.text,
            completedAt: undefined
        });
    });

    test('should return a 400 NotFound api/todos/:id', async () => {

        const todoId = 999;
        const {body} = await request(testServer.app)
            .get(`/api/todos/${todoId}`)
            .expect(404);

        expect(body).toEqual({error: `Todo with id ${todoId} not found`});

    });

    test('should return a new Todo api/todos', async () => {

        const {body} = await request(testServer.app)
            .post('/api/todos')
            .send(todo1)
            .expect(201);

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            completedAt: undefined
        });
    });

    test('should return an error if text is not present api/todos', async () => {

        const {body} = await request(testServer.app)
            .post('/api/todos')
            .send({})
            .expect(400);

        expect(body).toEqual({error: 'Text property is required'});         
    });

    // test('should return an error if text is empty api/todos', async () => {

    //     const {body} = await request(testServer.app)
    //         .post('/api/todos')
    //         .send({text: ''})
    //     //     .expect(400);

    //     // expect(body).toEqual({error: 'Text property is required'});

    // });

    // test('should return an updated TODO api/todos/:id', async () => {

    //     const todo = await prisma.todo.create({
    //         data: todo1
    //     });

    //     const {body} = await request(testServer.app)
    //         .put(`/api/todos/${todo.id}`)
    //         .send({text: 'Hola mundo UPDATE', completedAt: '2025-05-20'})
    //         .expect(200);

    //     // console.log({body});

    //     expect(body).toEqual({
    //         id: expect.any(Number),
    //         text: 'Hola mundo UPDATE',
    //         completedAt: '2025-05-20T00:00:00.000Z'
    //     });
    // });

    // test('should return 404 if TODO not found', async () => {
    //     const {body} = await request(testServer.app)
    //         .put(`/api/todos/999`)
    //         .send({text: 'Hola mundo UPDATE', completedAt: '2025-05-20'})
    //         .expect(404);

    //     expect(body).toEqual({error: `Todo with id 999 not found`});

    // });

    // test('should return an updated TODO only the date', async () => {

    //     const todo = await prisma.todo.create({
    //         data: todo1
    //     });

    //     const {body} = await request(testServer.app)
    //         .put(`/api/todos/${todo.id}`)
    //         .send({completedAt: '2025-05-20'})
    //         .expect(200);

    //     expect(body).toEqual({
    //         id: expect.any(Number),
    //         text: todo1.text,
    //         completedAt: '2025-05-20T00:00:00.000Z'
    //     });
    // });

    // test('should delete a TODO api/todos/:id', async () => {

    //     const todo = await prisma.todo.create({
    //         data: todo1
    //     });

    //     const {body} = await request(testServer.app)
    //         .delete(`/api/todos/${todo.id}`)
    //         .expect(200);

    //     expect(body).toEqual({
    //         id: expect.any(Number),
    //         text: todo1.text,
    //         completedAt: undefined
    //     });
    // });

    // test('should return 404 if TODO do not exist api/todos/:id', async () => {

    //     const {body} = await request(testServer.app)
    //         .delete(`/api/todos/999`)
    //         .expect(404);

    //     expect(body).toEqual({
    //         error: "Todo with id 999 not found",
    //     });
    // });
    

});