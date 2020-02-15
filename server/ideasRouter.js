const express = require('express');
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const {
    getAllFromDatabase,
    addToDatabase, 
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
   } = require('./db');

ideasRouter.param('ideaId', (req, res, next, id) => {
    let idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});


ideasRouter.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDatabase('ideas'))
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    let newIdea = addToDatabase('ideas', req.body)
    res.status(201).send(newIdea);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.status(200).send(req.idea);
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    console.log(req.body);
    res.status(201).send(updateInstanceInDatabase('ideas', req.body));
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    console.log(req.idea.id);
    deleteFromDatabasebyId('ideas', req.idea.id);
    res.status(204).send();
});

module.exports = ideasRouter;