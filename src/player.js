const player = {
  name: "Anxier",
  hp: 100,
  maxHp: 100,
  attack: 10,
  gold: 0,
  xp: 0,
  level: 1,
  inventory: [],
  kills: { orc: 0 }
};

function gainXP(amount) {
  player.xp += amount;
  while (player.xp >= player.level * 30) {
    player.xp -= player.level * 30;
    player.level++;
    player.maxHp += 10;
    player.hp = player.maxHp;
    player.attack += 2;
    console.log(`✨ Level up! Now level ${player.level}!`);
  }
}

module.exports = { player, gainXP };
