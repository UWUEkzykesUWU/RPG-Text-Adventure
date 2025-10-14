const { player } = require("./player");

let inventory = [
  // пример стартового предмета
  { name: "Potion", type: "healing", amount: 1, effect: 30 },
];

function showInventory() {
  console.log("\n📦 Inventory:");
  if (inventory.length === 0) {
    console.log("  (empty)");
  } else {
    inventory.forEach((item, index) => {
      const qty = item.amount !== undefined ? ` x${item.amount}` : "";
      console.log(`  ${index + 1}. ${item.name}${qty}`);
    });
  }
}

function addItem(itemName, type, effect = 0) {
  // уникальные предметы — без количества и без дублирования
  if (type === "unique") {
    const hasIt = inventory.some(i => i.name === itemName && i.type === "unique");
    if (hasIt) {
      console.log(`ℹ️ You already have ${itemName}.`);
      return;
    }
    // добавляем и применяем пассивный бонус
    inventory.push({ name: itemName, type }); // без amount/effect
    // 👉 выбери бонус на вкус:
    player.attack += 2;            // небольшой +ATK
    // player.maxHp += 10;         // или здоровье
    // можно запомнить флаг, если надо
    console.log(`💠 ${itemName} empowers you! (+2 ATK)`);
    console.log(`📘 You obtained: ${itemName}!`);
    return;
  }

  // обычные предметы — стакаются по количеству
  const existing = inventory.find(i => i.name === itemName && i.type === type);
  if (existing) {
    existing.amount = (existing.amount || 0) + 1;
  } else {
    inventory.push({ name: itemName, type, amount: 1, effect });
  }
  console.log(`📘 You obtained: ${itemName}!`);
}

function useItem(index) {
  const item = inventory[index - 1];
  if (!item) {
    console.log("❌ Invalid item.");
    return;
  }

  if (item.type === "healing") {
    player.hp = Math.min(player.maxHp, player.hp + item.effect);
    console.log(`🧪 You used ${item.name} and restored ${item.effect} HP!`);
    item.amount--;
    if (item.amount <= 0) inventory.splice(index - 1, 1);
    return;
  }

  if (item.type === "buff") {
    // одноразовый временный бафф на бой (или постоянный — на твой выбор)
    player.attack += item.effect; // например, +5 к атаке
    console.log(`⚡ You feel stronger! +${item.effect} ATK from ${item.name}.`);
    item.amount--;
    if (item.amount <= 0) inventory.splice(index - 1, 1);
    return;
  }

  // уникальные предметы не «используются» (пассивные)
  if (item.type === "unique") {
    console.log(`ℹ️ ${item.name} is a passive item and cannot be used.`);
    return;
  }
}

module.exports = { showInventory, addItem, useItem, inventory };
