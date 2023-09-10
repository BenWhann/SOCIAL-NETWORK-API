const { Schema, model } = require('mongoose');
const thoughtSchema = require('./thoughts');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thoughts' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// create virtual

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('Users', userSchema);

module.exports = User;