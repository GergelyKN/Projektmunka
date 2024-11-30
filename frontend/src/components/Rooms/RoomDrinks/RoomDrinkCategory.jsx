import RoomDrink from "./RoomDrink";

const RoomDrinkCategory = ({ drinks, handleQuantityChange, quantities }) => {
  return (
    <div className="drinksByCategory">
      <h2 id="drinkcategory">{drinks[0].categoryname}</h2>
      <div className="drinknamesRoom">
        {drinks.map((drink) => (
          <RoomDrink
            key={drink.drinkid}
            drink={drink}
            handleQuantityChange={(event) =>
              handleQuantityChange(drink.drinkid, event.target.value)
            }
            quantity={quantities[drink.drinkid] || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomDrinkCategory;
