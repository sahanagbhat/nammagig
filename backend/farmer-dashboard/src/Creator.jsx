import { useState } from "react";
import axios from "axios";

function Creator() {
  const [skills, setSkills] = useState("");
  const [duration, setDuration] = useState(1);
  const [matches, setMatches] = useState([]);

  const topScore = matches.length > 0 ? matches[0].match_score : 0;

  const findGigs = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/match/creator", {
        skills,
        duration: Number(duration),
      });
      setMatches(response.data.matches);
    } catch (error) {
      alert("Error connecting to AI server");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>🎥 Creator Gig Matcher</h1>

      <textarea
        placeholder="Describe your skills..."
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        rows={3}
        style={{ width: "300px", padding: "5px" }}
      />

      <div style={{ marginTop: "10px" }}>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{ width: "60px", padding: "5px" }}
        />
        <span> days available</span>
      </div>

      <button onClick={findGigs} style={{ marginTop: "10px", padding: "8px" }}>
        🤖 Find Matching Farm Gigs
      </button>

      <h2 style={{ marginTop: "30px" }}>Recommended Gigs</h2>

      {matches.length > 0 && (
  <div
    style={{
      backgroundColor: "#1e293b",
      color: "white",
      padding: "15px",
      borderRadius: "8px",
      marginTop: "20px",
      maxWidth: "400px"
    }}
  >
    <strong>📈 AI Match Insight</strong>

    {topScore > 85 && (
      <p style={{ marginTop: "5px" }}>
        Strong alignment between your skills and this farm’s content needs. High chance of successful collaboration.
      </p>
    )}

    {topScore <= 85 && topScore > 65 && (
      <p style={{ marginTop: "5px" }}>
        Moderate match. You can deliver value, but refining your profile may improve future matches.
      </p>
    )}

    {topScore <= 65 && (
      <p style={{ marginTop: "5px" }}>
        No strong gig matches yet. Consider adding more detailed skills to improve AI recommendations.
      </p>
    )}
  </div>
)}


      {matches.map((match, index) => (
        <div key={index} style={{ border: "1px solid gray", padding: "10px", marginTop: "10px" }}>
          <h3>{match.farm_title}</h3>
          <p><strong>Match Score:</strong> {match.match_score}%</p>

<p>
  <strong>AI Confidence:</strong>{" "}
  {match.match_score > 80 ? "High" : "Moderate"}
</p>

<p>{match.reason}</p>

        </div>
      ))}
    </div>
  );
}

export default Creator;
