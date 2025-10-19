const { runSathi } = require('./sathi.js');

describe('Sathi Interpreter', () => {
  test('should handle variable assignment and printing', () => {
    const code = `
      sathi yo ho x = 10
      sathi bhana(x)
    `;
    const { success, output } = runSathi(code);
    expect(success).toBe(true);
    expect(output).toEqual([10]);
  });

  test('should handle basic arithmetic', () => {
    const code = `
      sathi yo ho a = 10 + 5
      sathi yo ho b = a * 2
      sathi bhana(b - 10)
    `;
    const { success, output } = runSathi(code);
    expect(success).toBe(true);
    expect(output).toEqual([20]);
  });

  test('should handle division and floating point numbers', () => {
    const code = 'sathi bhana(11 / 2)';
    const { success, output } = runSathi(code);
    expect(success).toBe(true);
    expect(output).toEqual([5.5]);
  });
});
