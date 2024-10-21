import BoardGame from "./BoardGame";

function BoardGameCategory({ boardgames }) {
  return (
    <div className={boardgames[0].category}>
      <h2 id="boardGameCategory">{boardgames[0].category}</h2>
      {boardgames.map((boardgame) => (
        <BoardGame
          id={"boardgame" + boardgame.id}
          key={boardgame.id}
          name={boardgame.name}
          language={boardgame.language}
        />
      ))}
    </div>
  );
}

export default BoardGameCategory;
