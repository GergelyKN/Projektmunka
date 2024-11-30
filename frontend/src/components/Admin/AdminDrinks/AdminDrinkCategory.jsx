import AdminDrink from "./AdminDrink";

const AdminDrinkCategory = ({
  drinks,
  handleDelete,
  handleShowUpdateForm,
  handleAddQuantityShowForm,
}) => {
  return (
    <div className="drinksByCategory">
      <h2 className="drinkcategory">{drinks[0].categoryname}</h2>
      <div className="drinknames drinknamesadmin">
        {drinks.map((drink) => (
          <AdminDrink
            key={drink.drinkid}
            drink={drink}
            handleDelete={() => handleDelete(drink.drinkid)}
            handleShowUpdateForm={() => handleShowUpdateForm(drink.drinkid)}
            handleAddQuantityShowForm={() =>
              handleAddQuantityShowForm(drink.drinkid)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDrinkCategory;
