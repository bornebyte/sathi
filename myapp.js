const { runSathi } = require('./interpreter.js');

const code = `
sathi yo ho num = 42
sathi bhana(num)
`;

const result = runSathi(code);
console.log('Output:', result.output);