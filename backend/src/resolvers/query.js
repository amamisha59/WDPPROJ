module.exports = {
  getHouses: async (parent, { location, priceRange, houseType }, { models }) => {
    let query = {};

    if (location) query.location = location;
    if (houseType) query.houseType = houseType;

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange;
      query.price = { 
        ...(minPrice !== undefined && { $gte: minPrice }),
        ...(maxPrice !== undefined && { $lte: maxPrice })
      };
    }

    try {
      // Get IDs of all booked houses
      const bookedHouseIds = await models.Booking.find({
        status: 'confirmed'
      }).distinct('house');

      // Add condition to exclude booked houses
      query._id = {
        $nin: bookedHouseIds
      };

      console.log('Query with booked houses excluded:', query);

      return await models.House.find(query).limit(100);
    } catch (error) {
      console.error('Error in getHouses:', error);
      throw new Error('Failed to fetch houses: ' + error.message);
    }
  },

  getHouseById: async (parent, { houseId }, { models }) => {
    return await models.House.findById(houseId);
  },

  getUserListings: async (parent, { userId }, { models }) => {
    return await models.House.find({ owner: userId });
  },

  getBookedHouses: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You are not authorized to view this information');
    }

    try {
      console.log('User ID:', user.id);
      const bookings = await models.Booking.find({ 
        user: user.id,
        status: 'confirmed'
      }).exec();

      console.log('Found bookings:', bookings);

      if (!bookings || bookings.length === 0) {
        return [];
      }

      return bookings;
    } catch (error) {
      console.error('Error in getBookedHouses:', error);
      throw new Error('Failed to fetch booked houses: ' + error.message);
    }
  }

};
