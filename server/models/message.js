const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const messageSchema = new Schema({
  id: number,
  chatId: number[],
  userId: number[],
  text: string,
  timestamp: number
});

// Create the model class
const ModelClass = mongoose.model('chat', chatSchema, 'CHATS');

// Export the model
module.exports = ModelClass;