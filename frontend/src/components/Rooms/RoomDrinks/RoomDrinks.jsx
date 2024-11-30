import RoomNavBar from "../RoomNavBar";
import Footer from "../../Helper_Components/Footer";
import { useEffect, useState } from "react";
import RoomDrinkCategory from "./RoomDrinkCategory";

import "./RoomDrinks.css";

function RoomDrinks() {
  const GETDRINKAPIWITHQUANTITY = import.meta.env
    .VITE_API_DRINKWITHQUANTITY_URL;
  const [price, setPrice] = useState(20000);
  const [containsAlcohol, setContainsAlcohol] = useState(false);
  const [searchedDrinkName, setSearchedDrinkName] = useState("");
  const [drinks, setDrinks] = useState([]);
  const [groupedDrinks, setGroupedDrinks] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [quantititesToSend, setQuantitiesToSend] = useState(() => {
    return JSON.parse(localStorage.getItem("quantitiesToSend")) || {};
  });

  //#region Ital szűréshez
  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch(GETDRINKAPIWITHQUANTITY, {
          mode: "cors",
        });

        if (response.status >= 400) {
          throw new Error("Server Error");
        }
        const data = await response.json();

        const groupedData = data.reduce((acc, drink) => {
          if (!acc[drink.categoryname]) {
            acc[drink.categoryname] = [];
          }
          acc[drink.categoryname].push(drink);
          return acc;
        }, {});

        setDrinks(data);
        setGroupedDrinks(groupedData);
      } catch (error) {
        console.error("Error fetching drinks: ", error);
      }
    };

    fetchDrinks();
  }, [GETDRINKAPIWITHQUANTITY]);

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

    setGroupedDrinks(filteredDrinks);
  }, [price, containsAlcohol, searchedDrinkName, drinks]);

  const handlePriceChange = (event) => {
    setPrice(Number(event.target.value));
  };

  const handleAlcoholChange = (event) => {
    setContainsAlcohol(event.target.checked);
  };

  const handleSearchForDrinkName = (event) => {
    setSearchedDrinkName(event.target.value);
  };
  //#endregion

  const handleQuantityChange = (drinkid, newQuantity) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [drinkid]: Number(newQuantity),
      };
      return updatedQuantities;
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setQuantitiesToSend((prevQuantitiesToSend) => {
      const updatedQuantities = { ...prevQuantitiesToSend };

      Object.entries(quantities).forEach(([key, value]) => {
        value === 0
          ? delete updatedQuantities[key]
          : (updatedQuantities[key] =
              (updatedQuantities[key] || 0) + Number(value));
      });

      return updatedQuantities;
    });
    setQuantities({});
    alert("Sikeres kosárhoz adás!");
  };

  useEffect(() => {
    localStorage.setItem("quantitiesToSend", JSON.stringify(quantititesToSend));
  }, [quantititesToSend]);

  return (
    <div className="app-container">
      <RoomNavBar />
      <div className="mainpage">
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
          <p>{price} Ft</p>
          <label htmlFor="containsAlcohol">Italok fajtája</label>
          <input
            type="checkbox"
            name="containsAlcohol"
            id="containsAlcohol"
            onChange={handleAlcoholChange}
            checked={containsAlcohol}
          />
          {containsAlcohol ? "Alkoholos" : "Nem alkoholos"}
          <button className="sendOrderButton" onClick={handleAdd}>
            Küldés
          </button>
        </div>

        <div className="drinksMain">
          {Object.keys(groupedDrinks).length > 0 ? (
            Object.keys(groupedDrinks)
              .filter((categoryname) => groupedDrinks[categoryname].length > 0)
              .sort()
              .map((categoryname) => (
                <RoomDrinkCategory
                  key={categoryname}
                  drinks={groupedDrinks[categoryname]}
                  handleQuantityChange={handleQuantityChange}
                  quantities={quantities}
                />
              ))
          ) : (
            <p className="nodrink">Nem található ilyen ital!</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RoomDrinks;
