const chai = require('chai');
const chaiHTTP = require('chai-http');
const { response } = require('express');
const server = require('../index');

chai.should();
chai.use(chaiHTTP);

describe('Animals API', () => {

    describe('GET /api/animals', () => {
        it('should get all the animals data', (done) => {
            chai.request(server)
                .get('/api/animals')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();
                });
        });

        it('should not get all the animals data', (done) => {
            chai.request(server)
                .get('/api/animal')
                .end((err, response) => {
                    response.should.have.status(404);                    
                    done();
                });
        });
    });

    describe('POST /api/animals', () => {
        it('should add an animal to the animals data', (done) => {
            const animal = {
                id: "12142",
                family: "feline",
                specie: "lion",
                name: "Gustavo",
                imageUrl: "https://images.pexels.com/photos/1187987/pexels-photo-1187987.jpeg?cs=srgb&dl=pexels-aldo-picaso-1187987.jpg&fm=jpg",
                age: 8,
                active: false,
                medical_status: "bad digestion"
            }

            chai.request(server)
                .post('/api/animals')
                .send(animal)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should add return a 400 when body doesnt have a valid structure', (done) => {
            const animal = {
                id: "12142",                
                specie: "lion",
                name: "Gustavo",
                imageUrl: "https://images.pexels.com/photos/1187987/pexels-photo-1187987.jpeg?cs=srgb&dl=pexels-aldo-picaso-1187987.jpg&fm=jpg",
                age: 8,
                active: false,
                medical_status: "bad digestion"
            }

            chai.request(server)
                .post('/api/animals')
                .send(animal)
                .end((err, res) => {
                    res.should.have.status(400);                    
                    done();
                });
        });
    });

    describe('DELETE /api/animals/delete/:id', () => {
        it('should delete an animal', (done) => {
            const id = '13321';

            chai.request(server)
            .delete(`/api/animals/delete/${id}`)
            .end((error, res) => {
                res.should.be.a('object');
                res.should.have.status(200);
                res.body.should.have.property('id');
                res.body.should.have.property('id').eq(id);
                done();
            });
        });

        it('should get a 404 status response', (done) => {
            const id = '1';

            chai.request(server)
            .delete(`/api/animals/delete/${id}`)
            .end((error, res) => {
                res.should.have.status(404);
                done();
            });
        });
    });

    describe('PUT /api/animals', () => {
        it('should return a 404 when the animal to update cannot be find', (done) => {
            const animal = {
                id: "12142",
                family: "feline",
                specie: "lion",
                name: "Gustavo",
                imageUrl: "https://images.pexels.com/photos/1187987/pexels-photo-1187987.jpeg?cs=srgb&dl=pexels-aldo-picaso-1187987.jpg&fm=jpg",
                age: 8,
                active: false,
                medical_status: "bad digestion"
            };

            chai.request(server)
            .put('/api/animals')
            .send(animal)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
        });

        it('should return a 400 when the animal data to be updated is invalid', (done) => {
            const animal = {
                id: "12142",
                family: "feline",
                specie: "lion",                
                imageUrl: "https://images.pexels.com/photos/1187987/pexels-photo-1187987.jpeg?cs=srgb&dl=pexels-aldo-picaso-1187987.jpg&fm=jpg",
                age: 8,
                active: false,
                medical_status: "bad digestion"
            };

            chai.request(server)
            .put('/api/animals')
            .send(animal)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        });

        it('should update an existing animal', (done) => {
            const animal = {
                id: "35311",
                family: "feline",
                specie: "lion",
                name: "Gustavo",
                imageUrl: "https://images.pexels.com/photos/1187987/pexels-photo-1187987.jpeg?cs=srgb&dl=pexels-aldo-picaso-1187987.jpg&fm=jpg",
                age: 8,
                active: false,
                medical_status: "bad digestion"
            };

            chai.request(server)
            .put('/api/animals')
            .send(animal)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

    });

    describe('PATCH /api/animals/:id', () => {
        it('should set true the active property of an animal', (done) => {
            const id = '35311';

            chai.request(server)
                .patch(`/api/animals/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('active').eq(true);
                    done();
                });
        });

        it('should return 404 when the animal to be patched is not found', (done) => {
            const id = '31011';

            chai.request(server)
                .patch(`/api/animals/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);                    
                    done();
                });
        });
    });
});