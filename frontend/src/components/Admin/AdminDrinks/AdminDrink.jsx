function AdminDrink({ drink, handleDelete, handleShowUpdateForm }) {
  return (
    <div className={"drink-" + drink.drinkid}>
      <h4>
        {drink.name + " - " + drink.price + " Ft - " + drink.size + " Liter "}
      </h4>
      <button id="deleteButton" onClick={handleDelete}>
        Törlés
      </button>
      <button id="updateButton" onClick={handleShowUpdateForm}>
        Módosítás
      </button>
    </div>
  );
}

export default AdminDrink;
