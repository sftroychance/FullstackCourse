import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

// discarded solution: adds an extra hyphen at end of log line
// morgan.token('body', (req) => {
//   if (req.method === 'POST') {
//     return JSON.stringify(req.body);
//   }
// })

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use(morgan((tokens, req, res) => {
  let log = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ]

  if (req.method === 'POST') {
    log.push(JSON.stringify(req.body));
  }

  return log.join(' ');
}));

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person)
  } else {
    res.status(404).end();
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);

  res.status(204).end();
})

app.post('/api/persons', (req, res) => {
  const newPerson = {...req.body};

  const foundPerson = persons.find(person => person.name === newPerson.name);

  if (!newPerson.name || !newPerson.number) {
    return res.status(400).json({
      error: 'Content missing'
    });
  }

  if (foundPerson) {
    return res.status(409).json({
      error: 'Name must be unique'
    });
  }

  newPerson.id = Math.floor(Math.random() * 25000);

  persons = persons.concat(newPerson);
  res.json(newPerson);
})

app.get('/info', (req, res) => {
  const message = `
    <p>Phonebook has info for ${persons.length} people.</p>
    <p>${Date()}</p>
  `;

  res.set('Content-Type', 'text/html');
  res.send(message);
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} on ${Date()}`);
})
