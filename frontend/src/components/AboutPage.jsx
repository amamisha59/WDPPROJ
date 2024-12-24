import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./AboutPage.css";

function AboutPage() {
  const navigate = useNavigate(); // Initialize navigate

  const teamMembers = [
    {
      name: "Aditya Swain",
      image: "https://via.placeholder.com/150",
      description: "John is the lead developer, passionate about building scalable applications."
    },
    {
      name: "Niranjan Singh",
      image: "https://via.placeholder.com/150",
      description: "Jane is a UX/UI designer, creating user-friendly designs and experiences."
    },
    {
      name: "Amisha Sinha",
      image: "https://via.placeholder.com/150",
      description: "Alice is a product manager, ensuring the smooth delivery of our projects."
    },
    {
      name: "Anuj Pratap Singh",
      image: "https://via.placeholder.com/150",
      description: "Bob is a backend developer, specializing in databases and server-side logic."
    },
    {
      name: "Kanhaiya",
      image: "https://via.placeholder.com/150",
      description: "Emma is a marketing expert, driving strategies to expand our brand presence."
    },
    {
      name: "Fabiha",
      image: "https://via.placeholder.com/150",
      description: "Mike is a frontend developer, creating engaging and responsive user interfaces."
    }
  ];

  return (
    <div className="about-container">
      <h1 className="about-heading">Meet Our Team</h1>
      
      {/* Team Members Cards */}
      <div className="team-cards-container">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.image} alt={member.name} className="team-member-image" />
            <h3 className="team-member-name">{member.name}</h3>
            <p className="team-member-description">{member.description}</p>
          </div>
        ))}
      </div>
      
      {/* Back Button */}
      <div className="text-center mt-6">
        <button 
          onClick={() => navigate("/")}  // Navigates back to the landing page
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold 
                     hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Back to Landing Page
        </button>
      </div>
    </div>
  );
}

export default AboutPage;
