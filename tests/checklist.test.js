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

describe('Checklist da Dupla - Parte 2 (Livros, Categorias, Relacionamentos, Filtros)', () => {
    let autorId, livroId, categoriaId;

    test('7. CRUD de Livro e Relacionamento Autor -> Livro (POST)', async () => {
        const resAutor = await request(app).post('/api/autores').send({
            nome: "J.R.R. Tolkien",
            email: "tolkien@teste.com"
        });
        autorId = resAutor.body.id;

        const resLivro = await request(app).post('/api/livros').send({
            titulo: "O Senhor dos Anéis",
            isbn: "123456789",
            ano: 1954,
            autorId: autorId
        });
        expect(resLivro.statusCode).toBe(201);
        livroId = resLivro.body.id;
    });

    test('8. CRUD de Categoria funciona (POST)', async () => {
        const resCat = await request(app).post('/api/categorias').send({
            nome: "Fantasia",
            descricao: "Mundos mágicos"
        });
        expect(resCat.statusCode).toBe(201);
        categoriaId = resCat.body.id;
    });

    test('9. Relacionamento Livro <-> Categoria funciona (Associar)', async () => {
        const res = await request(app).post(`/api/livros/${livroId}/categorias/${categoriaId}`);
        expect(res.statusCode).toBe(200);
    });

    test('10. Include retorna dados relacionados', async () => {
        const res = await request(app).get(`/api/livros/${livroId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('Autor');
        expect(res.body.Autor.nome).toBe("J.R.R. Tolkien");
        expect(res.body).toHaveProperty('Categoria');
        expect(res.body.Categoria[0].nome).toBe("Fantasia");
    });

    test('11. Filtros funcionam', async () => {
        const res = await request(app).get('/api/livros?titulo=Senhor');
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data[0].titulo).toContain("Senhor");
    });

    test('12. Erros são tratados (404 Not Found)', async () => {
        const res = await request(app).get('/api/livros/9999');
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error');
    });
    test('13. Atualizar categoria funciona', async () => {
        const res = await request(app).put(`/api/categorias/${categoriaId}`).send({
            nome: "Fantasia",
            descricao: "Mundos mágicos"
        });
        expect(res.statusCode).toBe(200);
    });
    test('14. Atualizar livro funciona', async () => {
        const res = await request(app).put(`/api/livros/${livroId}`).send({
            titulo: "O Senhor dos Anéis",
            isbn: "123456789",
            ano: 1954,
            autorId: autorId
        });
        expect(res.statusCode).toBe(200);
    });
    test('15. Deletar categoria funciona', async () => {
        const res = await request(app).delete(`/api/categorias/${categoriaId}`);
        expect(res.statusCode).toBe(200);
    });
    test('16. Deletar livro funciona', async () => {
        const res = await request(app).delete(`/api/livros/${livroId}`);
        expect(res.statusCode).toBe(200);
    });
    test('17. Listar categorias funciona', async () => {
        const resCat = await request(app).post('/api/categorias').send({
            nome: "Fantasia",
            descricao: "Mundos mágicos"
        });
        expect(resCat.statusCode).toBe(201);
        categoriaId = resCat.body.id;
        const res = await request(app).get('/api/categorias');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
    test('18. Listar autores funciona', async () => {
        const res = await request(app).get('/api/autores');
        expect(res.statusCode).toBe(200);
    });
});