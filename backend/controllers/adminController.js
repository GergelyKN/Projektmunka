const db = require("../model/adminQueries/adminQuery");

//Többi Controllerben is átírni hibakezelésesre ez a minta alapján
async function deleteDrink(req, res) {
  const { drinkID } = req.body;
  if (!drinkID) {
    return res
      .status(400)
      .json({ error: "Nem érkezett drinkID a kliens felől!" });
  }
  try {
    const { success } = await db.deleteDrink(drinkID);
    if (!success) {
      return res.status(404).json({ error: "Nem található az ital!" });
    }
    return res.status(200).json({ message: "Sikeres törlés!" });
  } catch (err) {
    console.error("Sikertelen törlés: ", err);
    return res.status(500).json({ error: "Hiba történt az ital törlésekor" });
  }
}
async function updateDrink(req, res) {
  const { drink } = req.body;

  if (!drink) {
    return res.status(400).json({ error: "Nem érkezett adat a kliens felől!" });
  }
  try {
    const { success } = await db.updateDrink(drink);
    if (!success) {
      return res.status(404).json({ error: "Nem található az ital!" });
    } else {
      return res.status(200).json({ message: "Sikeres frissítés!" });
    }
  } catch (err) {
    console.error("Sikertelen frissítés: ", err);
    return res
      .status(500)
      .json({ error: "Hiba történt az ital frissítésekor!" });
  }
}
async function addDrink(req, res) {
  const { drink } = req.body;
  if (!drink) {
    return res.status(400).json({ error: "Nem érkezett adat a kliens felől!" });
  }
  try {
    const { success } = await db.addDrink(drink);

    if (success) {
      return res
        .status(200)
        .json({ message: "Ital sikeresen hozzáadva a táblához!" });
    } else {
      return res
        .status(500)
        .json({ error: "Hiba történt az ital hozzáadásakor!" });
    }
  } catch (err) {
    console.error("Sikertelen hozzáadás: ", err);
    return res
      .status(500)
      .json({ error: "Hiba történt az ital hozzáadásakor!" });
  }
}
async function addDrinkCategory(req, res) {
  const { categoryname } = req.body;
  if (!categoryname) {
    return res.status(400).json({ error: "Nem érkezett adat a kliens felől!" });
  }
  try {
    const { success } = await db.addDrinkCategory(categoryname);

    if (success) {
      return res
        .status(200)
        .json({ message: "Kategória sikeresen hozzáadva a táblához!" });
    } else {
      return res
        .status(500)
        .json({ error: "Hiba történt a kategória hozzáadásakor!" });
    }
  } catch (err) {
    console.error("Sikertelen hozzáadás: ", err);
    return res
      .status(500)
      .json({ error: "Hiba történt a kategória hozzáadásakor!" });
  }
}
async function removeDrinkCategory(req, res) {
  const { categoryname } = req.body;
  if (!categoryname) {
    return res.status(400).json({ error: "Nem érkezett adat a kliens felől!" });
  }
  try {
    const { success } = await db.deleteDrinkCategory(categoryname);
    if (!success) {
      return res.status(404).json({ error: "Nem található a kategórianév!" });
    }
    return res.status(200).json({ message: "Sikeres törlés!" });
  } catch (err) {
    console.error("Sikertelen törlés: ", err);
    return res
      .status(500)
      .json({ error: "Hiba történt a kategória törlésekor" });
  }
}
async function updateDrinkCategory(req, res) {
  const { categoryname, updatedname } = req.body;
  if (!categoryname || !updatedname) {
    return res.status(400).json({ error: "Nem érkezett adat a kliens felől!" });
  }
  try {
    const { success } = await db.updateDrinkCategory(categoryname, updatedname);
    if (!success) {
      return res.status(404).json({ error: "Nem található a kategórianév!" });
    } else {
      return res.status(200).json({ message: "Sikeres frissítés!" });
    }
  } catch (err) {
    console.error("Sikertelen frissítés: ", err);
    return res
      .status(500)
      .json({ error: "Hiba történt a kategória frissítésekor!" });
  }
}

