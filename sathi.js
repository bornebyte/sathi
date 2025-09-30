// ============================================
// LEXER - Breaks code into tokens
// ============================================

class Lexer {
  constructor(code) {
    this.code = code;
    this.pos = 0;
    this.currentChar = this.code[this.pos];
  }

  advance() {
    this.pos++;
    this.currentChar = this.pos < this.code.length ? this.code[this.pos] : null;
  }

  skipWhitespace() {
    while (this.currentChar && /\s/.test(this.currentChar)) {
      this.advance();
    }
  }

  skipComment() {
    if (this.currentChar === '#') {
      while (this.currentChar && this.currentChar !== '\n') {
        this.advance();
      }
    }
  }

  number() {
    let num = '';
    while (this.currentChar && /[0-9.]/.test(this.currentChar)) {
      num += this.currentChar;
      this.advance();
    }
    return parseFloat(num);
  }

  identifier() {
    let id = '';
    while (this.currentChar && /[a-zA-Z_0-9]/.test(this.currentChar)) {
      id += this.currentChar;
      this.advance();
    }
    return id;
  }

  getNextToken() {
    while (this.currentChar) {
      if (/\s/.test(this.currentChar)) {
        this.skipWhitespace();
        continue;
      }

      if (this.currentChar === '#') {
        this.skipComment();
        continue;
      }

      if (/[0-9]/.test(this.currentChar)) {
        return { type: 'NUMBER', value: this.number() };
      }

      if (/[a-zA-Z_]/.test(this.currentChar)) {
        const id = this.identifier();

        // Check for keywords
        if (id === 'sathi') return { type: 'SATHI' };
        if (id === 'yo') return { type: 'YO' };
        if (id === 'ho') return { type: 'HO' };
        if (id === 'bhana') return { type: 'BHANA' };

        return { type: 'ID', value: id };
      }

      if (this.currentChar === '=') {
        this.advance();
        return { type: 'ASSIGN' };
      }

      if (this.currentChar === '+') {
        this.advance();
        return { type: 'PLUS' };
      }

      if (this.currentChar === '-') {
        this.advance();
        return { type: 'MINUS' };
      }

      if (this.currentChar === '*') {
        this.advance();
        return { type: 'MUL' };
      }

      if (this.currentChar === '/') {
        this.advance();
        return { type: 'DIV' };
      }

      if (this.currentChar === '(') {
        this.advance();
        return { type: 'LPAREN' };
      }

      if (this.currentChar === ')') {
        this.advance();
        return { type: 'RPAREN' };
      }

      if (this.currentChar === '\n') {
        this.advance();
        return { type: 'NEWLINE' };
      }

      throw new Error(`Unknown character: ${this.currentChar}`);
    }

    return { type: 'EOF' };
  }
}

// ============================================
// PARSER - Builds Abstract Syntax Tree (AST)
// ============================================

class Parser {
  constructor(lexer) {
    this.lexer = lexer;
    this.currentToken = this.lexer.getNextToken();
  }

  eat(tokenType) {
    if (this.currentToken.type === tokenType) {
      this.currentToken = this.lexer.getNextToken();
    } else {
      throw new Error(`Expected ${tokenType}, got ${this.currentToken.type}`);
    }
  }

  factor() {
    const token = this.currentToken;

    if (token.type === 'NUMBER') {
      this.eat('NUMBER');
      return { type: 'Number', value: token.value };
    } else if (token.type === 'ID') {
      this.eat('ID');
      return { type: 'Variable', name: token.value };
    } else if (token.type === 'LPAREN') {
      this.eat('LPAREN');
      const node = this.expr();
      this.eat('RPAREN');
      return node;
    }

    throw new Error('Syntax error in factor');
  }

  term() {
    let node = this.factor();

    while (['MUL', 'DIV'].includes(this.currentToken.type)) {
      const op = this.currentToken.type;
      this.eat(op);
      node = {
        type: 'BinaryOp',
        op: op === 'MUL' ? '*' : '/',
        left: node,
        right: this.factor()
      };
    }

    return node;
  }

