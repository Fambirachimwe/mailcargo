import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'


// mongo db connection

mongodb://localhost:27017
mongoose.connect(`mongodb://127.0.0.1/MailCargo`, {
    useNewUrlParser: true,
    // strictQuery: true
});
mongoose.connection.once('open', () => {
    console.log('Connected to MailCargo');
}).on('error', (error) => {
    console.log('connection error ', error);
});


const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));


// routes







app.listen(PORT, console.log(`Server started on port ${PORT}`));
