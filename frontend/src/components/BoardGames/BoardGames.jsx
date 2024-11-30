import { useEffect, useState } from "react";
import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import BoardGameCategory from "./BoardGameCategory";
import "./BoardGames.css";

function BoardGames() {
  const GETBOARDGAMEAPI = import.meta.env.VITE_API_BOARDGAME_URL;

  const [boardGameName, setBoardGameName] = useState("");
  const [boardGameMinPlayerNumber, setBoardGameMinPlayerNumber] = useState(1);
  const [boardGameMaxPlayerNumber, setBoardGameMaxPlayerNumber] = useState(12);
  const [boardgames, setBoardGames] = useState([]);
  const [groupedBoardGames, setGroupedBoardGames] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const handleBoardGameSearch = (event) => {
    setBoardGameName(event.target.value);
  };

  const handleRangeChange = (event) => {
    const { value, name } = event.target;

    if (name === "minPlayer") {
      const newMin = Math.min(Number(value), boardGameMaxPlayerNumber - 1);
      setBoardGameMinPlayerNumber(newMin);
    } else if (name === "maxPlayer") {
      const newMax = Math.max(Number(value), boardGameMinPlayerNumber + 1);
      setBoardGameMaxPlayerNumber(newMax);
    }
  };

  const handleLanguageChange = (event) =>
    setSelectedLanguage(event.target.value);
  const handleCategoryChange = (event) =>
    setSelectedCategory(event.target.value);
  const handleDifficultyChange = (event) =>
    setSelectedDifficulty(event.target.value);

  useEffect(() => {
    const fetchBoardGames = async () => {
      try {
        const response = await fetch(GETBOARDGAMEAPI, { mode: "cors" });
        if (response.status >= 400) {
          throw new Error("Server Error");
        }
        const data = await response.json();

        const groupedData = data.reduce((acc, bg) => {
          if (!acc[bg.categoryname]) {
            acc[bg.categoryname] = [];
          }
          acc[bg.categoryname].push(bg);
          return acc;
        }, {});

        setBoardGames(data);
        setGroupedBoardGames(groupedData);
        if (data) {
          setLanguages([...new Set(data.map((bg) => bg.language))].sort());
          setCategories([...new Set(data.map((bg) => bg.categoryname))].sort());
          setDifficulties([...new Set(data.map((bg) => bg.difficulty))].sort());
        }
      } catch (error) {
        console.error("Error fetching boardgames: ", error);
      }
    };
    fetchBoardGames();
  }, [GETBOARDGAMEAPI]);

  useEffect(() => {
    const filteredBoardGames = boardgames.reduce((acc, bg) => {
      if (
        bg.minplayernum <= boardGameMaxPlayerNumber &&
        bg.maxplayernum >= boardGameMinPlayerNumber &&
        (selectedLanguage === "all" || bg.language === selectedLanguage) &&
        (selectedCategory === "all" || bg.categoryname === selectedCategory) &&
        (selectedDifficulty === "all" ||
          bg.difficulty === selectedDifficulty) &&
        (boardGameName === "" ||
          bg.name.toUpperCase().includes(boardGameName.toUpperCase()))
      ) {
        if (!acc[bg.categoryname]) {
          acc[bg.categoryname] = [];
        }
        acc[bg.categoryname].push(bg);
      }
      return acc;
    }, {});
    setGroupedBoardGames(filteredBoardGames);
  }, [
    boardgames,
    boardGameName,
    boardGameMinPlayerNumber,
    boardGameMaxPlayerNumber,
    selectedLanguage,
    selectedCategory,
    selectedDifficulty,
  ]);

  return (
    <div className="app-container">
      <NavBar />
      <div className="mainpage">
        <div className="boardgamesNavbar">
          <div className="boardgamesNavbarUpper">
            <label htmlFor="boardgamesSearch">Társasjáték neve: </label>
            <input
              className="boardgamesInput"
              type="text"
              id="boardgamesSearchForName"
              name="boardgamesSearchForName"
              value={boardGameName}
              onChange={handleBoardGameSearch}
            />

            <label htmlFor="language">Nyelv: </label>
            <select
              name="language"
              id="language"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="all">Összes Nyelv</option>
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>

            <label htmlFor="category">Kategória: </label>
            <select
              name="category"
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="all">Összes Kategória</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <label htmlFor="difficulty">Nehézség: </label>
            <select
              name="difficulty"
              id="difficulty"
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
            >
              <option value="all">Összes Nehézség</option>
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>
          <div className="boardgamesLower">
            <label>Játékosok száma:</label>
            <div className="range-slider">
              <input
                type="range"
                name="minPlayer"
                min="1"
                max="12"
                value={boardGameMinPlayerNumber}
                onChange={handleRangeChange}
              />
              <input
                type="range"
                name="maxPlayer"
                min="1"
                max="12"
                value={boardGameMaxPlayerNumber}
                onChange={handleRangeChange}
              />
            </div>
            <p>
              {boardGameMinPlayerNumber} - {boardGameMaxPlayerNumber} fő
            </p>
          </div>
        </div>

        <div className="boardgamesMain">
          {Object.keys(groupedBoardGames).length > 0 ? (
            Object.keys(groupedBoardGames)
              .sort()
              .map((categoryname) => (
                <BoardGameCategory
                  key={categoryname}
                  boardgames={groupedBoardGames[categoryname]}
                />
              ))
          ) : (
            <p className="noboardgame">Nem található ilyen társasjáték!</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BoardGames;
