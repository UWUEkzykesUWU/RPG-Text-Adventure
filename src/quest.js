const { player, gainXP } = require("./player");

const quest = {
  id: "hunt-orcs",
  title: "Hunt the Orcs",
  need: 3, // сколько орков нужно убить
  reward: { gold: 50, xp: 40 },
  completed: false
};

function showQuest() {
  if (quest.completed) {
    console.log("✅ Quest completed: Hunt the Orcs");
  } else {
    console.log(`📝 Quest: ${quest.title} — kill ${quest.need} orcs`);
    console.log(`Progress: ${player.kills.orc}/${quest.need}`);
  }
}

function checkQuest() {
  if (!quest.completed && player.kills.orc >= quest.need) {
    quest.completed = true;
    player.gold += quest.reward.gold;
    gainXP(quest.reward.xp);
    console.log(
      `\n🎁 Quest complete! +${quest.reward.gold} gold, +${quest.reward.xp} XP`
    );
  }
}

module.exports = { quest, showQuest, checkQuest };
