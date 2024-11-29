function AdminDrink({
  drink,
  handleDelete,
  handleShowUpdateForm,
  handleAddQuantityShowForm,
}) {
  return (
    <div className={"drink-" + drink.drinkid}>
      <h4>
        {drink.name + " - " + drink.price + " Ft - " + drink.size + " Liter "}
      </h4>
      <h5>{drink.description}</h5>
      <button id="deleteButton" onClick={handleDelete}>
        Törlés
      </button>
      <button id="updateButton" onClick={handleShowUpdateForm}>
        Módosítás
      </button>
      <button id="addQuantityButton" onClick={handleAddQuantityShowForm}>
        Mennyiség Növelése
      </button>
    </div>
  );
}

export default AdminDrink;
