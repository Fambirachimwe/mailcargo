import mongoose from "mongoose";
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: String,
    phoneNumber: String,
    address: String
});


const User = mongoose.model('User', userSchema);

export default User;