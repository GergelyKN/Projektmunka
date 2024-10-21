import NavBar from "./NavBar";
import Footer from "./Footer";
import DrinkCategory from "./DrinkCategory";
import { useState } from "react";

function Drinks() {
  const [price, setPrice] = useState(2500);
  const [containsAlcohol, setContainsAlcohol] = useState(false);
  const [searchedDrinkName, setSearchedDrinkName] = useState("");

  //dummy adat, később adatbázisból kérjük le
  const drinks = [
    { id: 1, name: "Pilsner", category: "sor" },
    { id: 2, name: "Cola", category: "udito" },
    { id: 5, name: "Valami", category: "uj" },
    { id: 3, name: "Ice Tea", category: "udito" },
    { id: 4, name: "Pálinka", category: "rovidital" },
    { id: 9, name: "fdsfsdsd", category: "alkohol" },
  ];

  //Kategórianév alapján csoportosítás
  const groupedDrinks = drinks.reduce((acc, drink) => {
    if (!acc[drink.category]) {
      acc[drink.category] = [];
    }
    acc[drink.category].push(drink);
    return acc;
  }, {});

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
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
          min="600"
          max="20000"
          value={price}
          step={100}
          onChange={handlePriceChange}
        />
        <p>{price}</p>
        <label htmlFor="containsAlcohol">Alkoholos Italok</label>
        <input
          type="checkbox"
          name="containsAlcohol"
          id="containsAlcohol"
          onChange={handleAlcoholChange}
        />
        {containsAlcohol ? "Alkoholos" : "Nem alkoholos"}
      </div>

      <div className="drinks">
        {Object.keys(groupedDrinks)
          .sort()
          .map((category) => (
            <DrinkCategory key={category} drinks={groupedDrinks[category]} />
          ))}
      </div>

      <Footer />
    </>
  );
}
export default Drinks;
