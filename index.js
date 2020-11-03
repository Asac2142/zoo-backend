const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const PORT = process.env.PORT || 3142;
const data = require('./db/data');
const validate = require('./schema/schema');
const app = express();
app.use(jsonParser);


app.get('/api/animals', (req, res) => {
    res.send(data);
});

app.get('/api/animals/injured', (req, res) => {    
    const injured = data.animals.filter(animal => !animal.active);
    
    if (injured.length === 0) {
        res.status(404).send({message: 'no injured animals yet!'});
        return;
    }
    res.send(injured);
});

app.get('/api/animals/healthy', (req, res) => {        
    const healthy = data.animals.filter(animal => animal.active);    
    
    if (healthy.length === 0) {
        res.status(404).send({message: 'no healthy animals yet!'});
        return;
    }
    res.send(healthy);
});

app.post('/api/animals', (req, res) => {    
    const {error, value} = validate(req.body);
        
    if (error) {
        res.status(400).send(error.message);
        return;
    } else {
        const animal = {
            id: data.animals.length + 1,
            family: value.family,
            specie: value.specie,
            name: value.name,
            imageUrl: value.imageUrl,
            age: value.age,
            active: value.active,
            medical_status: value.medical_status
        };

        data.animals.push(animal);
        res.send(animal)
    }
});

app.delete('/api/animals/delete/:id', (req, res) => {
    const id = req.params.id;
    const pos = findAnimalPosition(id);
    
    if (pos < 0) {
        res.status(404).send({ message: 'Could not DELETE. Animal not found', id: id });
        return;
    }

    const animalDeleted = data.animals.splice(pos, 1);    
    res.send({ animalDeleted: animalDeleted });
});

app.put('/api/animals/', (req, res) => {
    const {error, value} = validate(req.body);
    if (error) { res.status(400).send(error.message); return; };

    const id = value.id;
    const pos = findAnimalPosition(id);
        
    if (pos < 0) {
        res.status(404).send({ message: `Could not UPDATE. Cannot find animal with ID: ${id}`, body: value});
        return;
    }

    data.animals[pos] = value;  
    res.send(value);
});

app.patch('/api/animals/:id', (req, res) => {
    const active = req.body.active;
    const id = req.params.id;
    const pos = findAnimalPosition(id);

    if (pos < 0) {
        res.status(404).send({ message: 'Could not PATCH. Animal not found', id: id });
        return;
    }

    data.animals[pos].active = active;
    res.send(data.animals[pos]);
});

const findAnimalPosition = (id) => {
    return data.animals.findIndex(animal => animal.id === parseInt(id));
};


app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
