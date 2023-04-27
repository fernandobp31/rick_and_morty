const app = require('../src/app');
const session = require('supertest');
const request = session(app);

const character = {
    id: 923,
    name: 'Fer',
    species: 'Human',
    gender: 'Male',
    status: 'Alive',
    origin: {
        name: 'Earth (C-137)'
    },
    image: 'image.jpg'
};

describe("test de RUTAS", () =>{
    describe("GET /rickandmorty/character/:id", () => {
        it("Responde con status: 200", async () => {
            const response = await request.get('/rickandmorty/character/1');
            expect(response.statusCode).toBe(200);
        });

        it("Responde un objeto con las propiedades: 'id', 'name', 'species', 'gender', 'status', 'origin' e 'image' ", async () => {
            const response = await request.get('/rickandmorty/character/1');
            for(const prop in character){
            expect(response.body).toHaveProperty(prop);
           };
        });

        it("Si hay un error con status:500", async () => {
            const response = await request.get('/rickandmorty/character/3209j');
            expect(response.statusCode).toBe(500);
        });
    });


    describe("GET /rickandmorty/login", () => {
        const access = { access: true}

        it("Responde con un objeto con la propiedad access en true si la información del usuario es válida", async () => {
            const response = await request.get('/rickandmorty/login?email=fer@gmail.com&password=123asd');
            expect(response.body).toEqual(access); 
        });

        it("Responde con un objeto con la propiedad access en false si la información del usuario es válida", async () => {
            const response = await request.get('/rickandmorty/login?email=fer@mail.com&password=456fgh');            
            access.access = false;
            expect(response.body).toEqual(access); 
        });
    });


    describe("POST /rickandmorty/fav", () => {
        it("Debe guardar el personaje en favoritos", async () => {
            const response = await request.post('/rickandmorty/fav').send(character);
            expect(response.body).toContainEqual(character);
        });

        it("Debe agregar personajes a favoritos sin eliminar los existentes", async () => {
            character.id = 1923;
            character.name = 'FT 37a'
            const response = await request.post('/rickandmorty/fav').send(character);
            expect(response.body.length).toBe(2);
        });
    })


    describe("DELETE /rickandmorty/fav/id", () => {
        it("Si el ID solicitado no existe, debería retornar un arreglo con todos los favoritos", async () => {
            const response = await request.delete('/rickandmorty/fav/2');
            expect(response.body.length).toBe(2);
        })
    })
});