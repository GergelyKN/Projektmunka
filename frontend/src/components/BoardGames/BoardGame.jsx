function BoardGame({ boardgame }) {
  return (
    <div className="boardgame">
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
    </div>
  );
}

export default BoardGame;