  expr() {
    let node = this.term();

    while (['PLUS', 'MINUS'].includes(this.currentToken.type)) {
      const op = this.currentToken.type;
      this.eat(op);
      node = {
        type: 'BinaryOp',
        op: op === 'PLUS' ? '+' : '-',
        left: node,
        right: this.term()
      };
    }

    return node;
  }

  statement() {
    if (this.currentToken.type === 'SATHI') {
      this.eat('SATHI');

      // Check if it's "sathi bhana" (print) or "sathi yo ho" (variable)
      if (this.currentToken.type === 'BHANA') {
        // Handle: sathi bhana(result)
        this.eat('BHANA');
        this.eat('LPAREN');
        const expr = this.expr();
        this.eat('RPAREN');
        return { type: 'Print', value: expr };
      } else if (this.currentToken.type === 'YO') {
        // Handle: sathi yo ho x = 10
        this.eat('YO');
        this.eat('HO');

        const varName = this.currentToken.value;
        this.eat('ID');
        this.eat('ASSIGN');
        const expr = this.expr();
        return { type: 'Assignment', name: varName, value: expr };
      } else {
        throw new Error(`Expected BHANA or YO after SATHI, got ${this.currentToken.type}`);
      }
    }

    return null;
  }

  parse() {
    const statements = [];

    while (this.currentToken.type !== 'EOF') {
      if (this.currentToken.type === 'NEWLINE') {
        this.eat('NEWLINE');
        continue;
      }

      const stmt = this.statement();
      if (stmt) statements.push(stmt);

      if (this.currentToken.type === 'NEWLINE') {
        this.eat('NEWLINE');
      }
    }

    return statements;
  }
}

// ============================================
// INTERPRETER - Executes the AST
// ============================================

class Interpreter {
  constructor() {
    this.variables = {};
    this.output = [];
  }

  visit(node) {
    if (node.type === 'Number') {
      return node.value;
    } else if (node.type === 'Variable') {
      if (!(node.name in this.variables)) {
        throw new Error(`Undefined variable: ${node.name}`);
      }
      return this.variables[node.name];
    } else if (node.type === 'BinaryOp') {
      const left = this.visit(node.left);
      const right = this.visit(node.right);
      switch (node.op) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/': return left / right;
      }
    } else if (node.type === 'Assignment') {
      this.variables[node.name] = this.visit(node.value);
      return null;
    } else if (node.type === 'Print') {
      const value = this.visit(node.value);
      this.output.push(value);
      // console.log(value); // Print to console in real-time
      return null;
    }
  }

  interpret(statements) {
    for (const stmt of statements) {
      this.visit(stmt);
    }
    return this.output;
  }
}

// ============================================
// MAIN - Run Your Language!
// ============================================

function runSathi(code) {
  try {
    const lexer = new Lexer(code);
    const parser = new Parser(lexer);
    const ast = parser.parse();
    const interpreter = new Interpreter();
    const output = interpreter.interpret(ast);
    return { success: true, output };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ============================================
// FILE EXECUTION - For running .sathi files
// ============================================

const fs = require('fs');

function runSathiFile(filename) {
  try {
    const code = fs.readFileSync(filename, 'utf8');
    // console.log(`Running ${filename}...\n`);
    const result = runSathi(code);

    if (!result.success) {
      console.error(`Error: ${result.error}`);
      process.exit(1);
    }
    console.log(result.output[0])
  } catch (error) {
    console.error(`Failed to read file: ${error.message}`);
    process.exit(1);
  }
}

// ============================================
// CLI Interface
// ============================================

if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Sathi Programming Language v1.0");
    console.log("\nUsage:");
    console.log("  node interpreter.js <filename.sathi>  - Run a .sathi file");
    console.log("\nExample:");
    console.log("  node interpreter.js program.sathi");
    process.exit(0);
  } else {
    runSathiFile(args[0]);
  }

}

// Export for use as a module
module.exports = { runSathi, runSathiFile };