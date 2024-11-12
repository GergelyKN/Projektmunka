import AdminDrink from "./AdminDrink";

const AdminDrinkCategory = ({ drinks, handleDelete, handleShowUpdateForm }) => {
  return (
    <div className={"drinkcategory-" + drinks[0].categoryid}>
      <h2 id={"categoryname-" + drinks[0].categoryid}>
        {drinks[0].categoryname}
      </h2>
      {drinks.map((drink) => (
        <AdminDrink
          key={drink.drinkid}
          drink={drink}
          handleDelete={() => handleDelete(drink.drinkid)}
          handleShowUpdateForm={() => handleShowUpdateForm(drink.drinkid)}
        />
      ))}
    </div>
  );
};

export default AdminDrinkCategory;
