const prompt = require("prompt-sync")({ sigint: true });
const { player } = require("./player");

function startDialogue() {
  console.log("\n🧙 The Guildmaster greets you:");
  console.log('Ah, brave one... You have the letter?');

  console.log("\n1) Tell the truth — hand over the letter.");
  console.log("2) Lie — say it was lost.");

  const choice = prompt("Your choice: ");

  if (choice === "1") {
    console.log("\n🕊️ You hand over the letter with honor.");
    console.log("The Guild thanks you. Fear turned to trust.");
    player.gold += 30;
    player.xp += 20;
  } else if (choice === "2") {
    console.log("\n🎭 You lie. The Guildmaster frowns but pays you.");
    console.log("'The Guild pays for silence, not for courage.'");
    player.gold += 60;
    player.xp += 10;
  } else {
    console.log("\n…The Guildmaster sighs. 'Silence, then. Leave.'");
  }

  console.log(`\nGold: ${player.gold} | XP: ${player.xp}`);
}

module.exports = { startDialogue };
