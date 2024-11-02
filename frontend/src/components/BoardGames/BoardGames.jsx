import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import BoardGameCategory from "./BoardGameCategory";
import { useEffect, useState } from "react";

function BoardGames() {
  const [boardGameName, setBoardGameName] = useState("");
  // const [boardGameLength, setBoardGameLength] = useState(60);
  const [boardGamePlayerNumber, setBoardGamePlayerNumber] = useState(12);
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

  // const handleLengthChange = (event) => {
  //   setBoardGameLength(event.target.value);
  // };

  const handlePlayerNumberChange = (event) => {
    setBoardGamePlayerNumber(Number(event.target.value));
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  useEffect(() => {
    const fetchBoardGames = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/boardgames", {
          mode: "cors",
        });

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
          setLanguages(
            Array.from(new Set(data.map((bg) => bg.language))).sort()
          );
          setCategories(
            Array.from(new Set(data.map((bg) => bg.categoryname))).sort()
          );
          setDifficulties(
            Array.from(new Set(data.map((bg) => bg.difficulty))).sort()
          );
        }
      } catch (error) {
        console.error("Error fetching boardgames: ", error);
      }
    };
    fetchBoardGames();
  }, []);
  useEffect(() => {
    const filteredBoardGames = boardgames.reduce((acc, bg) => {
      if (
        bg.maxplayernum <= boardGamePlayerNumber &&
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
    boardGamePlayerNumber,
    selectedLanguage,
    selectedCategory,
    selectedDifficulty,
  ]);

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
          <p>Nincs ilyen társasjáték</p>
        )}
      </div>

      <Footer />
    </>
  );
}
export default BoardGames;
