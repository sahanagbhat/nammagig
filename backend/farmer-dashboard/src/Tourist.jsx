import { useEffect, useState } from "react";
import axios from "axios";

function Tourist() {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/farms")
      .then(res => setFarms(res.data.farms))
      .catch(() => alert("Error loading farms"));
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>🌿 Explore Farm Experiences</h1>

      {farms.map((farm, index) => (
        <div key={index} style={{
          border: "1px solid gray",
          padding: "15px",
          marginTop: "15px",
          borderRadius: "8px"
        }}>
          <h3>{farm.title}</h3>
          <p><strong>Experience Offered:</strong> {farm.needs}</p>
          <p><strong>Stay Duration:</strong> {farm.duration} days</p>
        </div>
      ))}
    </div>
  );
}

export default Tourist;
