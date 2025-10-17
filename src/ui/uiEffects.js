// src/ui/uiEffects.js
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Медленный вывод ────────────────────────────────
function slowText(text, delay = 30) {
  return new Promise((resolve) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        process.stdout.write(text[i]);
        i++;
      } else {
        clearInterval(interval);
        process.stdout.write("\n");
        resolve();
      }
    }, delay);
  });
}

// ─── Быстрый вывод ──────────────────────────────────
function fastText(text) {
  console.log(text);
}

// ─── Мигание текста (например, “Press any key...”) ──
function blinkingText(text, times = 3, delay = 400) {
  return new Promise((resolve) => {
    let count = 0;
    const interval = setInterval(() => {
      process.stdout.write(`\r${count % 2 === 0 ? text : " ".repeat(text.length)}`);
      count++;
      if (count > times * 2) {
        clearInterval(interval);
        process.stdout.write(`\r${" ".repeat(text.length)}\r`);
        resolve();
      }
    }, delay);
  });
}

// ─── Эффект fade-in ─────────────────────────────────
async function fadeInText(text, delay = 50) {
  for (let i = 0; i < text.length; i++) {
    process.stdout.write(text[i]);
    await sleep(delay);
  }
  process.stdout.write("\n");
}

// ─── Fade-in одной строки (без переносов) ───────────
async function fadeInLine(text, delay = 50) {
  const clean = text.replace(/\r?\n/g, ""); // убираем переводы строк
  for (let i = 0; i <= clean.length; i++) {
    process.stdout.write("\r" + clean.slice(0, i));
    await sleep(delay);
  }
  process.stdout.write("\n");
}

// ─── Экспорт ────────────────────────────────────────
module.exports = { slowText, fastText, blinkingText, fadeInText, fadeInLine, sleep };

