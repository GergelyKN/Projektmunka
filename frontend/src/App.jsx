import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/message");
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error("Error fetching message: ", error);
      }
    };
    fetchMessage();
  }, []);

  return (
    <>
      <h1>{message ? message : "Loading..."}</h1>
    </>
  );
}

export default App;
