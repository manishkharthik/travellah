"use client";
import React, { useState } from "react"; 

const IconButton = ({ icon: Icon, label, onClick, style = {} }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    if (onClick) onClick(); // Execute the onClick prop if provided
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "1.5rem 2.5rem",
        backgroundColor: "#7a5762",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "1.5rem",
        fontWeight: "600",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "background-color 0.3s ease",
        ...style,
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#6f4f4f")} // Hover effect (darker background)
      onMouseLeave={(e) => (e.target.style.backgroundColor = clicked ? "#6f4f4f" : "#7a5762")} // Revert on mouse leave
    >
      {Icon && <Icon style={{ fontSize: '1.5rem' }} />}
      {label}
    </button>
  );
};

export default IconButton;
