import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { FaLinkedin, FaInstagram } from 'react-icons/fa'; // Import icons
import "./AboutPage.css";

function AboutPage() {
  const navigate = useNavigate(); // Initialize navigate

  const teamMembers = [
    {
      name: "Aditya Prakash Swain",
      image: "/aditya.jpg",
      description: "Aditya Prakash Swain is the key player in our team, contributing extensively to both frontend and backend development. His expertise in integrating the two ensures a seamless and efficient platform, making him an invaluable part of our project.",
      linkedin: "https://www.linkedin.com/in/aditya-swain-1b5a31226/",
      instagram: "https://www.instagram.com/aditya.prakash.swain/"
      
    },
    {
      name: "Niranjan Singh",
      image: "/rinku.jpg",
      description: "Niranjan Singh spearheaded our frontend development efforts, crafting responsive and visually engaging interfaces that ensure an excellent user experience across all devices.",
      linkedin: "https://www.linkedin.com/in/niranjan-singh-359587315/",
      instagram: "https://www.instagram.com/niranjansingh__3112/"
    },
    {
      name: "Amisha Sinha",
      image: "/amisha.jpg",
      description: "Amisha Sinha played a vital role in integrating the frontend with the backend, ensuring seamless communication between both ends. While she contributed to frontend development, her focus was primarily on bridging the gap between design and functionality.",
      instagram: "https://www.instagram.com/th_amisshaaa/",
      linkedin: "https://www.linkedin.com/in/amisha-sinha-425336235"
    },
    {
      name: "Anuj Pratap Singh",
      image: "/anuj.jpg",
      description: "Anuj Pratap Singh supports our backend development efforts by ensuring seamless integration and smooth functioning of critical server-side operations. His collaborative approach strengthens the core of our platform.",
      instagram: "https://www.instagram.com/anuj__lancelot/",
      linkedin: "https://www.linkedin.com/in/anuj-pratap-singh-9a063b269/"
    },
    {
      name: "Kanhaiya Mahato",
      image: "/Kanha.jpg",
      description: "Kanhaiya Mahato excels in designing captivating user interfaces and managing detailed project reports, ensuring a seamless balance between aesthetics and project organization.",
      instagram: "https://www.instagram.com/kanha_253/",
      linkedin: "http://linkedin.com/in/kanha253"
    },
    {
      name: "Fabiha Makhdoomi",
      image: "/fabiha.jpg",
      description: "Pz Fabiha Akmal Makhdoomi ensures efficient version control, smooth deployment processes, and robust CI/CD pipelines, laying the groundwork for our platform's continuous delivery and success.",
      instagram: "https://www.instagram.com/fabssssx/",
      linkedin: "https://www.linkedin.com/in/fabihamakhdoomi/"
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
            <div className="social-links mt-4 flex justify-center space-x-4">
              <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a 
                href={member.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 transition-colors duration-300"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
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
