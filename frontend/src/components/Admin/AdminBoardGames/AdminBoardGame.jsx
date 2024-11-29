function AdminBoardGame({ boardgame, handleDelete, handleShowUpdateForm }) {
  return (
    <div className={"boardgame-" + boardgame.boardgameid}>
      <h4>
        {boardgame.name +
          " -- " +
          boardgame.difficulty +
          " -- " +
          boardgame.language +
          " -- " +
          boardgame.minplayernum +
          " - " +
          boardgame.maxplayernum +
          " Fő"}
      </h4>
      <h5>{boardgame.description}</h5>
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
