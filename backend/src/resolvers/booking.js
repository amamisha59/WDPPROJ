module.exports = {
  Booking: {
    house: async (booking, args, { models }) => {
      try {
        // console.log('Booking object:', booking);
        // console.log('House ID:', booking.house);

        if (!booking.house) {
          throw new Error('No house ID found in booking');
        }

        const house = await models.House.findById(booking.house);
        //console.log('Found house:', house);

        if (!house) {
          throw new Error('House not found');
        }

        return house;
      } catch (error) {
        console.error('Error in house resolver:', error);
        throw new Error(`Error fetching house details: ${error.message}`);
      }
    },
    user: async (booking, args, { models }) => {
      try {
        if (!booking.user) {
          throw new Error('No user ID found in booking');
        }

        const user = await models.User.findById(booking.user);
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        console.error('Error in user resolver:', error);
        throw new Error(`Error fetching user details: ${error.message}`);
      }
    }
  }
}; 