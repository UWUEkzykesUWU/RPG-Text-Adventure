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
  console.log(`\n=== Anxier RPG ===
HP: ${player.hp}/${player.maxHp}  ATK: ${player.attack}  LVL: ${player.level}  Gold: ${player.gold}`);
  console.log("1) Forest\n2) Shop\n3) Rest (5 gold)\n4) Save\n5) Load\n6) Talk to Guildmaster\n0) Exit");
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
} else if (choice === "2") visitShop(prompt);
else if (choice === "3") {
  if (player.gold >= 5) {
    player.gold -= 5;
    player.hp = player.maxHp;
    console.log("🛌 Rested!");
  } else console.log("Need 5 gold!");
} else if (choice === "4") saveGame({ player });
else if (choice === "5") loadGame(applyLoaded);
else if (choice === "6") {
  const questCompleted = checkQuest(); // Проверяем, выполнен ли квест

  if (questCompleted) {
    startDialogue();
  } else {
    console.log("\n🧙 Guildmaster: 'You haven't completed your task yet. Return when the orcs are slain.'");
  }
}
      const data = loadGame();
      if (data) applyLoaded(data);
    }
  }
)();
