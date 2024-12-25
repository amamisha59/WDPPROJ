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
import AboutPage from "./components/AboutPage";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import SoldHouse from "./components/SoldHouse";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";

const httpLink = createHttpLink({
  uri: "https://wdpproj.onrender.com/api",
});

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage
  const token = localStorage.getItem("userToken");

  // Return the headers to the context
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
    },
    query: {
      fetchPolicy: "network-only",
    },
  },
});

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

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
          <Route path="/sold-houses" element={<SoldHouse />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
