import Tourist from "./Tourist";
import Creator from "./Creator";
import { useState } from "react";
import axios from "axios";

function App() {
  const [needs, setNeeds] = useState("");
  const [duration, setDuration] = useState(1);
  const [matches, setMatches] = useState([]);
  const topScore = matches.length > 0 ? matches[0].match_score : 0;


  const findMatches = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/match/farm", {
        needs,
        duration: Number(duration),
      });
      setMatches(response.data.matches);
    } catch (error) {
      alert("Error connecting to AI server");
    }
  };

  const [view, setView] = useState("farmer");

  return (
  <div style={{ padding: "30px", fontFamily: "Arial" }}>

    <div style={{ marginBottom: "15px" }}>
      <button onClick={() => setView("farmer")}>Farmer View 🌾</button>
      <button onClick={() => setView("creator")} style={{ marginLeft: "10px" }}>
        Creator View 🎥
      </button>
      <button onClick={() => setView("tourist")} style={{ marginLeft: "10px" }}>
  Tourist View 🌍
</button>
    </div>

    {view === "farmer" && (
      <>
        <h1>🌾 Farmer Content Matcher</h1>


      <div style={{ marginBottom: "10px" }}>
        <textarea
          placeholder="Describe what content you need..."
          value={needs}
          onChange={(e) => setNeeds(e.target.value)}
          rows={3}
          style={{ width: "300px", padding: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{ width: "60px", padding: "5px" }}
        />
        <span> days required</span>
      </div>

      <button onClick={findMatches} style={{ padding: "8px 12px" }}>
        🤖 Find Best Creators
      </button>

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
    <strong>📈 AI Impact Insight</strong>

    {topScore > 85 && (
      <p style={{ marginTop: "5px" }}>
        This is a high-confidence match. The creator's skills strongly align with your farm’s content needs, increasing the chances of engaging promotional content.
      </p>
    )}

    {topScore <= 85 && topScore > 65 && (
      <p style={{ marginTop: "5px" }}>
        This is a moderate match. The creator can produce relevant content, but refining your requirements could improve results.
      </p>
    )}

    {topScore <= 65 && (
      <p style={{ marginTop: "5px" }}>
        No strong matches yet. Consider adjusting the content description or duration for better AI recommendations.
      </p>
    )}
  </div>
)}



      <h2 style={{ marginTop: "30px" }}>AI Matches</h2>

      {matches.map((match, index) => (
        <div
          key={index}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>{match.creator_name}</h3>

<p><strong>Match Score:</strong> {match.match_score}%</p>

<p>
  <strong>AI Confidence:</strong>{" "}
  {match.match_score > 80 ? "High" : "Moderate"}
</p>

<p>{match.reason}</p>

        </div>
      ))}

            </>
    )}

    {view === "creator" && <Creator />}
    {view === "tourist" && <Tourist />}

    </div>
  );
}

export default App;
