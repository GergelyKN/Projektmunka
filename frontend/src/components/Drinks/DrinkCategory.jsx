import Drink from "./Drink";

const DrinkCategory = ({ drinks }) => {
  return (
    <div className="drinksByCategory">
      <div className="drinkcategory">
        <h2>{drinks[0].categoryname}</h2>
      </div>
      <div className="drinknames">
        {drinks.map((drink) => (
          <Drink key={drink.drinkid} drink={drink} />
        ))}
      </div>
    </div>
  );
};

export default DrinkCategory;
