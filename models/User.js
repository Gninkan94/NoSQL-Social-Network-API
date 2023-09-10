// lets import Import the required dependencies from the mongoose library
const { Schema, model, Types } = require('mongoose'); 
// this will Define the User schema with the required fields and their respective data types
const userSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
      // lets try to use a regex to validate email format.
    email: {
        type: String,
        required: true,
        unique: true,
        validate: { 
          validator: function(v) {
              return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
          }
      }
    },

    friends:[
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
  ],
    thoughts:[
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }
  ],
  },
  {
    toJSON: {
        // this will enables virtual properties to be displayed when a user document is transformed into JSON format..
      virtuals: true, 
    },
     // this will disables the default '_id' field in the User model to be returned when calling toJSON() method...
    id: false,
}
);

// this will Define a virtual property 'friendCount' which will return the number of friends in the friends array....

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

// this will Creat the User model from the userSchema..
const User = model('User',userSchema)

// Exporting the User model as a module
module.exports = User