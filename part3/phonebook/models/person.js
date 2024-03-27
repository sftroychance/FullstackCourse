import mongoose from 'mongoose';

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery',false)

console.log('connecting to', url);

mongoose
  .connect(url)
  .then(_ => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message));

const personSchema = new mongoose.Schema( {
  name: String,
  number: String,
}, {
  toJSON: {
    transform: (_, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  }
});

const Person = mongoose.model('Person', personSchema);

export default Person;
