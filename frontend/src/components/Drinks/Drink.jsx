function Drink({ drink }) {
  return (
    <div className={"drink-" + drink.drinkid}>
      <h4>
        {drink.name + " - " + drink.price + " Ft - " + drink.size + " Liter "}
      </h4>
    </div>
  );
}

export default Drink;
