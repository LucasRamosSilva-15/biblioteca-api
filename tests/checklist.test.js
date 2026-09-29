const request = require('supertest');
const express = require('express');
const { sequelize, Autor, Livro, Categoria } = require('../src/models');

const app = express();
app.use(express.json());
app.use('/api', require('../src/routes/autorRoutes'));
app.use('/api', require('../src/routes/livroRoutes'));
app.use('/api', require('../src/routes/categoriaRoutes'));

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Checklist da Dupla - Parte 1', () => {
    test('1. Sequelize conecta corretamente e Banco SQLite criado', async () => {
        await expect(sequelize.authenticate()).resolves.not.toThrow();
    });
    test('2. Campos obrigatórios e E-mail com formato válido', async () => {
        await expect(Autor.create({
            email: "email-invalido"
        })).rejects.toThrow();
    });
    test('3. CRUD de Autor funciona (POST e GET)', async () => {
        const resPost = await request(app)
            .post('/api/autores')
            .send({
                nome: "Machado de Assis",
                email: "machado@teste.com",
                nacionalidade: "Brasileiro"
            });
        expect(resPost.statusCode).toBe(201);
        expect(resPost.body).toHaveProperty('id');

        const resGet = await request(app).get('/api/autores');
        expect(resGet.statusCode).toBe(200);
        expect(resGet.body.data.length).toBe(1);
        expect(resGet.body.data[0].nome).toBe("Machado de Assis");
    });
    test('4. Campos únicos possuem constraint (E-mail único)', async () => {
        const res = await request(app)
            .post('/api/autores')
            .send({
                nome: "Outro Autor",
                email: "machado@teste.com"
            });
        expect(res.statusCode).toBe(400);
    });
    test('5. Listar autores deve retornar quantidade solicitada (limit)', async () => {
        await request(app).post('/api/autores').send({
            nome: "Autor 2",
            email: "autor2@teste.com"
        });
        await request(app).post('/api/autores').send({
            nome: "Autor 3",
            email: "autor3@teste.com"
        });
        const res = await request(app).get('/api/autores?limit=2');
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBe(2);
    });
    test('6. Listar autores deve retornar quantidade solicitada (page)', async () => {
        await request(app).post('/api/autores').send({
            nome: "Autor 4",
            email: "autor4@teste.com"
        });
        await request(app).post('/api/autores').send({
            nome: "Autor 5",
            email: "autor5@teste.com"
        });
        const res = await request(app).get('/api/autores?page=2&limit=2');
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBe(2);
    });
});