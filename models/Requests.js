import mongoose from "mongoose";
const Schema = mongoose.Schema;


const requestSchema = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pickupLocation: { // this is a geo json object
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },

    dropOffLocatio: { // this is a geo json object
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    weight: Number,
    pickupDate: { type: Date, default: Date.now() },
    distance: Number,
    cost: Number

});


const Request = mongoose.model(Request, requestSchema);
export default Request;