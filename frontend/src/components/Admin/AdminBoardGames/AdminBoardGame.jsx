function AdminBoardGame({ boardgame, handleDelete, handleShowUpdateForm }) {
  return (
    <div className={"drink-" + boardgame.boardgameid}>
      <h4>
        {boardgame.name +
          " -- " +
          boardgame.difficulty +
          " -- " +
          boardgame.minplayernum +
          " - " +
          boardgame.maxplayernum +
          " Fő"}
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

export default AdminBoardGame;
