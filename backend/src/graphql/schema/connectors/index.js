// Import Mongoose.js package
import Mongoose from 'mongoose';

// Create the MongoDB connection
const mongo = Mongoose.connect('mongodb://db:27017/hilton', (err) => {
    if (err) {
        console.error('Could not connect to MongoDB on port 27017');
    }
});

// Declare the schema for the Reservation Collection
const ReservationSchema = Mongoose.Schema({
    id: String,
    name: String,
    hotelName: String,
    arrivalDate: Date,
    departureDate: Date
});

// Create the Mongoose,js model based on the created schema
const Reservation = Mongoose.model('reservations', ReservationSchema);

export Reservation;
