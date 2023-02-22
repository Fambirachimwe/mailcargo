import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// use paynow to make all payments

// USD 
/**
 * mastercard
 * visacard
 * */

// ZWD 
/**
 * ecocash
 * onemoney
 * V-Payments  this is for zimswitch
*/


const paymentSchema = new Schema({
    amount: Number,
    currency: String,
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order"
    },
    mobileNumber: Number,
    accountNumber: Number,
    date: {
        type: Date,
        default: Date.now()
    },
    status: String,
    gateway: String
});


const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;

