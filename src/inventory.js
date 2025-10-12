// inventory.js
const { player } = require("./player");

let inventory = [
  { name: "Potion", type: "healing", amount: 1, effect: 30 },
];

function showInventory() {
  console.log("\n🎒 Inventory:");
  if (inventory.length === 0) {
    console.log("  (empty)");
  } else {
    inventory.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.name} x${item.amount}`);
    });
  }
}

function addItem(itemName, type, effect = 0) {
  const existing = inventory.find(i => i.name === itemName);
  if (existing) existing.amount++;
  else inventory.push({ name: itemName, type, amount: 1, effect });
  console.log(`\n🧾 You obtained: ${itemName}!`);
}

function useItem(index) {
  const item = inventory[index - 1];
  if (!item) return console.log("❌ Invalid item.");

  if (item.type === "healing") {
    player.hp = Math.min(player.maxHp, player.hp + item.effect);
    console.log(`💊 You used ${item.name} and restored ${item.effect} HP!`);
  }

  item.amount--;
  if (item.amount <= 0) inventory.splice(index - 1, 1);
}

module.exports = { showInventory, addItem, useItem, inventory };