async function addBoardGameCategory(req, res) {
  const { categoryname } = req.body;
  if (!categoryname) {
    return res.status(400).json({ error: "Nem érkezett adat a kliens felől!" });
  }
  try {
    const { success } = await db.addBoardGameCategory(categoryname);

    if (success) {
      return res
        .status(200)
        .json({ message: "Kategória sikeresen hozzáadva a táblához!" });
    } else {
      return res
        .status(500)
        .json({ error: "Hiba történt a kategória hozzáadásakor!" });
    }
  } catch (err) {
    console.error("Sikertelen hozzáadás: ", err);
    return res
      .status(500)
      .json({ error: "Hiba történt a kategória hozzáadásakor!" });
  }
}
async function removeBoardGameCategory(req, res) {
  const { categoryname } = req.body;
  if (!categoryname) {
    return res.status(400).json({ error: "Nem érkezett adat a kliens felől!" });
  }
  try {
    const { success } = await db.deleteBoardGameCategory(categoryname);
    if (!success) {
      return res.status(404).json({ error: "Nem található a kategórianév!" });
    }
    return res.status(200).json({ message: "Sikeres törlés!" });
  } catch (err) {
    console.error("Sikertelen törlés: ", err);
    return res
      .status(500)
      .json({ error: "Hiba történt a kategória törlésekor" });
  }
}
async function updateBoardGameCategory(req, res) {
  const { categoryname, updatedname } = req.body;
  if (!categoryname || !updatedname) {
    return res.status(400).json({ error: "Nem érkezett adat a kliens felől!" });
  }
  try {
    const { success } = await db.updateBoardGameCategory(
      categoryname,
      updatedname
    );
    if (!success) {
      return res.status(404).json({ error: "Nem található a kategórianév!" });
    } else {
      return res.status(200).json({ message: "Sikeres frissítés!" });
    }
  } catch (err) {
    console.error("Sikertelen frissítés: ", err);
    return res
      .status(500)
      .json({ error: "Hiba történt a kategória frissítésekor!" });
  }
}
async function deleteBoardGame(req, res) {
  const { boardgameID } = req.body;
  if (!boardgameID) {
    return res
      .status(400)
      .json({ error: "Nem érkezett boardgameID a kliens felől!" });
  }
  try {
    const { success } = await db.deleteBoardGame(boardgameID);
    if (!success) {
      return res.status(404).json({ error: "Nem található a társasjáték!" });
    }
    return res.status(200).json({ message: "Sikeres törlés!" });
  } catch (err) {
    console.error("Sikertelen törlés: ", err);
    return res
      .status(500)
      .json({ error: "Hiba történt a társasjáték törlésekor!" });
  }
}
async function updateBoardGame(req, res) {
  const { boardgame } = req.body;

  if (!boardgame) {
    return res.status(400).json({ error: "Nem érkezett adat a kliens felől!" });
  }
  try {
    const { success } = await db.updateBoardGame(boardgame);
    if (!success) {
      return res.status(404).json({ error: "Nem található a társasjáték!" });
    } else {
      return res.status(200).json({ message: "Sikeres frissítés!" });
    }
  } catch (err) {
    console.error("Sikertelen frissítés: ", err);
    return res
      .status(500)
      .json({ error: "Hiba történt a társasjáték frissítésekor!" });
  }
}
async function addBoardGame(req, res) {
  const { boardgame } = req.body;
  if (!boardgame) {
    return res.status(400).json({ error: "Nem érkezett adat a kliens felől!" });
  }
  try {
    const { success } = await db.addBoardGame(boardgame);

    if (success) {
      return res
        .status(200)
        .json({ message: "Társasjáték sikeresen hozzáadva a táblához!" });
    } else {
      return res
        .status(500)
        .json({ error: "Hiba történt a társasjáték hozzáadásakor!" });
    }
  } catch (err) {
    console.error("Sikertelen hozzáadás: ", err);
    return res
      .status(500)
      .json({ error: "Hiba történt az ital hozzáadásakor!" });
  }
}
module.exports = {
  deleteDrink,
  updateDrink,
  addDrink,
  addDrinkCategory,
  removeDrinkCategory,
  updateDrinkCategory,
  addBoardGameCategory,
  removeBoardGameCategory,
  updateBoardGameCategory,
  deleteBoardGame,
  addBoardGame,
  updateBoardGame,
};
