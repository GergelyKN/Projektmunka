function AdminDrink({
  drink,
  handleDelete,
  handleShowUpdateForm,
  handleAddQuantityShowForm,
}) {
  return (
    <div className="drink drinkAdmin">
      <h4>
        {drink.name + " - " + drink.price + " Ft - " + drink.size + " Liter "}
      </h4>
      <h5>{drink.description}</h5>
      <div className="buttons">
        <button
          className="adminDrinkButton"
          id="deleteButton"
          onClick={handleDelete}
        >
          Törlés
        </button>
        <button
          className="adminDrinkButton"
          id="updateButton"
          onClick={handleShowUpdateForm}
        >
          Módosítás
        </button>
        <button
          className="adminDrinkButton"
          id="addQuantityButton"
          onClick={handleAddQuantityShowForm}
        >
          Mennyiség Növelése
        </button>
      </div>
    </div>
  );
}

export default AdminDrink;
