// Mock for nanoid v5 ESM module to prevent Jest parsing errors under jsdom.
// Mirrors the public API used in this project: nanoid(), customAlphabet().

let counter = 0;

function pickFromAlphabet(alphabet, size) {
  counter += 1;
  let out = '';
  let n = counter;
  for (let i = 0; i < size; i += 1) {
    out += alphabet.charAt(n % alphabet.length);
    n = Math.floor(n / alphabet.length) + 1;
  }
  return out;
}

function customAlphabet(alphabet, size) {
  return () => pickFromAlphabet(alphabet, size);
}

const DEFAULT_ALPHABET =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

function nanoid(size = 21) {
  return pickFromAlphabet(DEFAULT_ALPHABET, size);
}

module.exports = { nanoid, customAlphabet };
