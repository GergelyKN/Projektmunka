function Drink({ drink }) {
  return (
    <div className={"drink-" + drink.drinkid}>
      <h4>
        {drink.name + " - " + drink.price + " Ft - " + drink.size + " Liter "}
      </h4>
      <h5>{drink.description}</h5>
    </div>
  );
}

export default Drink;
