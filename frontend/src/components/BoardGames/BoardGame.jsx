function BoardGame({ boardgameID, name, language }) {
  return (
    <h4 id={boardgameID}>
      {name} - {language}
    </h4>
  );
}

export default BoardGame;
