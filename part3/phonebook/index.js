import 'dotenv/config';
import Person from './models/person.js'
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

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

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(people => res.json(people))
    .catch(error => console.log('Error retrieving persons:', error.message));
})

app.get('/api/persons/:id', (req, res) => {
  Person
    .findById(req.params.id)
    .then(note => {
      if (note) {
        console.log('note', note);
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      console.log(err)
      res.status(400).send({ error: 'malformatted id' })
    });
})

app.delete('/api/persons/:id', (req, res) => {
  Person
    .findByIdAndDelete(req.params.id)
    .then(_ => {
      res.status(204).end()
    })
    .catch(error => console.log(error))
})

app.post('/api/persons', (req, res) => {
  const newPerson = {...req.body};

  if (!newPerson.name || !newPerson.number) {
    return res.status(400).json({
      error: 'Content missing'
    });
  }

  const person = new Person(newPerson);

  person
    .save()
    .then(saved => res.json(saved))
    .catch(error => {
      console.log('Error adding person:', error.message)
      res.status(500)
    });
})

app.put('/api/persons/:id', (req, res) => {
  const person = req.body;

  Person
    .findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(error => console.log(error))
})

app.get('/info', (req, res) => {
  let message;

  Person
    .countDocuments({})
    .then(count => {
      message = `
        <p>Phonebook has info for ${count} people.</p>
        <p>${Date()}</p>
      `;

      res.set(`Content-Type`, `text/html`);
      res.send(message);
    })
    .catch(error => console.log(error))
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} on ${Date()}`);
})
