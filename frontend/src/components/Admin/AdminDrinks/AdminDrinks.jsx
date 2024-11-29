import NavBar from "../../Helper_Components/NavBar";
import Footer from "../../Helper_Components/Footer";
import AdminDrinkCategory from "./AdminDrinkCategory";
import { useEffect, useState } from "react";

function AdminDrinks() {
  const getDrinkAPI = import.meta.env.VITE_API_DRINK_URL;
  const getDrinkCategoryAPI = import.meta.env.VITE_API_DRINKCATEGORY_URL;
  const adminDrinkAPI = import.meta.env.VITE_API_ADMIN_DRINK_URL;
  const adminDrinkCategoryAPI = import.meta.env
    .VITE_API_ADMIN_ADDDRINKCATEGORY_URL;

  const [addNewCategoryName, setAddNewCategoryName] = useState("");
  const [addNewCategoryAlcoholic, setAddNewCategoryAlcoholic] = useState(false);
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
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateCategoryName, setUpdateCategoryName] = useState("");

  //#endregion Update Formhoz useState-ek
  //#region Add Drink Formhoz useState-ek
  const [addName, setAddName] = useState("");
  const [addSize, setAddSize] = useState(0.0);
  const [addPrice, setAddPrice] = useState(0);
  const [addContainsAlcohol, setAddContainsAlcohol] = useState(false);
  const [addAlcoholStrength, setAddAlcoholStrength] = useState(0.0);
  const [addDescription, setAddDescription] = useState("");
  const [addCategoryName, setAddCategoryName] = useState("");
  const [addNewDrink, setAddnewDrink] = useState(false);
  //#endregion Add Drink Formhoz useState-ek

  useEffect(() => {
    const firstCategoryValue =
      Object.entries(groupedCategories)[0]?.[1].categoryname;

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
    setUpdateDescription("");
    setUpdateCategoryName("");
  };
  const cleanupAfterAdd = () => {
    setAddName("");
    setAddSize(0.0);
    setAddPrice(0);
    setAddContainsAlcohol(false);
    setAddAlcoholStrength(0.0);
    setAddDescription("");
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
        acc[category.categoryid] = {
          categoryname: category.categoryname,
          alcoholic: category.alcoholic,
        };
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
    if (event.target.checked) {
      setUpdateCategoryName(
        Object.values(groupedCategories).filter((x) => x.alcoholic)[0]
          .categoryname
      );
    } else {
      setUpdateCategoryName(
        Object.values(groupedCategories).filter((x) => !x.alcoholic)[0]
          .categoryname
      );
    }
  };
  const handleUpdateAlcoholStengthChange = (event) => {
    setUpdateAlcoholStrength(event.target.value);
  };
  const handleUpdateDescription = (event) => {
    setUpdateDescription(event.target.value.toString());
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
    if (event.target.checked) {
      setAddCategoryName(
        Object.values(groupedCategories).filter((x) => x.alcoholic)[0]
          .categoryname
      );
    } else {
      setAddCategoryName(
        Object.values(groupedCategories).filter((x) => !x.alcoholic)[0]
          .categoryname
      );
    }
  };
  const handleAddAlcoholStengthChange = (event) => {
    setAddAlcoholStrength(event.target.value);
  };
  const handleAddDescriptionChange = (event) => {
    setAddDescription(event.target.value.toString());
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
    setUpdateDescription(drink.description);
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
      description: updateDescription,
      categoryid: Number(
        Object.entries(groupedCategories).find(
          ([key, value]) => value.categoryname === updateCategoryName
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
      description: addDescription,
      categoryid: Number(
        Object.entries(groupedCategories).find(
          ([key, value]) => value.categoryname === addCategoryName
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
    const alcoholic = addNewCategoryAlcoholic;
    try {
      const response = await fetch(adminDrinkCategoryAPI, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryname, alcoholic }),
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
    setAddNewCategoryAlcoholic(false);
    setAddNewDrinkCategory(false);
  };
  const handleShowAddCategoryForm = () => {
    setAddNewDrinkCategory(true);
  };
  const handleAddNewCategoryNameChange = (event) => {
    setAddNewCategoryName(event.target.value);
  };
  const handleAddDrinkCategoryAlcoholic = (event) => {
    setAddNewCategoryAlcoholic(event.target.checked);
  };
  //#endregion //#region Add Category
  //#region Delete Category
  const removeCategoryAPI = import.meta.env
    .VITE_API_ADMIN_REMOVEDRINKCATEGORY_URL;
  const isCategoriesLengthGreaterThanZero =
    Object.values(groupedCategories).length > 0;
  let initialCategoryValue = "";
  if (isCategoriesLengthGreaterThanZero) {
    initialCategoryValue = Object.values(groupedCategories)[0].categoryname;
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

  //#endregion Delete Category
  //#region Update Category
  const updateCategoryAPI = import.meta.env
    .VITE_API_ADMIN_UPDATEDRINKCATEGORY_URL;
  const [updateDrinkCategory, setUpdateDrinkCategory] = useState(false);
  const [updatedDrinkCategoryName, setUpdatedDrinkCategoryName] = useState("");
  const [updatedDrinkCategoryAlcoholic, setUpdateDrinkCategoryAlcoholic] =
    useState(false);

  let initialCategoryUpdateValue = "";
  if (isCategoriesLengthGreaterThanZero) {
    initialCategoryUpdateValue =
      Object.values(groupedCategories)[0].categoryname;
  }

  const [selectedUpdateCategoryName, setSelectedUpdateCategoryName] =
    useState("");

  const handleSelectedUpdateCategoryNameChange = (event) => {
    setSelectedUpdateCategoryName(event.target.value);
  };

  const handleShowUpdateCategoryForm = () => {
    setUpdateDrinkCategory(true);
    setSelectedUpdateCategoryName(initialCategoryUpdateValue);
  };
  useEffect(() => {
    if (
      Object.values(groupedCategories).length != 0 &&
      Object.values(groupedCategories) &&
      selectedUpdateCategoryName.length != 0
    ) {
      setUpdateDrinkCategoryAlcoholic(
        Object.values(groupedCategories).find(
          (x) => x.categoryname == selectedUpdateCategoryName
        ).alcoholic
      );
    }
  }, [selectedUpdateCategoryName, groupedCategories]);

  const cleanupAfterUpdateCategory = () => {
    setUpdateDrinkCategory(false);
    setSelectedUpdateCategoryName(initialCategoryUpdateValue);
    setUpdatedDrinkCategoryName("");
    setUpdateDrinkCategoryAlcoholic(false);
  };

  const handleUpdatedDrinkCategoryAlcoholic = (event) => {
    setUpdateDrinkCategoryAlcoholic(event.target.checked);
  };

  const handleUpdatedDrinkCategoryName = (event) => {
    setUpdatedDrinkCategoryName(event.target.value);
  };

  const handleUpdateCategory = async (event) => {
    event.preventDefault();

    const categoryname = selectedUpdateCategoryName;
    const updatedname = updatedDrinkCategoryName;
    const updatedalcoholic = updatedDrinkCategoryAlcoholic;
    try {
      const response = await fetch(updateCategoryAPI, {
        mode: "cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryname, updatedname, updatedalcoholic }),
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

  //#region Mennyiség növelés
  const UPDATEDRINKSTORAGEAPI = import.meta.env
    .VITE_API_UPDATEDRINKSTORAGEAPI_URL;

  const [addNewQuantity, setAddNewQuantity] = useState(false);
  const [selectedDrinkToUpdateQuantity, setSelectedDrinkToUpdateQuantity] =
    useState(null);
  const [quantityToUpdate, setQuantityToUpdate] = useState(0);
  const [quantityClicked, setQuantityClicked] = useState(false);

  const handleAddQuantityShowForm = (drinkID) => {
    const drink = drinks.find((drink) => drink.drinkid === drinkID);
    setSelectedDrinkToUpdateQuantity(drink);
    setAddNewQuantity(true);
  };
  const handleChangeQuantity = (event) => {
    setQuantityToUpdate(event.target.value);
  };

  const cleanupAfterQuantityUpdate = () => {
    setAddNewQuantity(false);
    setSelectedDrinkToUpdateQuantity(null);
    setQuantityToUpdate(0);
    setQuantityClicked(false);
  };

  const handleAddNewQuantity = async (event) => {
    setQuantityClicked(true);
    event.preventDefault();

    try {
      const response = await fetch(UPDATEDRINKSTORAGEAPI, {
        mode: "cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          drinkID: selectedDrinkToUpdateQuantity.drinkid,
          quantity: Number(quantityToUpdate),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Hibaüzenet a szerver felől: ", data.error);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    } finally {
      cleanupAfterQuantityUpdate();
    }
  };

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
            <label htmlFor="addedNewCategoryName">Kategória név: </label>
            <input
              type="text"
              name="addedNewCategoryName"
              id="addedNewCategoryName"
              value={addNewCategoryName}
              onChange={handleAddNewCategoryNameChange}
              required
            />
            <label htmlFor="addedAlcoholic"> Alkoholos? </label>
            <input
              type="checkbox"
              id="addedAlcoholic"
              name="addedAlcoholic"
              value={addNewCategoryAlcoholic}
              onChange={handleAddDrinkCategoryAlcoholic}
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
            <label htmlFor="removedCategoryName">Kategória név: </label>
            <select
              name="removedCategoryName"
              id="removedCategoryName"
              value={selectedCategoryName}
              onChange={handleSelectedCategoryNameChange}
            >
              {Object.entries(groupedCategories).map(([key, value]) => (
                <option key={key} value={value.categoryname}>
                  {value.categoryname}
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
            <label htmlFor="updatedCategoryNameSelect">Kategória név: </label>
            <select
              name="updatedCategoryNameSelect"
              id="updatedCategoryNameSelect"
              value={selectedUpdateCategoryName}
              onChange={handleSelectedUpdateCategoryNameChange}
            >
              {Object.entries(groupedCategories).map(([key, value]) => (
                <option key={key} value={value.categoryname}>
                  {value.categoryname}
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
            />
            <label htmlFor="updatedAlcoholic"> Alkoholos? </label>
            <input
              type="checkbox"
              id="updatedAlcoholic"
              name="updatedAlcoholic"
              checked={updatedDrinkCategoryAlcoholic}
              onChange={handleUpdatedDrinkCategoryAlcoholic}
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
              disabled={!addContainsAlcohol}
            />
            <label htmlFor="addedDescription">Leírás: </label>
            <input
              type="text"
              name="addedDescription"
              id="addedDescription"
              value={addDescription}
              onChange={handleAddDescriptionChange}
              required
            />
            <label htmlFor="addedCategoryName">Kategórianév: </label>
            <select
              name="addedCategoryName"
              id="addedCategoryName"
              value={addCategoryName}
              onChange={handleAddCategoryNameChange}
            >
              {Object.entries(groupedCategories)
                .filter(([key, value]) =>
                  addContainsAlcohol
                    ? value.alcoholic === true
                    : value.alcoholic === false
                )
                .map(([key, value]) => (
                  <option key={key} value={value.categoryname}>
                    {value.categoryname}
                  </option>
                ))}
            </select>
            <button type="submit">Elküldés</button>
          </fieldset>
        </form>
      )}

      {selectedDrink && (
        <form onSubmit={handleUpdate}>
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
              disabled={!updateContainsAlcohol}
            />
            <label htmlFor="updatedDescription">Leírás: </label>
            <input
              type="text"
              name="updatedDescription"
              id="updatedDescription"
              value={updateDescription}
              onChange={handleUpdateDescription}
              required
            />
            <label htmlFor="updatedCategoryName">Kategórianév: </label>
            <select
              name="updatedCategoryName"
              id="updatedCategoryName"
              value={updateCategoryName}
              onChange={handleUpdateCategoryName}
            >
              {Object.entries(groupedCategories)
                .filter(([key, value]) =>
                  updateContainsAlcohol
                    ? value.alcoholic === true
                    : value.alcoholic === false
                )
                .map(([key, value]) => (
                  <option key={key} value={value.categoryname}>
                    {value.categoryname}
                  </option>
                ))}
            </select>
            <button type="submit">Elküldés</button>
          </fieldset>
        </form>
      )}

      {addNewQuantity ? (
        <>
          <form onSubmit={handleAddNewQuantity}>
            <fieldset>
              <button id="closebtn" onClick={cleanupAfterQuantityUpdate}>
                X
              </button>
              <label htmlFor="quantityUpdate">
                {selectedDrinkToUpdateQuantity.name + ": "}
              </label>
              <input
                type="number"
                name="quantityUpdate"
                id="quantityUpdate"
                onChange={handleChangeQuantity}
                min={1}
                max={500}
              />
              {quantityClicked ? (
                <p>Raktár frissítése folyamatban...</p>
              ) : (
                <button type="submit">Elküldés</button>
              )}
            </fieldset>
          </form>
        </>
      ) : null}
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
                handleAddQuantityShowForm={handleAddQuantityShowForm}
                addNewQuantity={addNewQuantity}
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
