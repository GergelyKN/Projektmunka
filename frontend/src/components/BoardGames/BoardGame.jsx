function BoardGame({ boardgame }) {
  return (
    <div className={"boardgame-" + boardgame.boardgameid}>
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
    </div>
  );
}

export default BoardGame;
