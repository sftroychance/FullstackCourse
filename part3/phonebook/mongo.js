import mongoose from 'mongoose';

// check process.argv
// `node playing_with_mongo.js password
// => password is process.argv[2]
//
// options: no args (process.argv.length === 3) => log all phonebook entries
// process.argv.length === 5 => add new entry to phonebook (save)

// connect
// define schema
// create model
// if adding a record: save() and log `added Anna number 040-1234556 to phonebook`
// if retrieving all records, find({}) and log:
// phonebook:
// Anna 040-123-4556

// note if there is a space in the name, it must be in quotes

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://sftroychance:${password}@fullstack.ye16iin.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Fullstack`;

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema( {
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

switch (process.argv.length) {
  case 3:
    console.log('phonebook:');

    Person
      .find({})
      .then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`);

          mongoose.connection.close();
        });
     })

    break;
  case 5:
    const name = process.argv[3];
    const number = process.argv[4];

    const newPerson = new Person({
      name,
      number,
    });

    newPerson
      .save()
      .then(result => {
        console.log(`added ${name} number ${number} to phonebook`)

        mongoose.connection.close();
      })

    break;
  default:
    console.log('Wrong number of arguments sent');
}
