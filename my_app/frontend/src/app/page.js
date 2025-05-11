import Image from 'next/image';

export default function Home() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Background overlay */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(208, 234, 255, 0.26)",
          zIndex: 1,
        }}
      ></div>

      {/* Logo and name */}
      <div
        style={{
          position: "absolute",
          top: "20px", // distance from the top
          left: "20px", // distance from the left
          display: "flex",
          alignItems: "center",
          zIndex: 2, // Ensure it's above other content
        }}
      >
        {/* Name */}
        <h1
          style={{ 
            fontFamily: "var(--font-aleo)", 
            fontSize: "3.5rem",
            fontWeight: "bold",
            color: "#363c15",
            margin: 0,
            fontStyle: "italic",
          }}
        >
          TravelLah!
        </h1>
      </div>

      {/* Foreground content */}
      <div 
        style={{ 
          position: "relative",
          zIndex: 2,
          color: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start", // start from top
          paddingTop: "20vh", // push content down
          textAlign: "center",
        }}
      >
        <h1 style={{ 
            fontSize: "3.4rem", 
            fontWeight: "bold", 
            marginBottom: "1rem", 
            textShadow: "6px 6px 20px rgba(0, 0, 0, 0.7)", // 3D text effect
          }}>
          Don't let your travel plans unravel
        </h1>
        <div>
          <p style={{ 
            fontFamily: "var(--font-open-sans)",  
            fontWeight: 600,                  
            fontStyle: "italic",                 
            fontSize: "2rem",
            }}>
              Plan group trips: no sweat, no fuss
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#dbd9ce", // Light background color
          padding: "1.5rem 0", // Space for content
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <h2 style={{ fontFamily: "var(--font-aleo)", fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Dive In
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10rem", // Space between the features
            alignItems: "center",
            paddingRight: "5rem",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
        >
          <button
          style={{
          padding: "1.5rem 3rem",
          backgroundColor: "#7a5762",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "1.5rem",
          fontWeight: "600",
          cursor: "pointer",
        }}
          >
            Collaborative Itinerary
          </button>
          <button
            style={{
              padding: "1.5rem 3rem",
              backgroundColor: "#7a5762",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.5rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Smart Cost-Splitting
          </button>
          <button
            style={{
              padding: "1.5rem 3rem",
              backgroundColor: "#7a5762",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.5rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Real-Time Chat
          </button>
        </div>
      </div>
    </div>
  );
}

