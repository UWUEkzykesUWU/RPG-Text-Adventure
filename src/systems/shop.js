const { player } = require("./player");

const shop = [
  { name: "potion", label: "Potion (+30 HP)", price: 10, effect: () => {} },
  { name: "amulet", label: "Amulet of Power (+2 ATK)", price: 40, effect: () => player.attack += 2 }
];

function visitShop(prompt) {
  while (true) {
    console.log("\n🛒 Shop:");
    shop.forEach((it, i) => console.log(`${i + 1}. ${it.label} — ${it.price}g`));
    console.log(`Gold: ${player.gold}`);
    const choice = prompt("(num to buy, 0 to exit): ");
    if (choice === "0") break;

    const idx = parseInt(choice) - 1;
    const item = shop[idx];
    if (!item) { console.log("No such item."); continue; }
    if (player.gold < item.price) { console.log("Not enough gold."); continue; }

    player.gold -= item.price;
    player.inventory.push(item.name);
    item.effect?.();
    console.log(`Bought: ${item.label}`);
  }
}

module.exports = { visitShop };
