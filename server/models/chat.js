const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const chatSchema = new Schema({
  id: number,
  name: String,
  messageIds: number[],
  usersIds: number[]
});

// Create the model class
const ModelClass = mongoose.model('chat', chatSchema, 'CHATS');

// Export the model
module.exports = ModelClass;