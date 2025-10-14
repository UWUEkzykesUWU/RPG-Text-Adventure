// gameLoop.js

const { slowText, fastText, blinkingText, fadeInText } = require("./ui/uiEffects");
const { battle } = require("./core/battle");
const { visitShop } = require("./systems/shop");
const { saveGame, loadGame } = require("./systems/save");
const { player, applyLoaded } = require("./core/player");
const { showQuest, checkQuest } = require("./core/quest");
const { startDialogue } = require("./systems/dialogue");
const prompt = require("prompt-sync")({ sigint: true });

async function intro() {
  console.clear();
  await blinkingText("🔄 Booting neural interface...", 3, 200);
  await blinkingText("🔗 Synchronizing player consciousness...", 3, 200);
  await blinkingText("🌒 Loading world: Anxier...", 3, 200);
  await fadeInText("♬ Welcome to Anxier RPG...");
  fastText("A journey through fear, code, and persistence.\n");
}

async function mainMenu() {
  showQuest();
  console.log(`
1️⃣  Battle
2️⃣  Shop
3️⃣  Rest
4️⃣  Save
5️⃣  Load
6️⃣  Guildmaster
0️⃣  Exit
  `);
  return prompt("Choose your action: ");
}

async function gameLoop() {
  await intro();

  while (true) {
    const choice = await mainMenu();

    if (choice === "0") break;
    if (choice === "1") {
      const alive = battle(prompt);
      if (!alive) break;
      checkQuest();
    } else if (choice === "2") {
      visitShop(prompt);
    } else if (choice === "3") {
      if (player.gold >= 5) {
        player.gold -= 5;
        player.hp = player.maxHp;
        console.log("💤 Rested!");
      } else console.log("Need 5 gold!");
    } else if (choice === "4") {
      saveGame({ player });
    } else if (choice === "5") {
      const data = loadGame();
      if (data) applyLoaded(data);
    } else if (choice === "6") {
      const questCompleted = checkQuest();
      if (questCompleted) startDialogue();
      else await slowText("\n🧙‍♂️ Guildmaster: 'You haven't completed your task yet. Return when the orcs are slain.'");
    }
  }
}

module.exports = { gameLoop };
