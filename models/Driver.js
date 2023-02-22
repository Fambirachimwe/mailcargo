import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const driverSchema = new Schema({
    username: String,
    email: String,
    password: String,
    orders: [String],
    currentLocation: { // this is a geo json object
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

    status: String,
    verified: {
        type: Boolean,
        default: false
    },

    vehicleType: String

});


const Driver = mongoose.model('Driver', driverSchema);
export default Driver;