import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    requestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request"
    },
    paymentStatus: String,
    // paymentId :   // is there any need for this 
    orderStatus: String,

    driver: {
        type: Schema.Types.ObjectId,
        ref: "Driver"
    },

    currenLocation: { // this is a geo json object
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
});


const Order = mongoose.model('Order', orderSchema);
export default Order;