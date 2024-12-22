import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import SellerDashBoard from "./components/SellerDashBoard";
import BuyerDashBoard from "./components/BuyerDashBoard";
import AddHouse from "./components/AddHouse";
import UserListings from "./components/UserListings";
import HouseDescription from "./components/HouseDescription";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
const uri = "http://localhost:4001/api";
const cache = new InMemoryCache();
// configure Apollo Client
const client = new ApolloClient({
 uri,
 cache,
 connectToDevTools: true
});

function App() {
  return (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/seller-dashboard" element={<SellerDashBoard />} />
        <Route path="/buyer-dashboard" element={<BuyerDashBoard />} />
        <Route path="/add-house" element={<AddHouse />} />
        <Route path="/user-listings" element={<UserListings />} />
        <Route path="/house-description" element={<HouseDescription />} />
      </Routes>
    </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
