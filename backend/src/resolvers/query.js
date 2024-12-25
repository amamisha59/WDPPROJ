module.exports = {
  //to get the houses as a buyer with filters
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

      //to get the houses as a buyer with filters with a limit of 100
      return await models.House.find(query).limit(100);
    } catch (error) {
      console.error('Error in getHouses:', error);
      throw new Error('Failed to fetch houses: ' + error.message);
    }
  },

  //to get the house details by id
  getHouseById: async (parent, { houseId }, { models }) => {
    return await models.House.findById(houseId);
  },

  //to get the houses as a seller
  getUserListings: async (parent, { userId }, { models }) => {
    try {
      // Get IDs of all booked houses
      const bookedHouseIds = await models.Booking.find({
        status: 'confirmed'
      }).distinct('house');

      // Find houses that belong to the user and are not booked
      const query = {
        owner: userId,
        _id: { $nin: bookedHouseIds }
      };

      console.log('Seller listings query:', query);

      const houses = await models.House.find(query);

      //to return the array of houses as a seller
      return houses;
    } catch (error) {
      console.error('Error in getUserListings:', error);
      throw new Error('Failed to fetch user listings: ' + error.message);
    }
  },

  //to get the booked houses as a buyer
  getBookedHouses: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You are not authorized to view this information');
    }

    try {
      console.log('User ID:', user.id);
      //to get the booked houses as a buyer with a status of confirmed
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
  },

  //to get the sold houses as a seller
  getSoldHouses: async (parent, { userId }, { models }) => {
    try {
      // Find all confirmed bookings for houses owned by this seller with a status of confirmed
      const bookings = await models.Booking.find({
        status: 'confirmed'
      })
      .populate({
        path: 'house',
        match: { owner: userId }
      })
      .exec();

      // Filter out bookings where house is null (not owned by this seller)
      return bookings.filter(booking => booking.house !== null);
    } catch (error) {
      console.error('Error in getSoldHouses:', error);
      throw new Error('Failed to fetch sold houses: ' + error.message);
    }
  }

};
