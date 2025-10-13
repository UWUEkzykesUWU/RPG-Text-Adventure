const fs = require("fs");
const { player } = require("./player");
const { fastText } = require("./textEffects");

function saveGame() {
  fs.writeFileSync("save.json", JSON.stringify({ player }, null, 2));
  fastText("💾 Game saved successfully!\n");
}

function loadGame() {
  if (fs.existsSync("save.json")) {
    const data = JSON.parse(fs.readFileSync("save.json", "utf-8"));
    fastText("📂 Game loaded. Welcome back, hero!\n");
    return data;
  } else {
    fastText("⚠️ No save found. The winds erase your past...\n");
    return null;
  }
}

module.exports = { saveGame, loadGame };
