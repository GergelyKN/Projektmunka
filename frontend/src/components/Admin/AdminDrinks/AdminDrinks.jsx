import NavBar from "../../Helper_Components/NavBar";
import Footer from "../../Helper_Components/Footer";
import AdminDrinkCategory from "./AdminDrinkCategory";
import { useEffect, useState } from "react";

//Input mezők ellenőrzése kell

function AdminDrinks() {
  const getDrinkAPI = import.meta.env.VITE_API_DRINK_URL;
  const getDrinkCategoryAPI = import.meta.env.VITE_API_DRINKCATEGORY_URL;
  const adminDrinkAPI = import.meta.env.VITE_API_ADMIN_DRINK_URL;
  const adminDrinkCategoryAPI = import.meta.env
    .VITE_API_ADMIN_ADDDRINKCATEGORY_URL;

  const [addNewCategoryName, setAddNewCategoryName] = useState("");
  const [addNewDrinkCategory, setAddNewDrinkCategory] = useState(false);

  //#region Megjelenítéshez useState-ek
  const [price, setPrice] = useState(20000);
  const [containsAlcohol, setContainsAlcohol] = useState(false);
  const [searchedDrinkName, setSearchedDrinkName] = useState("");
  const [drinks, setDrinks] = useState([]);
  const [groupedDrinks, setGroupedDrinks] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [groupedCategories, setGroupedCategories] = useState([]);
  //#endregion Megjelenítéshez useState-ek
  //#region Update Formhoz useState-ek

  const [updateName, setUpdateName] = useState("");
  const [updateSize, setUpdateSize] = useState(0.0);
  const [updatePrice, setUpdatePrice] = useState(0);
  const [updateContainsAlcohol, setUpdateContainsAlcohol] = useState(false);
  const [updateAlcoholStrength, setUpdateAlcoholStrength] = useState(0.0);
  const [updateImagePath, setUpdateImagePath] = useState(""); //Megnézni hogyan lehet fájlfeltöltéssel megoldani
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  //#endregion Update Formhoz useState-ek
  //#region Add Drink Formhoz useState-ek
  const [addName, setAddName] = useState("");
  const [addSize, setAddSize] = useState(0.0);
  const [addPrice, setAddPrice] = useState(0);
  const [addContainsAlcohol, setAddContainsAlcohol] = useState(false);
  const [addAlcoholStrength, setAddAlcoholStrength] = useState(0.0);
  const [addImagePath, setAddImagePath] = useState("");
  const [addCategoryName, setAddCategoryName] = useState("");
  const [addNewDrink, setAddnewDrink] = useState(false);
  //#endregion Add Drink Formhoz useState-ek

  useEffect(() => {
    const firstCategoryValue = Object.entries(groupedCategories)[0]?.[1];
    if (firstCategoryValue) {
      setAddCategoryName(firstCategoryValue);
      setUpdateCategoryName(firstCategoryValue);
    }
  }, [groupedCategories]);

  const cleanupAfterUpdate = () => {
    setSelectedDrink(null);
    setUpdateName("");
    setUpdateSize(0.0);
    setUpdatePrice(0);
    setUpdateContainsAlcohol(false);
    setUpdateAlcoholStrength(0.0);
    setUpdateImagePath("");
    setUpdateCategoryName("");
  };
  const cleanupAfterAdd = () => {
    setAddName("");
    setAddSize(0.0);
    setAddPrice(0);
    setAddContainsAlcohol(false);
    setAddAlcoholStrength(0.0);
    setAddImagePath("");
    setAddCategoryName("Üditők");
    setAddnewDrink(false);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(getDrinkCategoryAPI, {
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
      console.error("Hiba történt az italok lekérdezése közben: ", err);
    }
  };

  const fetchDrinks = async () => {
    try {
      const response = await fetch(getDrinkAPI, {
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

      const groupedData = data.reduce((acc, drink) => {
        if (!acc[drink.categoryname]) {
          acc[drink.categoryname] = [];
        }
        acc[drink.categoryname].push(drink);
        return acc;
      }, {});
      Object.keys(groupedData).forEach((category) => {
        groupedData[category].sort((a, b) => a.name.localeCompare(b.name));
      });
      setDrinks(data);
      setGroupedDrinks(groupedData);
    } catch (error) {
      console.error("Hiba történt az italok lekérdezése közben: ", error);
    }
  };

  useEffect(() => {
    fetchDrinks();
    fetchCategories();
  }, []);

  useEffect(() => {
    const filteredDrinks = drinks.reduce((acc, drink) => {
      if (
        drink.containsalcohol === containsAlcohol &&
        drink.price <= price &&
        (searchedDrinkName === "" ||
          drink.name.toUpperCase().includes(searchedDrinkName.toUpperCase()))
      ) {
        if (!acc[drink.categoryname]) {
          acc[drink.categoryname] = [];
        }
        acc[drink.categoryname].push(drink);
      }
      return acc;
    }, {});
    Object.keys(filteredDrinks).forEach((category) => {
      filteredDrinks[category].sort((a, b) => a.name.localeCompare(b.name));
    });
    setGroupedDrinks(filteredDrinks);
  }, [price, containsAlcohol, searchedDrinkName, drinks]);

  //#region Szűréshez használt input függvények
  const handlePriceChange = (event) => {
    setPrice(Number(event.target.value));
  };

  const handleAlcoholChange = (event) => {
    setContainsAlcohol(event.target.checked);
  };

  const handleSearchForDrinkName = (event) => {
    setSearchedDrinkName(event.target.value);
  };
  //#endregion Szűréshez használt input függvények

  //#region Update form input kezelés
  const handleUpdateNameChange = (event) => {
    setUpdateName(event.target.value.toString());
  };

  const handleUpdateSizeChange = (event) => {
    setUpdateSize(event.target.value);
  };

  const handleUpdatePriceChange = (event) => {
    setUpdatePrice(event.target.value);
  };
  const handleUpdateContainsAlcoholChange = (event) => {
    setUpdateContainsAlcohol(event.target.checked);
  };
  const handleUpdateAlcoholStengthChange = (event) => {
    setUpdateAlcoholStrength(event.target.value);
  };
  const handleUpdateImagePath = (event) => {
    setUpdateImagePath(event.target.value.toString());
  };
  const handleUpdateCategoryName = (event) => {
    setUpdateCategoryName(event.target.value.toString());
  };
  //#endregion Update form input kezelés

  //#region Add form input kezelés
  const handleAddNameChange = (event) => {
    setAddName(event.target.value.toString());
  };
  const handleAddSizeChange = (event) => {
    setAddSize(event.target.value);
  };
  const handleAddPriceChange = (event) => {
    setAddPrice(event.target.value);
  };
  const handleAddContainsAlcoholChange = (event) => {
    setAddContainsAlcohol(event.target.checked);
  };
  const handleAddAlcoholStengthChange = (event) => {
    setAddAlcoholStrength(event.target.value);
  };
  const handleAddImagePathChange = (event) => {
    setAddImagePath(event.target.value.toString());
  };
  const handleAddCategoryNameChange = (event) => {
    setAddCategoryName(event.target.value.toString());
  };
  //#endregion Add form input kezelés

  const handleDelete = async (drinkID) => {
    try {
      const response = await fetch(adminDrinkAPI, {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ drinkID }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Hibaüzenet a szerver felől:", data.error);
      } else {
        alert(data.message);
        setDrinks(drinks.filter((drink) => drink.drinkid !== drinkID));
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    }
  };

  const handleShowAddForm = () => {
    setAddnewDrink(true);
  };

  const handleShowUpdateForm = (drinkID) => {
    const drink = drinks.find((drink) => drink.drinkid === drinkID);
    setSelectedDrink(drink);
    setUpdateName(drink.name);
    setUpdateSize(drink.size);
    setUpdatePrice(drink.price);
    setUpdateContainsAlcohol(drink.containsalcohol);
    setUpdateAlcoholStrength(drink.alcoholstrength);
    setUpdateImagePath(drink.imagepath);
    setUpdateCategoryName(drink.categoryname);
  };
  const handleUpdate = async (event) => {
    const drink = {
      drinkid: Number(selectedDrink.drinkid),
      name: updateName,
      size: parseFloat(updateSize),
      price: Number(updatePrice),
      containsalcohol: updateContainsAlcohol,
      alcoholstrength: parseFloat(updateAlcoholStrength),
      imagepath: updateImagePath,
      categoryid: Number(
        Object.entries(groupedCategories).find(
          ([key, value]) => value === updateCategoryName
        )[0]
      ),
    };

    event.preventDefault();
    try {
      const response = await fetch(adminDrinkAPI, {
        mode: "cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ drink }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Hibaüzenet a szerver felől: ", data.error);
      } else {
        alert(data.message);
        await fetchDrinks();
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    } finally {
      cleanupAfterUpdate();
    }
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    const drink = {
      name: addName,
      size: parseFloat(addSize),
      price: Number(addPrice),
      containsalcohol: addContainsAlcohol,
      alcoholstrength: parseFloat(addAlcoholStrength),
      imagepath: addImagePath,
      categoryid: Number(
        Object.entries(groupedCategories).find(
          ([key, value]) => value === addCategoryName
        )[0]
      ),
    };

    try {
      const response = await fetch(adminDrinkAPI, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ drink }),
      });
      const data = await response.json();

      if (!response.ok) {
        console.error("Hibaüzenet a szerver felől: ", data.error);
      } else {
        alert(data.message);
        await fetchDrinks();
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
      const response = await fetch(adminDrinkCategoryAPI, {
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
        await Promise.all([fetchDrinks(), fetchCategories()]);
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    } finally {
      cleanupAfterAddCategory();
    }
  };

  const cleanupAfterAddCategory = () => {
    setAddNewCategoryName("");
    setAddNewDrinkCategory(false);
  };
  const handleShowAddCategoryForm = () => {
    setAddNewDrinkCategory(true);
  };
  const handleAddNewCategoryNameChange = (event) => {
    setAddNewCategoryName(event.target.value);
  };
  //#endregion //#region Add Category
  //#region Delete Category
  const removeCategoryAPI = import.meta.env
    .VITE_API_ADMIN_REMOVEDRINKCATEGORY_URL;
  const isCategoriesLengthGreaterThanZero =
    Object.values(groupedCategories).length > 0;
  let initialCategoryValue = "";
  if (isCategoriesLengthGreaterThanZero) {
    initialCategoryValue = Object.values(groupedCategories)[0];
  }

  const [selectedCategoryName, setSelectedCategoryName] =
    useState(initialCategoryValue);
  const [deleteDrinkCategory, setDeleteDrinkCategory] = useState(false);

  useEffect(() => {
    if (isCategoriesLengthGreaterThanZero) {
      setSelectedCategoryName(initialCategoryValue);
    }
  }, [
    groupedCategories,
    initialCategoryValue,
    isCategoriesLengthGreaterThanZero,
  ]);

  const handleShowRemoveCategoryForm = () => {
    setDeleteDrinkCategory(true);
  };
  const handleRemoveCategory = async (event) => {
    event.preventDefault();
    const categoryname = selectedCategoryName;

    try {
      const response = await fetch(removeCategoryAPI, {
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
    }
  };
  const cleanupAfterRemoveCategory = () => {
    setDeleteDrinkCategory(false);
    setSelectedCategoryName(initialCategoryValue);
  };
  const handleSelectedCategoryNameChange = (event) => {
    setSelectedCategoryName(event.target.value);
  };
  //Refaktorálni, logikailag átnézni
  //#endregion Delete Category
  //#region Update Category
  const updateCategoryAPI = import.meta.env
    .VITE_API_ADMIN_UPDATEDRINKCATEGORY_URL;
  const [updateDrinkCategory, setUpdateDrinkCategory] = useState(false);
  const [updatedDrinkCategoryName, setUpdatedDrinkCategoryName] = useState("");
  const handleShowUpdateCategoryForm = () => {
    setUpdateDrinkCategory(true);
  };
  const cleanupAfterUpdateCategory = () => {
    setUpdateDrinkCategory(false);
    setSelectedCategoryName(initialCategoryValue);
    setUpdatedDrinkCategoryName("");
  };

  const handleUpdatedDrinkCategoryName = (event) => {
    setUpdatedDrinkCategoryName(event.target.value);
  };

  const handleUpdateCategory = async (event) => {
    event.preventDefault();
    const categoryname = selectedCategoryName;
    const updatedname = updatedDrinkCategoryName;
    try {
      const response = await fetch(updateCategoryAPI, {
        mode: "cors",
        method: "DELETE",
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
      await Promise.all([fetchDrinks(), fetchCategories()]);
    }
  };

  //#endregion Update Category
  return (
    <>
      <NavBar />
      <div className="drinksNavbar">
        <label htmlFor="drinksSearchForName">Ital neve: </label>
        <input
          type="text"
          id="drinksSearchForName"
          name="drinksSearchForName"
          placeholder="Pilsner Urquell"
          value={searchedDrinkName}
          onChange={handleSearchForDrinkName}
        />
        <label htmlFor="drinksPrice">Maximális ár</label>
        <input
          type="range"
          name="drinksPrice"
          id="drinksPrice"
          min="200"
          max="20000"
          value={price}
          step={100}
          onChange={handlePriceChange}
        />
        <p>{price}</p>
        <label htmlFor="containsAlcohol">Italok fajtája</label>
        <input
          type="checkbox"
          name="containsAlcohol"
          id="containsAlcohol"
          onChange={handleAlcoholChange}
        />
        {containsAlcohol ? "Alkoholos" : "Nem alkoholos"}
      </div>
      {!addNewDrinkCategory && (
        <button
          id="addDrinkCategoryShowForm"
          onClick={handleShowAddCategoryForm}
        >
          Ital Kategória hozzáadása
        </button>
      )}
      {addNewDrinkCategory && (
        <form onSubmit={handleAddCategory}>
          <fieldset>
            <button id="closebtn" onClick={cleanupAfterAddCategory}>
              X
            </button>
            <label htmlFor="addedNewCategoryName">Kategória név:</label>
            <input
              type="text"
              name="addedNewCategoryName"
              id="addedNewCategoryName"
              value={addNewCategoryName}
              onChange={handleAddNewCategoryNameChange}
              required
            />
            <button type="submit">Küldés</button>
          </fieldset>
        </form>
      )}
      {!deleteDrinkCategory && (
        <button
          id="removeDrinkCategoryShowForm"
          onClick={handleShowRemoveCategoryForm}
        >
          Ital Kategória törlése
        </button>
      )}
      {deleteDrinkCategory && (
        <form onSubmit={handleRemoveCategory}>
          <fieldset>
            <button id="closebtn" onClick={cleanupAfterRemoveCategory}>
              X
            </button>
            <label htmlFor="removedCategoryName">Kategória név/nevek: </label>
            <select
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
            <button type="submit">Küldés</button>
          </fieldset>
        </form>
      )}
      {!updateDrinkCategory && (
        <button
          id="updateDrinkCategoryShowForm"
          onClick={handleShowUpdateCategoryForm}
        >
          Ital Kategória módosítása
        </button>
      )}
      {updateDrinkCategory && (
        <form onSubmit={handleUpdateCategory}>
          <fieldset>
            <button id="closebtn" onClick={cleanupAfterUpdateCategory}>
              X
            </button>
            <label htmlFor="updatedCategoryNameSelect">
              Kategória név/nevek:{" "}
            </label>
            <select
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
              type="text"
              name="updatedCategoryName"
              id="updatedCategoryName"
              value={updatedDrinkCategoryName}
              onChange={handleUpdatedDrinkCategoryName}
              minLength={2}
              maxLength={20}
              required
            />
            <button type="submit">Küldés</button>
          </fieldset>
        </form>
      )}
      {!addNewDrink && (
        <button id="addDrinkShowForm" onClick={handleShowAddForm}>
          Ital hozzáadása
        </button>
      )}
      {addNewDrink && (
        <form onSubmit={handleAdd}>
          <fieldset>
            <button id="closebtn" onClick={cleanupAfterAdd}>
              X
            </button>
            <label htmlFor="addedName">Név: </label>
            <input
              type="text"
              name="addedName"
              id="addedName"
              value={addName}
              onChange={handleAddNameChange}
              required
            />
            <label htmlFor="addedSize">Kiszerelés: </label>
            <input
              type="number"
              name="addedSize"
              id="addedSize"
              value={addSize}
              onChange={handleAddSizeChange}
              required
            />
            <label htmlFor="addedPrice">Ár: </label>
            <input
              type="number"
              name="addedPrice"
              id="addedPrice"
              value={addPrice}
              onChange={handleAddPriceChange}
              required
            />
            <label htmlFor="addedContainsAlcohol">Alkoholos-e? </label>
            <input
              type="checkbox"
              name="addedContainsAlcohol"
              id="addedContainsAlcohol"
              checked={addContainsAlcohol}
              onChange={handleAddContainsAlcoholChange}
            />
            <label htmlFor="addedAlcoholStrength">Alkoholtartalom: </label>
            <input
              type="number"
              name="addedAlcoholStrength"
              id="addedAlcoholStrength"
              value={addAlcoholStrength}
              onChange={handleAddAlcoholStengthChange}
              required
              min={0.0}
              max={90}
              step={0.01}
            />
            <label htmlFor="addedImagePath">Elérés: </label>
            <input
              type="text"
              name="addedImagePath"
              id="addedImagePath"
              value={addImagePath}
              onChange={handleAddImagePathChange}
              required
            />
            <label htmlFor="addedCategoryName">Kategórianév: </label>
            <select
              name="addedCategoryName"
              id="addedCategoryName"
              value={addCategoryName}
              onChange={handleAddCategoryNameChange}
            >
              {Object.entries(groupedCategories).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <button type="submit">Elküldés</button>
          </fieldset>
        </form>
      )}

      {selectedDrink && (
        <form onSubmit={handleUpdate} method="PUT">
          <fieldset>
            <button id="closebtn" onClick={cleanupAfterUpdate}>
              X
            </button>
            <label htmlFor="updatedName">Név:</label>
            <input
              type="text"
              name="updatedName"
              id="updatedName"
              value={updateName}
              onChange={handleUpdateNameChange}
              required
            />
            <label htmlFor="updatedSize">Kiszerelés: </label>
            <input
              type="number"
              name="updatedSize"
              id="updatedSize"
              value={updateSize}
              onChange={handleUpdateSizeChange}
              required
              min={0.0}
              max={5}
              step={0.1}
            />
            <label htmlFor="updatedPrice">Ár: </label>
            <input
              type="number"
              name="updatedPrice"
              id="updatedPrice"
              value={updatePrice}
              onChange={handleUpdatePriceChange}
              required
              min={0}
              max={50000}
            />
            <label htmlFor="updatedContainsAlcohol">Alkoholos-e?</label>
            <input
              type="checkbox"
              name="updatedContainsAlcohol"
              id="updatedContainsAlcohol"
              checked={updateContainsAlcohol}
              onChange={handleUpdateContainsAlcoholChange}
            />
            <label htmlFor="updatedAlcoholStrength">Alkoholtartalom: </label>
            <input
              type="number"
              name="updatedAlcoholStrength"
              id="updatedAlcoholStrength"
              value={updateAlcoholStrength}
              onChange={handleUpdateAlcoholStengthChange}
              required
              min={0.0}
              max={90}
              step={0.1}
            />
            <label htmlFor="updatedImagePath">Elérés: </label>
            <input
              type="text"
              name="updatedImagePath"
              id="updatedImagePath"
              value={updateImagePath}
              onChange={handleUpdateImagePath}
              required
            />
            <label htmlFor="updatedCategoryName">Kategórianév: </label>
            <select
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
            <button type="submit">Elküldés</button>
          </fieldset>
        </form>
      )}
      <div className="drinks">
        {Object.keys(groupedDrinks).length >= 0 ? (
          Object.keys(groupedDrinks)
            .filter((categoryname) => groupedDrinks[categoryname].length >= 0)
            .sort()
            .map((categoryname) => (
              <AdminDrinkCategory
                key={categoryname}
                drinks={groupedDrinks[categoryname]}
                handleDelete={handleDelete}
                handleShowUpdateForm={handleShowUpdateForm}
              />
            ))
        ) : (
          <p>Nincs ilyen ital</p>
        )}
      </div>

      <Footer />
    </>
  );
}

export default AdminDrinks;
//Szétszedni több komponensre, hogy átláthatóbb legyen a kód
