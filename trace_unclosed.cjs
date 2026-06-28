const fs = require('fs');
const code = fs.readFileSync('js/app.js', 'utf8');

let inSingleQuote = false;
let inDoubleQuote = false;
let inTemplate = false;
let inLineComment = false;
let inBlockComment = false;

let templateStartIdx = -1;

for (let i = 0; i < code.length; i++) {
  const char = code[i];
  const next = code[i + 1];
  
  if (inLineComment) {
    if (char === '\n' || char === '\r') {
      inLineComment = false;
    }
    continue;
  }
  if (inBlockComment) {
    if (char === '*' && next === '/') {
      inBlockComment = false;
      i++;
    }
    continue;
  }
  if (inSingleQuote) {
    if (char === "'" && code[i - 1] !== '\\') {
      inSingleQuote = false;
    }
    continue;
  }
  if (inDoubleQuote) {
    if (char === '"' && code[i - 1] !== '\\') {
      inDoubleQuote = false;
    }
    continue;
  }
  if (inTemplate) {
    if (char === '`' && code[i - 1] !== '\\') {
      inTemplate = false;
      templateStartIdx = -1;
    } else if (char === '$' && next === '{' && code[i - 1] !== '\\') {
      // interpolation handles braces within it
      let brCount = 1;
      i += 2; // skip ${
      while (i < code.length && brCount > 0) {
        const c = code[i];
        if (c === '{') brCount++;
        else if (c === '}') brCount--;
        i++;
      }
      i--; // adjust back
    }
    continue;
  }
  
  // Check comments
  if (char === '/' && next === '/') {
    inLineComment = true;
    i++;
    continue;
  }
  if (char === '/' && next === '*') {
    inBlockComment = true;
    i++;
    continue;
  }
  
  // Check strings
  if (char === "'") {
    inSingleQuote = true;
    continue;
  }
  if (char === '"') {
    inDoubleQuote = true;
    continue;
  }
  if (char === '`') {
    inTemplate = true;
    templateStartIdx = i;
    continue;
  }
}

if (inTemplate) {
  const lines = code.substring(0, templateStartIdx).split('\n');
  const lineNo = lines.length;
  console.log(`Unclosed template literal starts at line ${lineNo}:`);
  console.log(code.substring(templateStartIdx, templateStartIdx + 200));
} else {
  console.log('No unclosed template literal found in clean trace!');
}
