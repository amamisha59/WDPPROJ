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

    return await models.House.find(query).limit(100);
  },

  getHouseById: async (parent, { houseId }, { models }) => {
    return await models.House.findById(houseId);
  },

  getUserListings: async (parent, { userId }, { models }) => {
    return await models.House.find({ owner: userId });
  },

  getBookedHouses: async (parent, { userId }, { models, user }) => {
    if (!user || user.id !== userId) {
      throw new AuthenticationError('You are not authorized to view this information');
    }

    try {
      const bookings = await models.Booking.find({ user: userId })
        .populate('house') // Populate house details for each booking
        .exec();

      const houses = bookings.map(booking => booking.house);

      return houses;
    } catch (error) {
      throw new Error('Failed to fetch booked houses: ' + error.message);
    }
  }

};
