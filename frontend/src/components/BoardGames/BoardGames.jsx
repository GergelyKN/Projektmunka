import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import BoardGameCategory from "./BoardGameCategory";
import { useState } from "react";

function BoardGames() {
  const [boardGameName, setBoardGameName] = useState("");
  const [boardGameLength, setBoardGameLength] = useState(60);
  const [boardGamePlayerNumber, setBoardGamePlayerNumber] = useState(4);
  const handleBoardGameSearch = (event) => {
    setBoardGameName(event.target.value);
  };

  const handleLengthChange = (event) => {
    setBoardGameLength(event.target.value);
  };

  const handlePlayerNumberChange = (event) => {
    setBoardGamePlayerNumber(event.target.value);
  };

  const boardgames = [
    {
      id: 1,
      name: "Bang",
      category: "lovoldozos",
      language: "magyar",
      difficulty: "konnyu",
    },
    {
      id: 2,
      name: "Monopoly",
      category: "penz",
      language: "angol",
      difficulty: "kozepes",
    },
    {
      id: 3,
      name: "Ticket To Ride",
      category: "epitos",
      language: "angol",
      difficulty: "konnyu",
    },
    {
      id: 4,
      name: "Ticket To Ride 2 ",
      category: "epitos",
      language: "francia",
      difficulty: "konnyu",
    },
  ];

  //Kategória alapján csoportosítás
  const groupedBoardGames = boardgames.reduce((acc, bg) => {
    if (!acc[bg.category]) {
      acc[bg.category] = [];
    }
    acc[bg.category].push(bg);
    return acc;
  }, {});

  //Minden elérhető nyelv-, kategória-, nehézségi szint alapján szűrés
  const languages = [...new Set(boardgames.map((bg) => bg.language))].sort();
  const categories = [...new Set(boardgames.map((bg) => bg.category))].sort();
  const difficulties = [
    ...new Set(boardgames.map((bg) => bg.difficulty)),
  ].sort();

  return (
    <>
      <NavBar />
      <div className="boardgamesNavbar">
        <label htmlFor="boardgamesSearch">Társasjáték: </label>
        <input
          type="text"
          id="boardgamesSearchForName"
          name="boardgamesSearchForName"
          value={boardGameName}
          onChange={handleBoardGameSearch}
        />
        <label htmlFor="language">Nyelv: </label>
        <select name="language" id="language">
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
        <label htmlFor="category">Kategória: </label>
        <select name="category" id="category">
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <label htmlFor="difficulty">Nehézség: </label>
        <select name="difficulty" id="difficulty">
          {difficulties.map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>
        {/* Megoldani, hogy egy csúszkán 2 input legyen,
          amivel a min és max hosszat lehet állítani    */}
        <label htmlFor="length">Játék maximális hossza: </label>
        <input
          type="range"
          name="length"
          id="length"
          min="10"
          max="240"
          value={boardGameLength}
          step={5}
          onChange={handleLengthChange}
        />
        <p>{boardGameLength} perc</p>
        <label htmlFor="length">Játékosok maximális száma: </label>
        <input
          type="range"
          name="length"
          id="length"
          min="1"
          max="12"
          value={boardGamePlayerNumber}
          step={1}
          onChange={handlePlayerNumberChange}
        />
        <p>{boardGamePlayerNumber} fő</p>
      </div>
      <div className="everyBoardGame">
        {Object.keys(groupedBoardGames)
          .sort()
          .map((category) => (
            <BoardGameCategory
              key={category}
              boardgames={groupedBoardGames[category]}
            />
          ))}
      </div>

      <Footer />
    </>
  );
}
export default BoardGames;
