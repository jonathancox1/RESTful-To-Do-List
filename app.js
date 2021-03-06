const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));

let todoList = [
  {
    id: 1,
    todo: 'Implement a REST API',
  },
  {
    id: 2,
    todo: 'Second ToDo Item'
  },
  {
    id: 3,
    todo: 'Wash the Dog'
  },
];

// GET /api/todos
// gets all
app.get('/api/todos', (req, res) => {
  console.log('get')
  res.json(todoList);
})


// GET /api/todos/:id
app.get('/api/todos/:id', (req, res) => {
  // convert id to a number
  let id = Number.parseFloat(req.params.id);
  console.log(id);
  // filter checks if the params.id is in the todoList
  let itemToCall = todoList.filter(list => list.id === id);
  // handle error if .filter() returns false
  if (itemToCall == false) {
    // if the length of keys is 0 status = 404
    const status = Object.keys(itemToCall).length ? 200 : 404;
    console.log(`error locating id: ${id}, status: ${status}`);
  }

  res.send(itemToCall);
})

// POST /api/todos
app.post('/api/todos', (req, res) => {
  // if there is a body
  if (req.body.todo) {
    const prevId = todoList.reduce((prev, curr) => {
      // determines the previous id number
      // with a reduce function
      if (prev < curr.id) {
        prev = curr.id;
      }
      return prev;
    }, 0)
    // creat newTodo object
    const newTodo = {
      id: (prevId + 1),
      todo: req.body.todo,
    }
    // push newTodo into the todo list
    todoList.push(newTodo);
    // respond with the newTodo
    console.log(newTodo);
    res.json(newTodo);

  } else {
    res.status(400).json({
      error: '400 : Please provide todo text'
    })
  }
});


// used to update existing items
// if no id, respond 404
// PUT /api/todos/:id
app.put('/api/todos/:id', (req, res) => {
  let id = Number.parseFloat(req.params.id);
  console.log(id);
  // filter checks if the params.id is in the todoList
  let itemToCall = todoList.find(item => item.id == id);
  console.log(itemToCall)
  // handle error if .find() returns number or undefined
  if (itemToCall != undefined) {
    itemToCall.todo = req.body.todo;
    res.json(itemToCall);
  } else {
    // if the length of keys is 0 status = 404
    console.log(`error locating id: ${id}, status: 404`);
    res.status(404).json({
      error: '404 : ID does not exist'
    })
  }
})

// DELETE /api/todos/:id
app.delete('/api/todos/:id', (req, res) => {
  let id = Number.parseFloat(req.params.id);
  let itemToCall = todoList.find(item => item.id == id);

  if (itemToCall == undefined) {
    console.log(`error locating id: ${id}, status: 404`);
    res.status(404).json({
      error: '404 : ID does not exist'
    })
  } else {
    // reassigns the todoList to everything that isnt the req.body.id
    todoList = todoList.filter(list => list.id != id);
    console.log(`ID : ${id} ${itemToCall} has been deleted`)
    res.json(todoList);
  }
})


const port = 3000
app.listen(port, function () {
  console.log(`Todo List API is now listening on port ${port}...`);
});
