// lets import Import the required dependencies from the mongoose library
const { Schema, model } = require('mongoose'); 
const reactionSchema = require('./Reaction');
//lest create thoughtSchema
const thoughtSchema = new Schema(
    {
        // this will Define the thought schema with the required fields and their respective data types
        thoughtText:{
            type: String,
            required: true,
            minlength: 1,
            maxlenght: 300,
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: timestamp => new Date(timestamp).toLocaleString(),
        },
        username:{
            type: String,  
            required: true,
        },
        reactions:[reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought',thoughtSchema)
//exporting  thought module
module.exports = Thought