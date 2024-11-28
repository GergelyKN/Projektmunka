import RoomDrink from "./RoomDrink";

const RoomDrinkCategory = ({ drinks, handleQuantityChange, quantities }) => {
  return (
    <div className={"drinkcategory-" + drinks[0].categoryid}>
      <h2 id={"categoryname-" + drinks[0].categoryid}>
        {drinks[0].categoryname}
      </h2>
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
  );
};

export default RoomDrinkCategory;
