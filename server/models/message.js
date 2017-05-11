const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const messageSchema = new Schema({
  chatId: number[],
  userId: number[],
  text: string,
  timestamp: number
});

// Create the model class
const ModelClass = mongoose.model('message', messageSchema, 'Messages');

// Export the model
module.exports = ModelClass;