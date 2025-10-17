const prompt = require("prompt-sync")();
const { fadeInText, slowText, fadeInLine, sleep } = require("../ui/uiEffects");
const { player } = require("../core/player");
const { quests } = require("../core/quest");

async function startDialogue() {
  await sleep(300);
  console.log("\n───────────────────────────────");
  await fadeInText("🧙‍♂️ The Guildmaster greets you...", 40);
  await slowText("Ah, brave one... You have the letter?\n");
  await slowText("What will you do?\n");

  console.log("1) Tell the truth — hand over the letter.");
  await sleep(150);
  console.log("2) Lie — say it was lost.\n");

  const choice = prompt("Your choice: ");
  console.log("\n───────────────────────────────\n");

  if (choice === "1") {
    await fadeInText("📜 You hand over the letter truthfully.", 40);
    await sleep(150);
    await slowText("The Guildmaster nods solemnly.\n");
    await sleep(150);
    await slowText("'Honesty... rare in these lands.'\n");
    player.gold += 200;
  } 
  else if (choice === "2") {
    await fadeInText("😼 You lie. The Guildmaster frowns but pays you.", 40);
    await sleep(150);
    await slowText("'The Guild pays for silence, not for courage.'\n");
    player.gold += 100;
  } 
  else {
    await slowText("The Guildmaster stares, confused. '...You need rest, adventurer.'\n");
  }

  // Завершение квеста
  const quest = quests.find(q => q.name === "Hunt the Orcs");
  if (quest) quest.completed = true;

  await sleep(300);
  console.log("\n───────────────────────────────");
  await fadeInLine(`💰 Gold: ${player.gold} | XP: ${player.xp}`, 30);
  await sleep(200);
  await slowText("✅ Quest completed: Hunt the Orcs\n", 30);
  console.log("───────────────────────────────\n");
}

module.exports = { startDialogue };
