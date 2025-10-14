const { player, gainXP } = require("./player");

// Массив квестов (в будущем их может быть больше)
let quests = [
  {
    id: "hunt-orcs",
    title: "Hunt the Orcs",
    need: 3,
    progress: 0,
    reward: { gold: 50, xp: 40 },
    completed: false
  }
];

// Показываем активный квест
function showQuest() {
  const quest = quests[0]; // Берём первый квест

  if (quest.completed) {
    console.log(`✅ Quest completed: ${quest.title}`);
  } else {
    console.log(`📜 Quest: ${quest.title} — kill ${quest.need} orcs`);
    console.log(`Progress: ${quest.progress}/${quest.need}`);
  }
}

// Проверяем выполнение квеста
function checkQuest() {
  for (let quest of quests) {
    if (!quest.completed && player.kills.orc >= quest.need) {
      quest.completed = true;
      player.gold += quest.reward.gold;
      gainXP(quest.reward.xp);
      console.log(`\n✅ Quest completed: ${quest.title}`);
    }
  }
  return quests.some(q => q.completed); // ✅ теперь возвращает true, если хотя бы один выполнен
}


module.exports = { showQuest, checkQuest, quests };
