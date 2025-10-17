const { slowText, fadeInText } = require("../ui/uiEffects");
const { player } = require("../core/player");
const { getRandomEnemy } = require("../core/enemies");
const { battle } = require("../core/battle");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function rest(prompt) {
  console.clear();
  await fadeInText("🌙 You set up camp for the night...", 40);
  await sleep(500);

  const roll = Math.random();

  if (roll < 0.6) {
    // Удачный отдых
    const heal = Math.min(player.maxHp, player.hp + 40);
    const restored = heal - player.hp;
    player.hp = heal;
    await slowText(`You rest peacefully and recover ${restored} HP.`, 40);
    await sleep(400);
    console.log(`❤️ HP: ${player.hp}/${player.maxHp}`);
  } 
  else if (roll < 0.9) {
    // Ночной бой
    await fadeInText("⚔️ You are ambushed during the night!", 40);
    await sleep(400);
    await battle(prompt);
  } 
  else {
    // Находка
    await fadeInText("✨ You find something glowing near the fire...", 40);
    await sleep(400);
    await slowText("You found a Healing Potion and put it in your bag.", 40);

    const { addItem } = require("./inventory");
    addItem("Healing Potion", "heal", 30);
  }

  await slowText("🌅 Dawn rises. You continue your journey...\n", 40);
}

module.exports = { rest };