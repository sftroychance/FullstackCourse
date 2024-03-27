import mongoose from 'mongoose';

console.log(process.argv);
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://sftroychance:${password}@fullstack.ye16iin.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Fullstack`;

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'React isn\'t too bad',
  important: true,
})

// note.save().then(result => {
//   console.log(result._doc._id.toString());
//   console.log('note saved!');
//   mongoose.connection.close();
// })


Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note);
    console.log(note._id);
  });
  mongoose.connection.close();
})
