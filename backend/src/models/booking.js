const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    house: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House',
        required: true,
        index: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'], 
        default: 'pending',
        index: true
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

bookingSchema.pre('find', function() {
    console.log('Executing find on bookings');
});

const Booking = mongoose.model('Booking', bookingSchema);
// Export the module
module.exports = Booking;