const express = require('express');
const minionsRouter = express.Router();
const {
    getFromDatabaseById,
    getAllFromDatabase,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
   } = require('./db');
const morgan = require('morgan');

minionsRouter.use((req, res, next) => {
    morgan('tiny')
    next();
});

//Param minion
minionsRouter.param('minionId', (req, res, next, id) => {
      let minion = getFromDatabaseById('minions', id);
      if (minion) {
        req.minion = minion;
        next();
      } else {
        res.status(404).send('The minion does not exist');
      };
  });


//get all minions

minionsRouter.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDatabase('minions'))
});

//post minion

minionsRouter.post('/', (req, res, next) => {
    console.log(req.body);
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});

//get minion by id
minionsRouter.get('/:minionId', (req, res, next) => {
  res.status(200).send(req.minion);
});

//update minion
minionsRouter.put('/:minionId', (req, res, next) => {
    console.log(req.body);
   res.send(updateInstanceInDatabase('minions', req.body));
});

//delete minion
minionsRouter.delete('/:minionId', (req, res, next) => {
  deleteFromDatabasebyId('minions', req.minion.id);
  res.status(204).send('successfull deletion');
});


//WORK

let minionsWork = (req, res, next) => {
  let work = getAllFromDatabase('work');
  req.minionWork = work.filter((minion) => {
    return minion.minionId === req.minion.id;  
  });
  console.log(req.minionWork);
  next();
}

minionsRouter.get('/:minionId/work', minionsWork, (req, res, next) => {
  res.status(200).send(req.minionWork);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
  console.log(req.body)
  res.status(201).send(addToDatabase('work', req.body));
});

minionsRouter.put('/:minionId/work/:workId', minionsWork, (req, res, next) => {
  console.log(`the request was ${req.body}`)
    let workById = req.minionWork.filter((work) => {
      return work.id === req.body.id
    })
    console.log(workById);
  if (workById.length > 0 && req.params.minionId === req.body.minionId) {
  res.status(200).send(updateInstanceInDatabase('work', req.body));
} else {
  res.status(400).send();
}
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  deleteFromDatabasebyId('work', req.params.workId);
  res.status(204).send()
});
 
module.exports = minionsRouter;