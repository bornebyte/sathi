// ============================================
// LEXER - Breaks code into tokens
// ============================================

class Lexer {
  constructor(code) {
    this.code = code;
    this.pos = 0;
    this.currentChar = this.code[this.pos];
    this.line = 1;
    this.column = 1;
  }

  advance() {
    if (this.currentChar === '\n') {
      this.line++;
      this.column = 1;
    } else {
      this.column++;
    }
    this.pos++;
    this.currentChar = this.pos < this.code.length ? this.code[this.pos] : null;
  }

  skipWhitespace() {
    while (this.currentChar && /\s/.test(this.currentChar) && this.currentChar !== '\n') {
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
    let hasDot = false;
    while (this.currentChar && (/[0-9]/.test(this.currentChar) || (this.currentChar === '.' && !hasDot))) {
      if (this.currentChar === '.') hasDot = true;
      num += this.currentChar;
      this.advance();
    }
    return parseFloat(num);
  }

  string() {
    let str = '';
    const quote = this.currentChar; // ' or "
    this.advance(); // Skip opening quote

    while (this.currentChar && this.currentChar !== quote) {
      if (this.currentChar === '\\') {
        this.advance();
        // Handle escape sequences
        if (this.currentChar === 'n') str += '\n';
        else if (this.currentChar === 't') str += '\t';
        else if (this.currentChar === 'r') str += '\r';
        else if (this.currentChar === '\\') str += '\\';
        else if (this.currentChar === quote) str += quote;
        else str += this.currentChar;
        this.advance();
      } else {
        str += this.currentChar;
        this.advance();
      }
    }

    if (!this.currentChar) {
      throw new Error(`Unterminated string at line ${this.line}`);
    }

    this.advance(); // Skip closing quote
    return str;
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
      if (this.currentChar === ' ' || this.currentChar === '\t' || this.currentChar === '\r') {
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

      if (this.currentChar === '"' || this.currentChar === "'") {
        return { type: 'STRING', value: this.string() };
      }

      if (/[a-zA-Z_]/.test(this.currentChar)) {
        const id = this.identifier();

        // Check for keywords
        const keywords = {
          'sathi': 'SATHI',
          'yo': 'YO',
          'ho': 'HO',
          'bhana': 'BHANA',
          'yadi': 'IF',           // if
          'anya': 'ELSE',         // else
          'jaba': 'WHILE',        // while
          'prawahit': 'FOR',      // for (iterated)
          'dekhi': 'FROM',        // from (in range)
          'samma': 'TO',          // to (in range)
          'kadam': 'STEP',        // step
          'kaam': 'FUNCTION',     // function
          'firta': 'RETURN',      // return
          'thodau': 'BREAK',      // break
          'jari': 'CONTINUE',     // continue
          'pryas': 'TRY',         // try
          'samatan': 'CATCH',     // catch
          'satya': 'TRUE',        // true
          'asatya': 'FALSE',      // false
          'khali': 'NULL',        // null
          'ra': 'AND',            // and
          'wa': 'OR',             // or
          'hoina': 'NOT',         // not
          'ma': 'IN',             // in
        };

        if (keywords[id]) {
          return { type: keywords[id] };
        }

        return { type: 'ID', value: id };
      }

      // Two-character operators
      if (this.currentChar === '=' && this.code[this.pos + 1] === '=') {
        this.advance();
        this.advance();
        return { type: 'EQ' };
      }

      if (this.currentChar === '!' && this.code[this.pos + 1] === '=') {
        this.advance();
        this.advance();
        return { type: 'NE' };
      }

      if (this.currentChar === '<' && this.code[this.pos + 1] === '=') {
        this.advance();
        this.advance();
        return { type: 'LE' };
      }

      if (this.currentChar === '>' && this.code[this.pos + 1] === '=') {
        this.advance();
        this.advance();
        return { type: 'GE' };
      }

      if (this.currentChar === '&' && this.code[this.pos + 1] === '&') {
        this.advance();
        this.advance();
        return { type: 'AND_OP' };
      }

      if (this.currentChar === '|' && this.code[this.pos + 1] === '|') {
        this.advance();
        this.advance();
        return { type: 'OR_OP' };
      }

      // Single-character operators
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

      if (this.currentChar === '%') {
        this.advance();
        return { type: 'MOD' };
      }

      if (this.currentChar === '<') {
        this.advance();
        return { type: 'LT' };
      }

      if (this.currentChar === '>') {
        this.advance();
        return { type: 'GT' };
      }

      if (this.currentChar === '!') {
        this.advance();
        return { type: 'NOT_OP' };
      }

      if (this.currentChar === '(') {
        this.advance();
        return { type: 'LPAREN' };
      }

      if (this.currentChar === ')') {
        this.advance();
        return { type: 'RPAREN' };
      }

      if (this.currentChar === '[') {
        this.advance();
        return { type: 'LBRACKET' };
      }

      if (this.currentChar === ']') {
        this.advance();
        return { type: 'RBRACKET' };
      }

      if (this.currentChar === '{') {
        this.advance();
        return { type: 'LBRACE' };
      }

      if (this.currentChar === '}') {
        this.advance();
        return { type: 'RBRACE' };
      }

      if (this.currentChar === ',') {
        this.advance();
        return { type: 'COMMA' };
      }

      if (this.currentChar === ':') {
        this.advance();
        return { type: 'COLON' };
      }

      if (this.currentChar === '.') {
        this.advance();
        return { type: 'DOT' };
      }

      if (this.currentChar === '\n') {
        this.advance();
        return { type: 'NEWLINE' };
      }

      throw new Error(`Unknown character: ${this.currentChar} at line ${this.line}, column ${this.column}`);
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
      throw new Error(`Expected ${tokenType}, got ${this.currentToken.type} at line ${this.lexer.line}`);
    }
  }

  skipNewlines() {
    while (this.currentToken.type === 'NEWLINE') {
      this.eat('NEWLINE');
    }
  }

  // Primary expressions: numbers, strings, booleans, null, variables, arrays, objects, function calls
  primary() {
    const token = this.currentToken;

    if (token.type === 'NUMBER') {
      this.eat('NUMBER');
      return { type: 'Number', value: token.value };
    }

    if (token.type === 'STRING') {
      this.eat('STRING');
      return { type: 'String', value: token.value };
    }

    if (token.type === 'TRUE') {
      this.eat('TRUE');
      return { type: 'Boolean', value: true };
    }

    if (token.type === 'FALSE') {
      this.eat('FALSE');
      return { type: 'Boolean', value: false };
    }

    if (token.type === 'NULL') {
      this.eat('NULL');
      return { type: 'Null', value: null };
    }

    if (token.type === 'ID') {
      const name = token.value;
      this.eat('ID');

      // Function call
      if (this.currentToken.type === 'LPAREN') {
        this.eat('LPAREN');
        const args = [];

        if (this.currentToken.type !== 'RPAREN') {
          args.push(this.expression());
          while (this.currentToken.type === 'COMMA') {
            this.eat('COMMA');
            args.push(this.expression());
          }
        }

        this.eat('RPAREN');
        return { type: 'FunctionCall', name, arguments: args };
      }

      // Array/Object access
      if (this.currentToken.type === 'LBRACKET') {
        this.eat('LBRACKET');
        const index = this.expression();
        this.eat('RBRACKET');
        return { type: 'IndexAccess', object: { type: 'Variable', name }, index };
      }

      // Property access
      if (this.currentToken.type === 'DOT') {
        this.eat('DOT');
        const property = this.currentToken.value;
        this.eat('ID');
        return { type: 'PropertyAccess', object: { type: 'Variable', name }, property };
      }

      return { type: 'Variable', name };
    }

    // Array literal
    if (token.type === 'LBRACKET') {
      this.eat('LBRACKET');
      const elements = [];

      if (this.currentToken.type !== 'RBRACKET') {
        elements.push(this.expression());
        while (this.currentToken.type === 'COMMA') {
          this.eat('COMMA');
          if (this.currentToken.type === 'RBRACKET') break; // trailing comma
          elements.push(this.expression());
        }
      }

      this.eat('RBRACKET');
      return { type: 'Array', elements };
    }

    // Object literal
    if (token.type === 'LBRACE') {
      this.eat('LBRACE');
      const properties = [];

      this.skipNewlines();

      if (this.currentToken.type !== 'RBRACE') {
        // Parse key: value pairs
        const key = this.currentToken.value;
        this.eat('ID');
        this.eat('COLON');
        const value = this.expression();
        properties.push({ key, value });

        while (this.currentToken.type === 'COMMA') {
          this.eat('COMMA');
          this.skipNewlines();
          if (this.currentToken.type === 'RBRACE') break; // trailing comma

          const key = this.currentToken.value;
          this.eat('ID');
          this.eat('COLON');
          const value = this.expression();
          properties.push({ key, value });
        }
      }

      this.skipNewlines();
      this.eat('RBRACE');
      return { type: 'Object', properties };
    }

    // Parenthesized expression
    if (token.type === 'LPAREN') {
      this.eat('LPAREN');
      const node = this.expression();
      this.eat('RPAREN');
      return node;
    }

    // Unary operators
    if (token.type === 'NOT_OP' || token.type === 'NOT') {
      this.eat(token.type);
      return { type: 'UnaryOp', op: '!', operand: this.primary() };
    }

    if (token.type === 'MINUS') {
      this.eat('MINUS');
      return { type: 'UnaryOp', op: '-', operand: this.primary() };
    }

    throw new Error(`Unexpected token: ${token.type} at line ${this.lexer.line}`);
  }

  // Multiplication, division, modulo
  term() {
    let node = this.primary();

    while (['MUL', 'DIV', 'MOD'].includes(this.currentToken.type)) {
      const opMap = { 'MUL': '*', 'DIV': '/', 'MOD': '%' };
      const op = opMap[this.currentToken.type];
      this.eat(this.currentToken.type);
      node = {
        type: 'BinaryOp',
        op,
        left: node,
        right: this.primary()
      };
    }

    return node;
  }

  // Addition, subtraction
  arithmetic() {
    let node = this.term();

    while (['PLUS', 'MINUS'].includes(this.currentToken.type)) {
      const opMap = { 'PLUS': '+', 'MINUS': '-' };
      const op = opMap[this.currentToken.type];
      this.eat(this.currentToken.type);
      node = {
        type: 'BinaryOp',
        op,
        left: node,
        right: this.term()
      };
    }

    return node;
  }

  // Comparison operators
  comparison() {
    let node = this.arithmetic();

    while (['LT', 'GT', 'LE', 'GE', 'EQ', 'NE'].includes(this.currentToken.type)) {
      const opMap = { 'LT': '<', 'GT': '>', 'LE': '<=', 'GE': '>=', 'EQ': '==', 'NE': '!=' };
      const op = opMap[this.currentToken.type];
      this.eat(this.currentToken.type);
      node = {
        type: 'BinaryOp',
        op,
        left: node,
        right: this.arithmetic()
      };
    }

    return node;
  }

  // Logical AND
  logicalAnd() {
    let node = this.comparison();

    while (this.currentToken.type === 'AND' || this.currentToken.type === 'AND_OP') {
      this.eat(this.currentToken.type);
      node = {
        type: 'BinaryOp',
        op: '&&',
        left: node,
        right: this.comparison()
      };
    }

    return node;
  }

  // Logical OR
  logicalOr() {
    let node = this.logicalAnd();

    while (this.currentToken.type === 'OR' || this.currentToken.type === 'OR_OP') {
      this.eat(this.currentToken.type);
      node = {
        type: 'BinaryOp',
        op: '||',
        left: node,
        right: this.logicalAnd()
      };
    }

    return node;
  }

  // Main expression entry point
  expression() {
    return this.logicalOr();
  }

  // Block of statements
  block() {
    this.skipNewlines();
    this.eat('LBRACE');
    this.skipNewlines();

    const statements = [];

    while (this.currentToken.type !== 'RBRACE' && this.currentToken.type !== 'EOF') {
      if (this.currentToken.type === 'NEWLINE') {
        this.eat('NEWLINE');
        continue;
      }
      const stmt = this.statement();
      if (stmt) statements.push(stmt);
    }

    this.skipNewlines();
    this.eat('RBRACE');
    return statements;
  }

  // Individual statement
  statement() {
    // Variable declaration: sathi yo ho x = 10
    if (this.currentToken.type === 'SATHI') {
      this.eat('SATHI');

      // Print: sathi bhana(...)
      if (this.currentToken.type === 'BHANA') {
        this.eat('BHANA');
        this.eat('LPAREN');
        const expr = this.expression();
        this.eat('RPAREN');
        return { type: 'Print', value: expr };
      }

      // Variable: sathi yo ho x = 10
      if (this.currentToken.type === 'YO') {
        this.eat('YO');
        this.eat('HO');
        const varName = this.currentToken.value;
        this.eat('ID');
        this.eat('ASSIGN');
        const expr = this.expression();
        return { type: 'Assignment', name: varName, value: expr };
      }

      throw new Error(`Expected BHANA or YO after SATHI at line ${this.lexer.line}`);
    }

    // If statement: sathi yadi (condition) { ... }
    if (this.currentToken.type === 'IF') {
      this.eat('IF');
      this.eat('LPAREN');
      const condition = this.expression();
      this.eat('RPAREN');
      const thenBlock = this.block();

      let elseBlock = null;
      this.skipNewlines();
      if (this.currentToken.type === 'ELSE') {
        this.eat('ELSE');
        elseBlock = this.block();
      }

      return { type: 'If', condition, thenBlock, elseBlock };
    }

    // While loop: sathi jaba (condition) { ... }
    if (this.currentToken.type === 'WHILE') {
      this.eat('WHILE');
      this.eat('LPAREN');
      const condition = this.expression();
      this.eat('RPAREN');
      const body = this.block();
      return { type: 'While', condition, body };
    }

    // For loop: sathi prawahit (i dekhi 0 samma 10 kadam 1) { ... }
    if (this.currentToken.type === 'FOR') {
      this.eat('FOR');
      this.eat('LPAREN');

      const varName = this.currentToken.value;
      this.eat('ID');
      this.eat('FROM');
      const start = this.expression();
      this.eat('TO');
      const end = this.expression();

      let step = { type: 'Number', value: 1 };
      if (this.currentToken.type === 'STEP') {
        this.eat('STEP');
        step = this.expression();
      }

      this.eat('RPAREN');
      const body = this.block();

      return { type: 'For', variable: varName, start, end, step, body };
    }

    // Function definition: sathi kaam functionName(param1, param2) { ... }
    if (this.currentToken.type === 'FUNCTION') {
      this.eat('FUNCTION');
      const funcName = this.currentToken.value;
      this.eat('ID');
      this.eat('LPAREN');

      const params = [];
      if (this.currentToken.type !== 'RPAREN') {
        params.push(this.currentToken.value);
        this.eat('ID');
        while (this.currentToken.type === 'COMMA') {
          this.eat('COMMA');
          params.push(this.currentToken.value);
          this.eat('ID');
        }
      }

      this.eat('RPAREN');
      const body = this.block();

      return { type: 'FunctionDef', name: funcName, params, body };
    }

    // Return statement: sathi firta expression
    if (this.currentToken.type === 'RETURN') {
      this.eat('RETURN');
      let value = null;
      if (this.currentToken.type !== 'NEWLINE' && this.currentToken.type !== 'EOF') {
        value = this.expression();
      }
      return { type: 'Return', value };
    }

    // Break statement
    if (this.currentToken.type === 'BREAK') {
      this.eat('BREAK');
      return { type: 'Break' };
    }

    // Continue statement
    if (this.currentToken.type === 'CONTINUE') {
      this.eat('CONTINUE');
      return { type: 'Continue' };
    }

    // Try-catch: sathi pryas { ... } samatan (error) { ... }
    if (this.currentToken.type === 'TRY') {
      this.eat('TRY');
      const tryBlock = this.block();

      this.skipNewlines();
      this.eat('CATCH');
      this.eat('LPAREN');
      const errorVar = this.currentToken.value;
      this.eat('ID');
      this.eat('RPAREN');
      const catchBlock = this.block();

      return { type: 'TryCatch', tryBlock, errorVar, catchBlock };
    }

    // Assignment to existing variable: x = 20
    if (this.currentToken.type === 'ID') {
      const name = this.currentToken.value;
      this.eat('ID');

      // Array/Object index assignment: arr[0] = value
      if (this.currentToken.type === 'LBRACKET') {
        this.eat('LBRACKET');
        const index = this.expression();
        this.eat('RBRACKET');
        this.eat('ASSIGN');
        const value = this.expression();
        return { type: 'IndexAssignment', object: name, index, value };
      }

      // Property assignment: obj.prop = value
      if (this.currentToken.type === 'DOT') {
        this.eat('DOT');
        const property = this.currentToken.value;
        this.eat('ID');
        this.eat('ASSIGN');
        const value = this.expression();
        return { type: 'PropertyAssignment', object: name, property, value };
      }

      // Regular assignment
      if (this.currentToken.type === 'ASSIGN') {
        this.eat('ASSIGN');
        const value = this.expression();
        return { type: 'Reassignment', name, value };
      }

      // Function call as statement
      if (this.currentToken.type === 'LPAREN') {
        this.eat('LPAREN');
        const args = [];

        if (this.currentToken.type !== 'RPAREN') {
          args.push(this.expression());
          while (this.currentToken.type === 'COMMA') {
            this.eat('COMMA');
            args.push(this.expression());
          }
        }

        this.eat('RPAREN');
        return { type: 'FunctionCall', name, arguments: args };
      }

      throw new Error(`Unexpected token after identifier at line ${this.lexer.line}`);
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

class BreakException extends Error {
  constructor() {
    super('Break');
    this.name = 'BreakException';
  }
}

class ContinueException extends Error {
  constructor() {
    super('Continue');
    this.name = 'ContinueException';
  }
}

class ReturnException extends Error {
  constructor(value) {
    super('Return');
    this.name = 'ReturnException';
    this.value = value;
  }
}

class Interpreter {
  constructor() {
    this.globalScope = {};
    this.scopes = [this.globalScope];
    this.output = [];
    this.functions = {};

    // Built-in functions
    this.builtins = {
      // Type conversion
      sankhya: (val) => Number(val),           // to number
      shabda: (val) => String(val),            // to string
      tathya: (val) => Boolean(val),           // to boolean

      // String operations
      lambai: (str) => String(str).length,     // length
      upari: (str) => String(str).toUpperCase(), // uppercase
      tala: (str) => String(str).toLowerCase(),  // lowercase
      khojne: (str, substr) => String(str).indexOf(String(substr)), // find
      kaatne: (str, start, end) => String(str).slice(start, end), // slice
      jodne: (...args) => args.join(''),       // join/concat

      // Array operations
      thapaune: (arr, ...items) => { arr.push(...items); return arr; }, // push
      hataune: (arr) => arr.pop(),             // pop
      prapt: (arr, index) => arr[index],       // get
      sthapana: (arr, index, val) => { arr[index] = val; return arr; }, // set

      // Math operations
      gol: (num) => Math.round(num),           // round
      mathi: (num) => Math.ceil(num),          // ceil
      tala_math: (num) => Math.floor(num),     // floor
      mutlak: (num) => Math.abs(num),          // abs
      shakti: (base, exp) => Math.pow(base, exp), // power
      vargamul: (num) => Math.sqrt(num),       // sqrt
      yaksyamsh: (num) => Math.random() * (num || 1), // random

      // Utility
      prakar: (val) => typeof val,             // typeof
      thulo: (...args) => Math.max(...args),   // max
      sano: (...args) => Math.min(...args),    // min

      // I/O (already have bhana for print)
      padhne: () => {                          // read (simplified - returns empty string)
        // In a real implementation, this would read from stdin
        return '';
      },
    };
  }

  currentScope() {
    return this.scopes[this.scopes.length - 1];
  }

  pushScope() {
    this.scopes.push({});
  }

  popScope() {
    this.scopes.pop();
  }

  getVariable(name) {
    // Search from innermost to outermost scope
    for (let i = this.scopes.length - 1; i >= 0; i--) {
      if (name in this.scopes[i]) {
        return this.scopes[i][name];
      }
    }
    throw new Error(`Undefined variable: ${name}`);
  }

  setVariable(name, value) {
    // Set in current scope
    this.currentScope()[name] = value;
  }

  updateVariable(name, value) {
    // Update existing variable in its scope
    for (let i = this.scopes.length - 1; i >= 0; i--) {
      if (name in this.scopes[i]) {
        this.scopes[i][name] = value;
        return;
      }
    }
    throw new Error(`Cannot reassign undefined variable: ${name}`);
  }

  visit(node) {
    // Literals
    if (node.type === 'Number') {
      return node.value;
    }

    if (node.type === 'String') {
      return node.value;
    }

    if (node.type === 'Boolean') {
      return node.value;
    }

    if (node.type === 'Null') {
      return null;
    }

    // Variables
    if (node.type === 'Variable') {
      return this.getVariable(node.name);
    }

    // Arrays
    if (node.type === 'Array') {
      return node.elements.map(el => this.visit(el));
    }

    // Objects
    if (node.type === 'Object') {
      const obj = {};
      for (const prop of node.properties) {
        obj[prop.key] = this.visit(prop.value);
      }
      return obj;
    }

    // Binary operations
    if (node.type === 'BinaryOp') {
      const left = this.visit(node.left);
      const right = this.visit(node.right);

      switch (node.op) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/':
          if (right === 0) throw new Error('Division by zero');
          return left / right;
        case '%': return left % right;
        case '<': return left < right;
        case '>': return left > right;
        case '<=': return left <= right;
        case '>=': return left >= right;
        case '==': return left == right;
        case '!=': return left != right;
        case '&&': return left && right;
        case '||': return left || right;
        default:
          throw new Error(`Unknown operator: ${node.op}`);
      }
    }

    // Unary operations
    if (node.type === 'UnaryOp') {
      const operand = this.visit(node.operand);
      switch (node.op) {
        case '!': return !operand;
        case '-': return -operand;
        default:
          throw new Error(`Unknown unary operator: ${node.op}`);
      }
    }

    // Assignment
    if (node.type === 'Assignment') {
      const value = this.visit(node.value);
      this.setVariable(node.name, value);
      return null;
    }

    // Reassignment
    if (node.type === 'Reassignment') {
      const value = this.visit(node.value);
      this.updateVariable(node.name, value);
      return null;
    }

    // Index access
    if (node.type === 'IndexAccess') {
      const obj = this.visit(node.object);
      const index = this.visit(node.index);
      return obj[index];
    }

    // Index assignment
    if (node.type === 'IndexAssignment') {
      const obj = this.getVariable(node.object);
      const index = this.visit(node.index);
      const value = this.visit(node.value);
      obj[index] = value;
      return null;
    }

    // Property access
    if (node.type === 'PropertyAccess') {
      const obj = this.visit(node.object);
      return obj[node.property];
    }

    // Property assignment
    if (node.type === 'PropertyAssignment') {
      const obj = this.getVariable(node.object);
      const value = this.visit(node.value);
      obj[node.property] = value;
      return null;
    }

    // Print
    if (node.type === 'Print') {
      const value = this.visit(node.value);
      this.output.push(value);
      return null;
    }

    // If statement
    if (node.type === 'If') {
      const condition = this.visit(node.condition);
      if (condition) {
        return this.executeBlock(node.thenBlock);
      } else if (node.elseBlock) {
        return this.executeBlock(node.elseBlock);
      }
      return null;
    }

    // While loop
    if (node.type === 'While') {
      try {
        while (this.visit(node.condition)) {
          try {
            this.executeBlock(node.body);
          } catch (e) {
            if (e instanceof ContinueException) {
              continue;
            } else if (e instanceof BreakException) {
              break;
            } else {
              throw e;
            }
          }
        }
      } catch (e) {
        if (!(e instanceof BreakException)) {
          throw e;
        }
      }
      return null;
    }

    // For loop
    if (node.type === 'For') {
      const start = this.visit(node.start);
      const end = this.visit(node.end);
      const step = this.visit(node.step);

      this.pushScope();
      try {
        for (let i = start; step > 0 ? i < end : i > end; i += step) {
          this.setVariable(node.variable, i);
          try {
            this.executeBlock(node.body);
          } catch (e) {
            if (e instanceof ContinueException) {
              continue;
            } else if (e instanceof BreakException) {
              break;
            } else {
              throw e;
            }
          }
        }
      } finally {
        this.popScope();
      }
      return null;
    }

    // Function definition
    if (node.type === 'FunctionDef') {
      this.functions[node.name] = {
        params: node.params,
        body: node.body
      };
      return null;
    }

    // Function call
    if (node.type === 'FunctionCall') {
      // Check built-in functions first
      if (node.name in this.builtins) {
        const args = node.arguments.map(arg => this.visit(arg));
        return this.builtins[node.name](...args);
      }

      // User-defined function
      if (!(node.name in this.functions)) {
        throw new Error(`Undefined function: ${node.name}`);
      }

      const func = this.functions[node.name];
      const args = node.arguments.map(arg => this.visit(arg));

      if (args.length !== func.params.length) {
        throw new Error(`Function ${node.name} expects ${func.params.length} arguments, got ${args.length}`);
      }

      // Create new scope for function
      this.pushScope();
      try {
        // Bind parameters
        for (let i = 0; i < func.params.length; i++) {
          this.setVariable(func.params[i], args[i]);
        }

        // Execute function body
        this.executeBlock(func.body);
        return null; // No explicit return
      } catch (e) {
        if (e instanceof ReturnException) {
          return e.value;
        }
        throw e;
      } finally {
        this.popScope();
      }
    }

    // Return statement
    if (node.type === 'Return') {
      const value = node.value ? this.visit(node.value) : null;
      throw new ReturnException(value);
    }

    // Break statement
    if (node.type === 'Break') {
      throw new BreakException();
    }

    // Continue statement
    if (node.type === 'Continue') {
      throw new ContinueException();
    }

    // Try-catch
    if (node.type === 'TryCatch') {
      try {
        this.executeBlock(node.tryBlock);
      } catch (e) {
        this.pushScope();
        try {
          this.setVariable(node.errorVar, e.message || String(e));
          this.executeBlock(node.catchBlock);
        } finally {
          this.popScope();
        }
      }
      return null;
    }

    throw new Error(`Unknown node type: ${node.type}`);
  }

  executeBlock(statements) {
    for (const stmt of statements) {
      this.visit(stmt);
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
    result.output.forEach(line => {
      console.log(line);
    });
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
    console.log("  node sathi.js <filename.sathi>  - Run a .sathi file");
    console.log("\nExample:");
    console.log("  node sathi.js program.sathi");
    process.exit(0);
  } else {
    runSathiFile(args[0]);
  }

}

// Export for use as a module
module.exports = { runSathi, runSathiFile };