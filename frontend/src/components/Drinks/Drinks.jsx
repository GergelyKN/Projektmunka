import NavBar from "../Helper_Components/NavBar";
import Footer from "../Helper_Components/Footer";
import DrinkCategory from "./DrinkCategory";
import "./Drinks.css";
import { useEffect, useState } from "react";

function Drinks() {
  const GETDRINKAPI = import.meta.env.VITE_API_DRINK_URL;

  const [price, setPrice] = useState(20000);
  const [containsAlcohol, setContainsAlcohol] = useState(false);
  const [searchedDrinkName, setSearchedDrinkName] = useState("");
  const [drinks, setDrinks] = useState([]);
  const [groupedDrinks, setGroupedDrinks] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchDrinks = async () => {
      try {
        const response = await fetch(GETDRINKAPI, {
          mode: "cors",
        });

        if (response.status >= 400) {
          throw new Error("Server Error");
        }
        const data = await response.json();

        setDrinks(data);
      } catch (error) {
        console.error("Error fetching drinks: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrinks();
  }, [GETDRINKAPI]);
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

  useEffect(() => {
    if (Object.values(groupedDrinks).length > 0) {
      console.log(groupedDrinks);
      setLoading(false);
    }
  }, [groupedDrinks]);

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
    <div className="app-container">
      <NavBar />
      <div className="mainpage">
        {loading ? (
          <p className="nodrink">Betöltés...</p>
        ) : (
          <>
            <div className="drinksNavbar">
              <label htmlFor="drinksSearchForName">Ital neve:</label>
              <input
                className="drinksInput"
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
              <p>{price + " Ft"}</p>
              <label htmlFor="containsAlcohol">Italok fajtája</label>
              <input
                type="checkbox"
                name="containsAlcohol"
                id="containsAlcohol"
                onChange={handleAlcoholChange}
                checked={containsAlcohol}
              />
              {containsAlcohol ? <p>Alkoholos</p> : <p>Nem alkoholos</p>}
            </div>

            <div className="drinksMain">
              {Object.keys(groupedDrinks).length > 0 ? (
                Object.keys(groupedDrinks)
                  .filter(
                    (categoryname) => groupedDrinks[categoryname].length > 0
                  )
                  .sort()
                  .map((categoryname) => (
                    <DrinkCategory
                      key={categoryname}
                      drinks={groupedDrinks[categoryname]}
                    />
                  ))
              ) : (
                <p className="nodrink">Nem található ilyen ital!</p>
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
export default Drinks;
