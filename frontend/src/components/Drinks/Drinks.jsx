import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import DrinkCategory from "./DrinkCategory";
import { useEffect, useState } from "react";

function Drinks() {
  const [price, setPrice] = useState(20000);
  const [containsAlcohol, setContainsAlcohol] = useState(false);
  const [searchedDrinkName, setSearchedDrinkName] = useState("");
  const [drinks, setDrinks] = useState([]);
  const [groupedDrinks, setGroupedDrinks] = useState([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/drinks", {
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
          checked={containsAlcohol}
        />
        {containsAlcohol ? "Alkoholos" : "Nem alkoholos"}
      </div>

      <div className="drinks">
        {Object.keys(groupedDrinks).length > 0 ? (
          Object.keys(groupedDrinks)
            .filter((categoryname) => groupedDrinks[categoryname].length > 0)
            .sort()
            .map((categoryname) => (
              <DrinkCategory
                key={categoryname}
                drinks={groupedDrinks[categoryname]}
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
export default Drinks;
