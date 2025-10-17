const { fadeInText, slowText } = require("../ui/uiEffects");
const { player, gainXP } = require("./player");
const { getRandomEnemy } = require("./enemies");
const { addItem } = require("../systems/inventory");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function battle(prompt) {

  let enemy = getRandomEnemy();
  console.log(`⚔️  A ${enemy.name} appears!`);

  while (player.hp > 0 && enemy.hp > 0) {
    const choice = prompt("(1) Attack  (2) Use potion  (0) Run: ");
  if (choice === "0") {
  const text1 = "🏃 You ran away!";
  const text2 = "You flee into the shadows, heart pounding...\n";

  for (const ch of text1) {
    process.stdout.write(ch);
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 20); // мини-пауза
  }

  console.log();
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 500);

  for (const ch of text2) {
    process.stdout.write(ch);
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 20);
  }

  console.log();
  return false;
}



    if (choice === "2") {
      const i = player.inventory.indexOf("potion");
      if (i >= 0) {
        player.inventory.splice(i, 1);
        player.hp = Math.min(player.maxHp, player.hp + 30);
        console.log(`🧪 Healed to ${player.hp}/${player.maxHp}.`);
      } else console.log("No potion!");
    }

    enemy.hp -= player.attack;
    console.log(`You hit ${enemy.name} for ${player.attack}.`);

    if (enemy.hp <= 0) break;

    player.hp -= enemy.attack;
    console.log(`${enemy.name} hits you for ${enemy.attack}.`);
  }

if (player.hp > 0) {
  const text1 = `🏆 You defeated the ${enemy.name}!`;
  const text2 = "The enemy collapses... Silence fills the air.\n";

  for (const ch of text1) {
    process.stdout.write(ch);
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 20);
  }

  console.log();
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 400);

  for (const ch of text2) {
    process.stdout.write(ch);
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 20);
  }

  console.log();
  // далее логика добычи и квестов

 // 🪙 LOOT SYSTEM

function getRandomLoot() {
  const roll = Math.random();

  if (roll < 0.5) {
    const gold = Math.floor(Math.random() * 10) + 5;
    player.gold += gold;
  } else if (roll < 0.8) {
    addItem("Healing Potion", "heal", 30);
  } else if (roll < 0.95) {
    addItem("Attack Elixir", "buff", 5);
  } else {
    addItem("Amulet of Courage", "unique", 0);
  }
}

  player.gold += enemy.gold;
  gainXP(enemy.xp);
  getRandomLoot();

  if (enemy.type === "orc") {
    player.kills.orc++;

    // Обновляем прогресс квеста
    const { quests } = require("./quest");
    const quest = quests[0];

    if (!quest.completed) {
      quest.progress++;
      console.log(`📈 Quest progress: ${quest.progress}/${quest.need}`);
    }
  }

  return true;
  } else {
  const text1 = "💀 You died...";
  const text2 = "Your vision fades as darkness embraces you...\n";

  for (const ch of text1) {
    process.stdout.write(ch);
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 20);
  }

  console.log();
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 400);

  for (const ch of text2) {
    process.stdout.write(ch);
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 20);
  }

  console.log();
  return false;
}

}


module.exports = { battle };
