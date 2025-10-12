const fs = require("fs");
const path = "./save.json";

function saveGame(state) {
  fs.writeFileSync(path, JSON.stringify(state, null, 2), "utf8");
  console.log("💾 Game saved!");
}

function loadGame() {
  if (!fs.existsSync(path)) { console.log("No save found."); return null; }
  const data = JSON.parse(fs.readFileSync(path, "utf8"));
  console.log("📂 Game loaded!");
  return data;
}

module.exports = { saveGame, loadGame };
