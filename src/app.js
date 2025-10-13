const { slowText, fastText } = require("./textEffects");
const { showInventory, useItem } = require("./inventory");
const { startDialogue } = require("./dialogue");
const { showQuest, checkQuest, quests } = require("./quest");
const prompt = require("prompt-sync")({ sigint: true });
const { player } = require("./player");
const { battle } = require("./battle");
const { visitShop } = require("./shop");
const { saveGame, loadGame } = require("./save");


function applyLoaded(data) {
  Object.assign(player, data.player);
}

function mainMenu() {
  showQuest();
  slowText("⚔️ Welcome to Anxier RPG...", 40);
  fastText("A journey through fear, code, and persistence.\n");
  console.log(`\n=== Anxier RPG ===
HP: ${player.hp}/${player.maxHp}  ATK: ${player.attack}  LVL: ${player.level}  Gold: ${player.gold}`);
  console.log("1) Forest\n2) Shop\n3) Rest (5 gold)\n4) Save\n5) Load\n6) Talk to Guildmaster\n7) Inventory\n0) Exit");
  return prompt("Choice: ");
}

(function run() {
  while (true) {
    const choice = mainMenu();
    if (choice === "0") break;

    if (choice === "1") {
      const alive = battle(prompt);
      if (!alive) break;
      checkQuest(); // проверяем, выполнен ли квест
    }
    else if (choice === "2") visitShop(prompt);
    else if (choice === "3") {
      if (player.gold >= 5) {
        player.gold -= 5;
        player.hp = player.maxHp;
        console.log("🛏️ Rested!");
      } else console.log("Need 5 gold!");
    }
    else if (choice === "4") saveGame({ player });
    else if (choice === "5") {
      const data = loadGame();
      if (data) applyLoaded(data);
    }
    else if (choice === "6") {
  const questCompleted = checkQuest(); // проверяем, выполнен ли квест

  if (questCompleted) {
    startDialogue(); // запускаем диалог только если квест выполнен
  } else {
    console.log("\n🧙‍♂️ Guildmaster: 'You haven't completed your task yet. Return when the orcs are slain.'");
  }
}

    else if (choice === "7") {
      showInventory();
      const use = prompt("Use item number (or press Enter to cancel): ");
      if (use) useItem(Number(use));
    }
  }
})();
