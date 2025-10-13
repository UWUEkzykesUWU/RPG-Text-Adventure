// textEffects.js
function slowText(text, delay = 30) {
  for (let i = 0; i < text.length; i++) {
    process.stdout.write(text[i]);
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, delay); // маленькая задержка
  }
  console.log();
}

function fastText(text) {
  console.log(text);
}

module.exports = { slowText, fastText };
