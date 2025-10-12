const { player, gainXP } = require("./player");
const { getRandomEnemy } = require("./enemies");

function battle(prompt) {
  let enemy = getRandomEnemy();
  console.log(`⚔️  A ${enemy.name} appears!`);

  while (player.hp > 0 && enemy.hp > 0) {
    const choice = prompt("(1) Attack  (2) Use potion  (0) Run: ");
    if (choice === "0") {
      console.log("You ran away!");
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
    console.log(`🏆 You defeated the ${enemy.name}!`);
    player.gold += enemy.gold;
    gainXP(enemy.xp);
    if (enemy.type === "orc") player.kills.orc++;
    return true;
  } else {
    console.log("💀 You died...");
    return false;
  }
}

module.exports = { battle };
