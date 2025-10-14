const readline = require("readline");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function slowText(text, delay = 30) {
  let skip = false;

  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) process.stdin.setRawMode(true);

  const onKeyPress = (_, key) => {
    if (key && key.name === "space") skip = true;
  };
  process.stdin.on("keypress", onKeyPress);

  for (let i = 0; i < text.length; i++) {
    if (skip) {
      process.stdout.write(text.slice(i));
      break;
    }
    process.stdout.write(text[i]);
    await sleep(delay);
  }

  process.stdout.write("\n");
  process.stdin.removeListener("keypress", onKeyPress);
  process.stdin.setRawMode(false);
}

function blinkingText(text, times = 3, delay = 400) {
  return new Promise(resolve => {
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
// Эффект fade-in: текст проявляется плавно, как из тумана
async function fadeInText(text, delay = 50) {
  for (let i = 0; i <= text.length; i++) {
    process.stdout.write("\r" + text.slice(0, i));
    await sleep(delay);
  }
  process.stdout.write("\n");
}

function fastText(text) {
  console.log(text);
}


module.exports = { slowText, fastText, blinkingText, fadeInText };
