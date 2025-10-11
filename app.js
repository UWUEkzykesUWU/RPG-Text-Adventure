const prompt = require("prompt-sync")({ sigint: true });

// === ИГРОК ===
let player = {
  name: "Экзикес",
  hp: 50,
  attack: 5,
  gold: 100,
  inventory: [],
  xp: 0,
  level: 1
};

// === ВРАГИ ===
const enemies = [
  { name: "Гоблин", hp: 20, attack: 3, xp: 10, gold: 5 },
  { name: "Орк", hp: 40, attack: 6, xp: 20, gold: 15 },
  { name: "Тролль", hp: 60, attack: 8, xp: 30, gold: 25 }
];

// === КВЕСТЫ ===
let quests = [
  {
    id: 1,
    name: "Первый бой",
    description: "Победить любого врага.",
    completed: false,
    reward: { gold: 20, xp: 10 }
  },
  {
    id: 2,
    name: "Гоблинская угроза",
    description: "Победить 3 гоблинов.",
    completed: false,
    progress: 0,
    target: 3,
    reward: { gold: 50, xp: 30 }
  }
];

// === ПРОВЕРКА УРОВНЯ ===
function checkLevelUp() {
  let needXP = player.level * 20;
  while (player.xp >= needXP) {
    player.level++;
    player.xp -= needXP;
    player.hp += 20;
    player.attack += 5;
    console.log(`\n⭐ Новый уровень! Теперь у тебя ${player.level} уровень.`);
    console.log(`❤️ HP: ${player.hp}, ⚔️ Атака: ${player.attack}`);
    needXP = player.level * 20;
  }
}

// === ПРОВЕРКА КВЕСТОВ ===
function checkQuests(enemy) {
  for (let quest of quests) {
    if (!quest.completed) {
      if (quest.id === 1) {
        quest.completed = true;
        player.gold += quest.reward.gold;
        player.xp += quest.reward.xp;
        console.log(`\n📜 Квест выполнен: "${quest.name}"!`);
        console.log(`🏆 Награда: +${quest.reward.gold} золота, +${quest.reward.xp} XP`);
        checkLevelUp();
      }

      if (quest.id === 2 && enemy.name === "Гоблин") {
        quest.progress++;
        console.log(`📌 Квест "${quest.name}": ${quest.progress}/${quest.target}`);
        if (quest.progress >= quest.target) {
          quest.completed = true;
          player.gold += quest.reward.gold;
          player.xp += quest.reward.xp;
          console.log(`\n📜 Квест выполнен: "${quest.name}"!`);
          console.log(`🏆 Награда: +${quest.reward.gold} золота, +${quest.reward.xp} XP`);
          checkLevelUp();
        }
      }
    }
  }
}

// === ПРОСМОТР КВЕСТОВ ===
function showQuests() {
  console.log("\n📜 Активные квесты:");
  for (let quest of quests) {
    if (quest.completed) {
      console.log(`✅ ${quest.name} — выполнен`);
    } else if (quest.progress !== undefined) {
      console.log(`❗ ${quest.name}: ${quest.progress}/${quest.target}`);
    } else {
      console.log(`❗ ${quest.name}: не выполнен`);
    }
  }
}

// === СЛУЧАЙНЫЙ ВРАГ ===
function getRandomEnemy() {
  const index = Math.floor(Math.random() * enemies.length);
  return { ...enemies[index] };
}

// === БОЙ ===
function battle() {
  let enemy = getRandomEnemy();
  console.log(`\n⚔️ На тебя напал ${enemy.name}! HP: ${enemy.hp}, Атака: ${enemy.attack}`);

  while (player.hp > 0 && enemy.hp > 0) {
    enemy.hp -= player.attack;
    console.log(`Ты ударил ${enemy.name} на ${player.attack}. У врага осталось ${Math.max(0, enemy.hp)} HP.`);
    if (enemy.hp <= 0) break;

    player.hp -= enemy.attack;
    console.log(`${enemy.name} ударил тебя на ${enemy.attack}. У тебя осталось ${Math.max(0, player.hp)} HP.`);
  }

  if (player.hp > 0) {
    console.log(`\n🎉 Победа над ${enemy.name}!`);
    player.gold += enemy.gold;
    player.xp += enemy.xp;
    console.log(`💰 +${enemy.gold} золота, +${enemy.xp} XP.`);
    checkLevelUp();
    checkQuests(enemy);
  } else {
    console.log(`\n💀 ${enemy.name} победил тебя...`);
  }
}

// === ГИЛЬДИЯ ГЕРОЕВ ===
function guildQuest() {
  console.log("\n🏰 Ты подходишь к воротам Гильдии героев...");
  if (player.level < 3) {
    console.log("🚫 Охранник: 'Ты ещё слишком слаб. Возвращайся, когда достигнешь 3 уровня.'");
  } else {
    console.log("✅ Охранник: 'Добро пожаловать, герой! Гильдия принимает тебя.'");
    console.log("🎉 Начинается новая глава твоего приключения!");
  }
}

// === МЕНЮ ===
function mainMenu() {
  while (true) {
    console.log("\n=== Главное меню ===");
    console.log("1 - Сразиться с врагом");
    console.log("2 - Посмотреть квесты");
    console.log("3 - Статистика героя");
    console.log("4 - Войти в Гильдию героев");
    console.log("0 - Выйти");

    let choice = prompt("Выбор: ");

    if (choice === "1") {
      battle();
    } else if (choice === "2") {
      showQuests();
    } else if (choice === "3") {
      console.log(`\n👤 ${player.name}`);
      console.log(`❤️ HP: ${player.hp}`);
      console.log(`⚔️ Атака: ${player.attack}`);
      console.log(`💰 Золото: ${player.gold}`);
      console.log(`⭐ Уровень: ${player.level} (XP: ${player.xp})`);
      console.log(`🎒 Инвентарь: ${player.inventory.join(", ") || "пусто"}`);
    } else if (choice === "4") {
      guildQuest();
    } else if (choice === "0") {
      console.log("👋 Игра завершена.");
      break;
    } else {
      console.log("❌ Неверный выбор!");
    }
  }
}

// 🚀 Запуск
mainMenu();
