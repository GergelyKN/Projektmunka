import Drink from "./Drink";

const DrinkCategory = ({ drinks }) => {
  return (
    <div className={"drinkcategory-" + drinks[0].categoryid}>
      <h2 id={"categoryname-" + drinks[0].categoryid}>
        {drinks[0].categoryname}
      </h2>
      {drinks.map((drink) => (
        <Drink
          drinkID={"drink-" + drink.drinkid}
          key={drink.drinkid}
          name={drink.name}
        />
      ))}
    </div>
  );
};

export default DrinkCategory;
