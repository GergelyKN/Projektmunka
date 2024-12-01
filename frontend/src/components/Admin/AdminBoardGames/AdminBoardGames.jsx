import NavBar from "../../Helper_Components/NavBar";
import Footer from "../../Helper_Components/Footer";
import AdminBoardGameCategory from "./AdminBoardGameCategory";
import { useEffect, useState } from "react";

import "./AdminBoardGames.css";

function AdminBoardGames() {
  const GETBOARDGAMEAPI = import.meta.env.VITE_API_BOARDGAME_URL;
  const GETBOARDGAMECATEGORYAPI = import.meta.env
    .VITE_API_BOARDGAMECATEGORY_URL;
  const GETBOARDGAMELANGUAGEAPI = import.meta.env
    .VITE_API_BOARDGAMELANGUAGE_URL;
  const ADMINBOARDGAMEAPI = import.meta.env.VITE_API_ADMIN_BOARDGAME_URL;
  const ADMINADDBOARDGAMECATEGORYAPI = import.meta.env
    .VITE_API_ADMIN_ADDBOARDGAMECATEGORY_URL;

  const [addNewCategoryName, setAddNewCategoryName] = useState("");
  const [addNewBoardGameCategory, setAddNewBoardGameCategory] = useState(false);

  //#region Megjelenítéshez useState-ek
  const [boardGameName, setBoardGameName] = useState("");
  const [boardGameMinPlayerNumber, setBoardGameMinPlayerNumber] = useState(1);
  const [boardGameMaxPlayerNumber, setBoardGameMaxPlayerNumber] = useState(12);
  const [boardgames, setBoardGames] = useState([]);
  const [groupedBoardGames, setGroupedBoardGames] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [selectedLanguageForDisplay, setSelectedLanguageForDisplay] =
    useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedBoardGame, setSelectedBoardGame] = useState(null);
  const [groupedCategories, setGroupedCategories] = useState([]);
  const [groupedLanguages, setGroupedLanguages] = useState([]);
  //#endregion Megjelenítéshez useState-ek

  //#region Update Formhoz useState-ek
  const [updateName, setUpdateName] = useState("");
  const [updateDifficulty, setUpdateDifficulty] = useState("");
  const [updateMinPlayerNum, setUpdateMinPlayerNum] = useState(1);
  const [updateMaxPlayerNum, setUpdateMaxPlayerNum] = useState(12);
  const [updateLanguage, setUpdateLanguage] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  //#endregion Update Formhoz useState-ek
  //#region Add BoardGame Formhoz useState-ek
  const [addName, setAddName] = useState("");
  const [addDifficulty, setAddDifficulty] = useState("");
  const [addMinPlayerNum, setAddMinPlayerNum] = useState(1);
  const [addMaxPlayerNum, setAddMaxPlayerNum] = useState(12);
  const [addDescription, setAddDescription] = useState("");
  const [addLanguage, setAddLanguage] = useState("");
  const [addCategoryName, setAddCategoryName] = useState("");
  const [addNewBoardGame, setAddNewBoardGame] = useState(false);
  //#endregion Add BoardGame Formhoz useState-ek

  const cleanupAfterUpdate = () => {
    setSelectedBoardGame(null);
    setUpdateName("");
    setUpdateDifficulty("");
    setUpdateMinPlayerNum(0);
    setUpdateMaxPlayerNum(0);
    setUpdateDescription("");
    setUpdateLanguage("");
    setUpdateCategoryName("");
  };
  const cleanupAfterAdd = () => {
    setAddName("");
    setAddDifficulty("");
    setAddMinPlayerNum(0);
    setAddMaxPlayerNum(0);
    setAddDescription("");
    setAddLanguage("");
    setAddCategoryName("");
    setAddNewBoardGame(false);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(GETBOARDGAMECATEGORYAPI, {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status >= 400) {
        throw new Error("Szerver Error");
      }
      const data = await response.json();

      const categoriesObject = data.reduce((acc, category) => {
        acc[category.categoryid] = category.categoryname;
        return acc;
      }, {});
      setGroupedCategories(categoriesObject);
    } catch (err) {
      console.error("Hiba történt a kategóriák lekérdezése közben: ", err);
    }
  };
  const fetchLanguages = async () => {
    try {
      const response = await fetch(GETBOARDGAMELANGUAGEAPI, {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status >= 400) {
        throw new Error("Szerver Error");
      }
      const data = await response.json();
      const languagesObject = data.reduce((acc, language) => {
        acc[language.languageid] = language.language;
        return acc;
      }, {});
      setGroupedLanguages(languagesObject);
    } catch (err) {
      console.error("Hiba történt a nyelvek lekérdezése közben: ", err);
    }
  };

  const fetchBoardGames = async () => {
    try {
      const response = await fetch(GETBOARDGAMEAPI, {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status >= 400) {
        throw new Error("Szerver Error");
      }
      const data = await response.json();

      const groupedData = data.reduce((acc, bg) => {
        if (!acc[bg.categoryname]) {
          acc[bg.categoryname] = [];
        }
        acc[bg.categoryname].push(bg);
        return acc;
      }, {});
      Object.keys(groupedData).forEach((category) => {
        groupedData[category].sort((a, b) => a.name.localeCompare(b.name));
      });

      setBoardGames(data);
      setGroupedBoardGames(groupedData);
      if (data) {
        setDifficulties(["Könnyű", "Közepes", "Nehéz"]);
      }
    } catch (error) {
      console.error("Hiba történt a társasjátékok lekérdezése közben: ", error);
    }
  };

  useEffect(() => {
    fetchBoardGames();
    fetchCategories();
    fetchLanguages();
  }, []);

  useEffect(() => {
    const firstCategoryValue = Object.entries(groupedCategories)[0]?.[1];
    if (firstCategoryValue) {
      setAddCategoryName(firstCategoryValue);
      setUpdateCategoryName(firstCategoryValue);
    }
  }, [groupedCategories]);

  useEffect(() => {
    const firstLanguageValue = Object.entries(groupedLanguages)[0]?.[1];
    if (firstLanguageValue) {
      setAddLanguage(firstLanguageValue);
      setUpdateLanguage(firstLanguageValue);
    }
  }, [groupedLanguages]);

  useEffect(() => {
    const firstDifficultyValue = difficulties[0];
    if (firstDifficultyValue) {
      setAddDifficulty(firstDifficultyValue);
      setUpdateDifficulty(firstDifficultyValue);
    }
  }, [difficulties]);

  useEffect(() => {
    const filteredBoardGames = boardgames.reduce((acc, bg) => {
      if (
        bg.minplayernum <= boardGameMaxPlayerNumber &&
        bg.maxplayernum >= boardGameMinPlayerNumber &&
        (selectedLanguageForDisplay === "all" ||
          bg.language === selectedLanguageForDisplay) &&
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
    Object.keys(filteredBoardGames).forEach((category) => {
      filteredBoardGames[category].sort((a, b) => a.name.localeCompare(b.name));
    });
    setGroupedBoardGames(filteredBoardGames);
  }, [
    boardgames,
    boardGameName,
    selectedLanguageForDisplay,
    selectedCategory,
    selectedDifficulty,
    boardGameMaxPlayerNumber,
    boardGameMinPlayerNumber,
  ]);

  //#region Szűréshez használt input függvények
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

  const handleLanguageChange = (event) => {
    setSelectedLanguageForDisplay(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };
  //#endregion Szűréshez használt input függvények

  //#region Update form input kezelés
  const handleUpdateNameChange = (event) => {
    setUpdateName(event.target.value);
  };

  const handleUpdateDifficultyChange = (event) => {
    setUpdateDifficulty(event.target.value);
  };

  const handleUpdateMinPlayerNumChange = (event) => {
    setUpdateMinPlayerNum(Number(event.target.value));
  };
  const handleUpdateMaxPlayerNumChange = (event) => {
    setUpdateMaxPlayerNum(Number(event.target.value));
  };
  const handleUpdateLanguageForDisplay = (event) => {
    setUpdateLanguage(event.target.value);
  };
  const handleUpdateDescription = (event) => {
    setUpdateDescription(event.target.value.toString());
  };
  const handleUpdateCategoryName = (event) => {
    setUpdateCategoryName(event.target.value);
  };
  //#endregion Update form input kezelés
  //#region Add form input kezelés
  const handleAddNameChange = (event) => {
    setAddName(event.target.value);
  };

  const handleAddDifficultyChange = (event) => {
    setAddDifficulty(event.target.value);
  };

  const handleAddMinPlayerNumChange = (event) => {
    setAddMinPlayerNum(Number(event.target.value));
  };
  const handleAddMaxPlayerNumChange = (event) => {
    setAddMaxPlayerNum(Number(event.target.value));
  };
  const handleAddLanguageForDisplay = (event) => {
    setAddLanguage(event.target.value);
  };
  const handleAddDescription = (event) => {
    setAddDescription(event.target.value.toString());
  };
  const handleAddCategoryName = (event) => {
    setAddCategoryName(event.target.value);
  };
  //#endregion ADD form input kezelés
  //#region Delete BoardGame
  const handleDelete = async (boardgameID) => {
    try {
      const response = await fetch(ADMINBOARDGAMEAPI, {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ boardgameID }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Hibaüzenet a szerver felől:", data.error);
      } else {
        alert(data.message);
        setBoardGames(
          boardgames.filter(
            (boardgame) => boardgame.boardgameid !== boardgameID
          )
        );
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    }
  };
  //#endregion //#region Delete BoardGame
  const handleShowAddForm = () => {
    setAddNewBoardGame(true);
  };
  const handleShowUpdateForm = (boardgameID) => {
    const boardgame = boardgames.find(
      (boardgame) => boardgame.boardgameid === boardgameID
    );
    setSelectedBoardGame(boardgame);
    setUpdateName(boardgame.name);
    setUpdateDifficulty(boardgame.difficulty);
    setUpdateMinPlayerNum(boardgame.minplayernum);
    setUpdateMaxPlayerNum(boardgame.maxplayernum);
    setUpdateDescription(boardgame.description);
    setUpdateLanguage(boardgame.language);
    setUpdateCategoryName(boardgame.categoryname);
  };

  const handleUpdate = async (event) => {
    const boardgame = {
      boardgameid: Number(selectedBoardGame.boardgameid),
      name: updateName,
      difficulty: updateDifficulty,
      minplayernum: Number(updateMinPlayerNum),
      maxplayernum: Number(updateMaxPlayerNum),
      description: updateDescription,
      categoryid: Number(
        Object.entries(groupedCategories).find(
          ([key, value]) => value === updateCategoryName
        )[0]
      ),
      languageid: Number(
        Object.entries(groupedLanguages).find(
          ([key, value]) => value === updateLanguage
        )[0]
      ),
    };

    event.preventDefault();
    try {
      const response = await fetch(ADMINBOARDGAMEAPI, {
        mode: "cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ boardgame }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Hibaüzenet a szerver felől: ", data.error);
      } else {
        alert(data.message);
        await fetchBoardGames();
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    } finally {
      cleanupAfterUpdate();
    }
  };
  const handleAdd = async (event) => {
    event.preventDefault();
    const boardgame = {
      name: addName,
      difficulty: addDifficulty,
      minplayernum: Number(addMinPlayerNum),
      maxplayernum: Number(addMaxPlayerNum),
      description: addDescription,
      categoryid: Number(
        Object.entries(groupedCategories).find(
          ([key, value]) => value === addCategoryName
        )[0]
      ),
      languageid: Number(
        Object.entries(groupedLanguages).find(
          ([key, value]) => value === addLanguage
        )[0]
      ),
    };
    console.log(boardgame);
    try {
      const response = await fetch(ADMINBOARDGAMEAPI, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ boardgame }),
      });
      const data = await response.json();

      if (!response.ok) {
        console.error("Hibaüzenet a szerver felől: ", data.error);
      } else {
        alert(data.message);
        await fetchBoardGames();
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    } finally {
      cleanupAfterAdd();
    }
  };

  //#region Add Category
  const handleAddCategory = async (event) => {
    event.preventDefault();
    const categoryname = addNewCategoryName;
    try {
      const response = await fetch(ADMINADDBOARDGAMECATEGORYAPI, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryname }),
      });
      const data = await response.json();

      if (!response.ok) {
        console.error("Hibaüzenet a szerver felől: ", data.error);
      } else {
        alert(data.message);
        await fetchBoardGames();
        await fetchCategories();
        await fetchLanguages();
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    } finally {
      cleanupAfterAddCategory();
    }
  };
  const cleanupAfterAddCategory = () => {
    setAddNewCategoryName("");
    setAddNewBoardGameCategory(false);
  };
  const handleShowAddCategoryForm = () => {
    setAddNewBoardGameCategory(true);
  };
  const handleAddNewCategoryNameChange = (event) => {
    setAddNewCategoryName(event.target.value);
  };
  //#endregion Add Category
  //#region Delete Category
  const REMOVECATEGORYAPI = import.meta.env
    .VITE_API_ADMIN_REMOVEBOARDGAMECATEGORY_URL;

  const isCategoriesLengthGreaterThanZero =
    Object.values(groupedCategories).length > 0;
  const initialCategoryValue = isCategoriesLengthGreaterThanZero
    ? Object.values(groupedCategories)[0]
    : "";
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [deleteBoardGameCategory, setDeleteBoardGameCategory] = useState(false);

  useEffect(() => {
    const firstCategoryValue = Object.entries(groupedCategories)[0]?.[1];
    if (firstCategoryValue) {
      setAddCategoryName(firstCategoryValue);
    }
  }, [groupedCategories]);
  useEffect(() => {
    if (Object.values(groupedCategories).length > 0) {
      setSelectedCategoryName(initialCategoryValue);
    }
  }, [
    groupedCategories,
    initialCategoryValue,
    isCategoriesLengthGreaterThanZero,
  ]);

  const handleShowRemoveCategoryForm = () => {
    setDeleteBoardGameCategory(true);
  };
  const handleRemoveCategory = async (event) => {
    event.preventDefault();
    const categoryname = selectedCategoryName;
    try {
      const response = await fetch(REMOVECATEGORYAPI, {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryname }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Hibaüzenet a szerver felől:", data.error);
      } else {
        alert(data.message);
        await fetchCategories();
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    } finally {
      cleanupAfterRemoveCategory();
      await Promise.all([
        fetchBoardGames(),
        fetchCategories(),
        fetchLanguages(),
      ]);
    }
  };
  const cleanupAfterRemoveCategory = () => {
    setDeleteBoardGameCategory(false);
    setSelectedCategoryName(initialCategoryValue);
  };
  const handleSelectedCategoryNameChange = (event) => {
    setSelectedCategoryName(event.target.value);
  };

  //#endregion Delete Category
  //#region  Update Category
  const UPDATECATEGORYAPI = import.meta.env
    .VITE_API_ADMIN_UPDATEBOARDGAMECATEGORY_URL;
  const [updateBoardGameCategory, setUpdateBoardGameCategory] = useState(false);
  const [updatedBoardGameCategoryName, setUpdatedBoardGameCategoryName] =
    useState("");
  const handleShowUpdateCategoryForm = () => {
    setUpdateBoardGameCategory(true);
  };
  const cleanupAfterUpdateCategory = () => {
    setUpdateBoardGameCategory(false);
    setSelectedCategoryName(initialCategoryValue);
    setUpdatedBoardGameCategoryName("");
  };
  const handleUpdatedBoardGameCategoryName = (event) => {
    setUpdatedBoardGameCategoryName(event.target.value);
  };

  const handleUpdateCategory = async (event) => {
    event.preventDefault();
    const categoryname = selectedCategoryName;
    const updatedname = updatedBoardGameCategoryName;
    try {
      const response = await fetch(UPDATECATEGORYAPI, {
        mode: "cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryname, updatedname }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Hibaüzenet a szerver felől:", data.error);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    } finally {
      cleanupAfterUpdateCategory();
      await Promise.all([
        fetchBoardGames(),
        fetchCategories(),
        fetchLanguages(),
      ]);
    }
  };
  //#endregion Update Category

  return (
    <div className="app-container">
      <NavBar />
      <div className="mainpage">
        <div className="boardgamesNavbar">
          <div className="boardgamesNavbarUpper">
            <label htmlFor="boardgamesSearchForName">Társasjáték neve: </label>
            <input
              className="boardgamesInput"
              type="text"
              id="boardgamesSearchForName"
              name="boardgamesSearchForName"
              value={boardGameName}
              onChange={handleBoardGameSearch}
            />

            <label htmlFor="boardgameLanguages">Nyelv: </label>
            <select
              name="boardgameLanguages"
              id="boardgameLanguages"
              value={selectedLanguageForDisplay}
              onChange={handleLanguageChange}
            >
              <option value="all">Összes Nyelv</option>
              {Object.entries(groupedLanguages).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </select>

            <label htmlFor="boardgameCategories">Kategória: </label>
            <select
              name="boardgameCategories"
              id="boardgameCategories"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="all">Összes Kategória</option>
              {Object.entries(groupedCategories).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </select>

            <label htmlFor="boardGameDifficulties">Nehézség: </label>
            <select
              name="boardGameDifficulties"
              id="boardGameDifficulties"
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
        {!addNewBoardGameCategory && (
          <button
            className="adminBoardGameButton"
            id="addBoardGameCategoryShowForm"
            onClick={handleShowAddCategoryForm}
          >
            Társasjáték Kategória hozzáadása
          </button>
        )}
        {addNewBoardGameCategory && (
          <form className="adminBoardGameForm" onSubmit={handleAddCategory}>
            <fieldset className="adminBoardGameFieldset">
              <button
                className="adminBoardGameButton"
                id="closebtn"
                onClick={cleanupAfterAddCategory}
              >
                X
              </button>
              <label htmlFor="addednewCategoryName">Kategória név:</label>
              <input
                className="adminBoardGameInput"
                type="text"
                name="addednewCategoryName"
                id="addednewCategoryName"
                value={addNewCategoryName}
                onChange={handleAddNewCategoryNameChange}
                required
              />
              <button className="adminBoardGameButton" type="submit">
                Küldés
              </button>
            </fieldset>
          </form>
        )}
        {!deleteBoardGameCategory && (
          <button
            className="adminBoardGameButton"
            id="removeBoardGameCategoryShowForm"
            onClick={handleShowRemoveCategoryForm}
          >
            Társasjáték Kategória törlése
          </button>
        )}
        {deleteBoardGameCategory && (
          <form className="adminBoardGameForm" onSubmit={handleRemoveCategory}>
            <fieldset className="adminBoardGameFieldset">
              <button
                className="adminBoardGameButton"
                id="closebtn"
                onClick={cleanupAfterRemoveCategory}
              >
                X
              </button>
              <label htmlFor="removedCategoryName">Kategória név/nevek: </label>
              <select
                className="adminBoardGameSelect"
                name="removedCategoryName"
                id="removedCategoryName"
                value={selectedCategoryName}
                onChange={handleSelectedCategoryNameChange}
              >
                {Object.entries(groupedCategories).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <button className="adminBoardGameButton" type="submit">
                Küldés
              </button>
            </fieldset>
          </form>
        )}
        {!updateBoardGameCategory && (
          <button
            className="adminBoardGameButton"
            id="updateBoardGameCategoryShowForm"
            onClick={handleShowUpdateCategoryForm}
          >
            Társasjáték Kategória módosítása
          </button>
        )}
        {updateBoardGameCategory && (
          <form className="adminBoardGameForm" onSubmit={handleUpdateCategory}>
            <fieldset className="adminBoardGameFieldset">
              <button
                className="adminBoardGameButton"
                id="closebtn"
                onClick={cleanupAfterUpdateCategory}
              >
                X
              </button>
              <label htmlFor="updatedCategoryNameSelect">
                Kategória név/nevek:
              </label>
              <select
                className="adminBoardGameSelect"
                name="updatedCategoryNameSelect"
                id="updatedCategoryNameSelect"
                value={selectedCategoryName}
                onChange={handleSelectedCategoryNameChange}
              >
                {Object.entries(groupedCategories).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <label htmlFor="updatedCategoryName">
                Frissített Kategórianév:
              </label>
              <input
                className="adminBoardGameInput"
                type="text"
                name="updatedCategoryName"
                id="updatedCategoryName"
                value={updatedBoardGameCategoryName}
                onChange={handleUpdatedBoardGameCategoryName}
                minLength={2}
                maxLength={20}
                required
              />
              <button className="adminBoardGameButton" type="submit">
                Küldés
              </button>
            </fieldset>
          </form>
        )}
        {!addNewBoardGame && (
          <button
            className="adminBoardGameButton"
            id="addBoardGameShowForm"
            onClick={handleShowAddForm}
          >
            Társasjáték hozzáadása
          </button>
        )}
        {addNewBoardGame && (
          <form className="adminBoardGameForm" onSubmit={handleAdd}>
            <fieldset className="adminBoardGameFieldset">
              <button
                className="adminBoardGameButton"
                id="closebtn"
                onClick={cleanupAfterAdd}
              >
                X
              </button>
              <label htmlFor="addedName">Név: </label>
              <input
                className="adminBoardGameInput"
                type="text"
                name="addedName"
                id="addedName"
                value={addName}
                onChange={handleAddNameChange}
                required
              />
              <label htmlFor="addedDifficulty">Nehézség: </label>
              <select
                className="adminBoardGameSelect"
                name="addedDifficulty"
                id="addedDifficulty"
                value={addDifficulty}
                onChange={handleAddDifficultyChange}
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
              <label htmlFor="addedMinPlayerNum">Minimális Játékosszám: </label>
              <input
                className="adminBoardGameInput"
                type="number"
                name="addedMinPlayerNum"
                id="addedMinPlayerNum"
                value={addMinPlayerNum}
                onChange={handleAddMinPlayerNumChange}
                min={1}
                max={11}
                step={1}
                required
              />
              <label htmlFor="addedMaxPlayerNum">Maximális Játékosszám: </label>
              <input
                className="adminBoardGameInput"
                type="number"
                name="addedMaxPlayerNum"
                id="addedMaxPlayerNum"
                value={addMaxPlayerNum}
                onChange={handleAddMaxPlayerNumChange}
                min={2}
                max={12}
                step={1}
                required
              />
              <label htmlFor="addedLanguage">Nyelv: </label>
              <select
                className="adminBoardGameSelect"
                name="addedLanguage"
                id="addedLanguage"
                value={addLanguage}
                onChange={handleAddLanguageForDisplay}
              >
                {Object.entries(groupedLanguages).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <label htmlFor="addedDescription">Leírás: </label>
              <input
                className="adminBoardGameInput"
                type="text"
                name="addedDescription"
                id="addedDescription"
                value={addDescription}
                onChange={handleAddDescription}
                required
              />
              <label htmlFor="addedCategoryName">Kategórianév: </label>
              <select
                className="adminBoardGameSelect"
                name="addedCategoryName"
                id="addedCategoryName"
                value={addCategoryName}
                onChange={handleAddCategoryName}
              >
                {Object.entries(groupedCategories).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <button className="adminBoardGameButton" type="submit">
                Elküldés
              </button>
            </fieldset>
          </form>
        )}
        {selectedBoardGame && (
          <form className="adminBoardGameForm" onSubmit={handleUpdate}>
            <fieldset className="adminBoardGameFieldset">
              <button
                className="adminBoardGameButton"
                id="closebtn"
                onClick={cleanupAfterUpdate}
              >
                X
              </button>
              <label htmlFor="updatedName">Név: </label>
              <input
                className="adminBoardGameInput"
                type="text"
                name="updatedName"
                id="updatedName"
                value={updateName}
                onChange={handleUpdateNameChange}
                required
              />
              <label htmlFor="updatedDifficulty">Nehézség: </label>
              <select
                className="adminBoardGameSelect"
                name="updatedDifficulty"
                id="updatedDifficulty"
                value={updateDifficulty}
                onChange={handleUpdateDifficultyChange}
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
              <label htmlFor="updatedMinPlayerNum">
                Minimális Játékosszám:
              </label>
              <input
                className="adminBoardGameInput"
                type="number"
                name="updatedMinPlayerNum"
                id="updatedMinPlayerNum"
                value={updateMinPlayerNum}
                onChange={handleUpdateMinPlayerNumChange}
                min={1}
                max={11}
                step={1}
                required
              />
              <label htmlFor="updatedMaxPlayerNum">
                Maximális Játékosszám:
              </label>
              <input
                className="adminBoardGameInput"
                type="number"
                name="updatedMaxPlayerNum"
                id="updatedMaxPlayerNum"
                value={updateMaxPlayerNum}
                onChange={handleUpdateMaxPlayerNumChange}
                min={2}
                max={12}
                step={1}
                required
              />
              <label htmlFor="updatedLanguage">Nyelv: </label>
              <select
                className="adminBoardGameSelect"
                name="updatedLanguage"
                id="updatedLanguage"
                value={updateLanguage}
                onChange={handleUpdateLanguageForDisplay}
              >
                {Object.entries(groupedLanguages).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <label htmlFor="updatedDescription">Leírás: </label>
              <input
                className="adminBoardGameInput"
                type="text"
                name="updatedDescription"
                id="updatedDescription"
                value={updateDescription}
                onChange={handleUpdateDescription}
                required
              />
              <label htmlFor="updatedCategoryName">Kategórianév: </label>
              <select
                className="adminBoardGameSelect"
                name="updatedCategoryName"
                id="updatedCategoryName"
                value={updateCategoryName}
                onChange={handleUpdateCategoryName}
              >
                {Object.entries(groupedCategories).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <button className="adminBoardGameButton" type="submit">
                Elküldés
              </button>
            </fieldset>
          </form>
        )}
        <div className="boardgamesMain">
          {Object.keys(groupedBoardGames).length > 0 ? (
            Object.keys(groupedBoardGames)
              .filter(
                (categoryname) => groupedBoardGames[categoryname].length >= 0
              )
              .sort()
              .map((categoryname) => (
                <AdminBoardGameCategory
                  key={categoryname}
                  boardgames={groupedBoardGames[categoryname]}
                  handleDelete={handleDelete}
                  handleShowUpdateForm={handleShowUpdateForm}
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
export default AdminBoardGames;
