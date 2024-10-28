import Drink from "./Drink";

const DrinkCategory = ({ drinks }) => {
  return (
    <div className={drinks[0].category}>
      <h2 id="drinkcategory">{drinks[0].category}</h2>
      {drinks.map((drink) => (
        <Drink drinkid={"drink" + drink.id} key={drink.id} name={drink.name} />
      ))}
    </div>
  );
};

export default DrinkCategory;
