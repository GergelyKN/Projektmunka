function RoomDrink({ drink, quantity, handleQuantityChange }) {
  return (
    <div className={"drink-" + drink.drinkid}>
      <h4>
        {drink.name + " - " + drink.price + " Ft - " + drink.size + " Liter "}
      </h4>
      <label htmlFor={`drinkQuantity-${drink.drinkid}`}>Mennyiség: </label>
      <input
        type="number"
        id={`drinkQuantity-${drink.drinkid}`}
        value={quantity}
        onChange={handleQuantityChange}
        min={0}
        max={12}
        required
      />
    </div>
  );
}

export default RoomDrink;
