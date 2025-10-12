const enemies = [
  { type: "orc", name: "Orc", hp: 40, attack: 6, xp: 20, gold: 15 },
  { type: "goblin", name: "Goblin", hp: 25, attack: 4, xp: 10, gold: 8 },
  { type: "troll", name: "Troll", hp: 60, attack: 8, xp: 30, gold: 25 }
];

function getRandomEnemy() {
  const i = Math.floor(Math.random() * enemies.length);
  return JSON.parse(JSON.stringify(enemies[i]));
}

module.exports = { enemies, getRandomEnemy };
