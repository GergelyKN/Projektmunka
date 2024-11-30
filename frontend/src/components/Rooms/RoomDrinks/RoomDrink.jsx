function RoomDrink({ drink, quantity, handleQuantityChange }) {
  return (
    <div className="drinkRoom">
      <h4>
        {drink.name + " - " + drink.price + " Ft - " + drink.size + " Liter "}
      </h4>
      {drink.quantity > 0 ? (
        <>
          <h5>{"Elérhető italmennyiség: " + drink.quantity + " db"}</h5>
          <label htmlFor={`drinkQuantity-${drink.drinkid}`}>Mennyiség: </label>
          <input
            className="drinkQuantity"
            type="number"
            id={`drinkQuantity-${drink.drinkid}`}
            value={quantity}
            onChange={handleQuantityChange}
            min={0}
            max={drink.quantity < 20 ? drink.quantity : 20}
            required
          />
        </>
      ) : (
        <p className="noquantity">
          Sajnáljuk, jelenleg ez az ital nem elérhető!
        </p>
      )}
    </div>
  );
}

export default RoomDrink;
