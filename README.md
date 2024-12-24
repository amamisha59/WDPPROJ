# 🏠 House Booking GraphQL Application

Welcome to the **House Booking GraphQL Application**! This project allows authenticated users to seamlessly browse and book houses using a Node.js backend, MongoDB for data storage, and Apollo Server for GraphQL APIs.  

---

## ✨ Features

- 🔒 **Authentication**: Secure user login required for booking houses.
- 🏡 **House Validation**: Ensures the selected house exists before booking.
- 🚫 **Duplicate Booking Prevention**: Stops users from booking the same house multiple times.
- 🔄 **Dynamic Data Population**: Fetch associated house and user details automatically in responses.

---

## 🚀 Getting Started

### 1️⃣ Prerequisites
Ensure you have the following installed:
- **Node.js**: v14 or later  
- **MongoDB**: Running locally or hosted remotely  
- **npm**: Installed with Node.js  

### 2️⃣ Installation
Clone the repository and install dependencies:
```bash
git clone <repository_url>
cd <repository_name>
npm install
```
### 3️⃣ Environment Variables
Create a .env file in the project root and configure the following:
```bash
MONGO_URI=<your_mongo_database_uri>
JWT_SECRET=<your_jwt_secret_key>
```
### 4️⃣ Run the Server
Start the development server:
```bash
npm start
```
### 🛠️ GraphQL Schema
### 📜 Mutation: bookHouse
```bash
type Mutation {
    bookHouse(houseId: ID!): Booking
}
```
### 🧩 Backend: Resolver
### 📌 Implementation
The bookHouse resolver ensures:
1. The user is authenticated.
2. The specified house exists.
3. Duplicate bookings by the same user are not allowed.
4. Returns detailed information about the booking.
CODE
```bash
const bookHouse = async (parent, { houseId }, { user, models }) => {
    if (!user) {
        throw new AuthenticationError('You must be signed in to book a house');
    }

    try {
        const house = await models.House.findById(houseId);
        if (!house) {
            throw new Error(`House with ID ${houseId} not found`);
        }

        const existingBooking = await models.Booking.findOne({
            house: houseId,
            user: user.id,
        });
        if (existingBooking) {
            throw new Error('You have already booked this house');
        }

        const booking = new models.Booking({
            house: houseId,
            user: user.id,
            bookingDate: new Date(),
            status: 'confirmed',
        });

        await booking.save();

        return await models.Booking.findById(booking._id)
            .populate('house')
            .populate('user');
    } catch (error) {
        throw new Error(`Booking failed: ${error.message}`);
    }
};

```
### 🌟 Frontend: GraphQL Mutation
### 📌 Mutation Query
```bash
mutation BookHouse($houseId: ID!) {
  bookHouse(houseId: $houseId) {
    id
    bookingDate
    status
  }
}
```
### 📌 Example Code
```bash
const BOOK_HOUSE = gql`
  mutation BookHouse($houseId: ID!) {
    bookHouse(houseId: $houseId) {
      id
      bookingDate
      status
    }
  }
`;

const handleBookHouse = async () => {
    try {
        const { data } = await bookHouse({
            variables: { houseId: selectedHouse.id },
        });
        console.log('Booking successful:', data);
        alert('House booked successfully!');
    } catch (error) {
        console.error('Error booking house:', error.message);
        alert('Failed to book house');
    }
};

```
### 🗂️ Models
### 🏠 House
Defines a house available for booking.
```bash
const HouseSchema = new mongoose.Schema({
    title: String,
    location: String,
    price: Number,
    description: String,
});

```
### 📑 Booking
Tracks booking details.
```bash
const BookingSchema = new mongoose.Schema({
    house: { type: mongoose.Schema.Types.ObjectId, ref: 'House' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookingDate: Date,
    status: { type: String, default: 'confirmed' },
});
```
### 🔍 Testing
Run tests to verify functionality:
```bash
npm start
```
### 🛠️ Troubleshooting
Common Issues<br>
->Authentication Errors:<br>
   Ensure the user context is properly set and a valid JWT is provided.<br>
->Database Connectivity:<br>
   Verify your MONGO_URI is correct and MongoDB is running.<br>
->Duplicate Bookings:<br>
   Check the resolver logic for duplicate prevention.<br>
### 📄 License<br>
This project is licensed under the MIT License.<br>


