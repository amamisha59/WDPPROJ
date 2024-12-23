const Query = require('./query')
const Mutation = require('./mutation');
const Booking = require('./booking');

module.exports = {
    Query,
    Mutation,
    Booking: Booking.Booking
}