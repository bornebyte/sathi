# Sathi Programming Language 🇳🇵

**Sathi** (साथि) is a Nepali word that means "friend". This is a feature-rich, interpreted programming language built with JavaScript, designed to be both friendly and powerful. It demonstrates a complete language implementation with:

-   **Lexer**: Tokenizes source code with comprehensive operator support
-   **Parser**: Builds Abstract Syntax Trees (AST) with full language grammar
-   **Interpreter**: Executes code with scope management, control flow, and error handling

## 🌟 Features

### Core Language Features
-   ✅ Variables (declaration and reassignment)
-   ✅ Data types: Numbers, Strings, Booleans, Null, Arrays, Objects
-   ✅ Arithmetic operators: `+`, `-`, `*`, `/`, `%`
-   ✅ Comparison operators: `<`, `>`, `<=`, `>=`, `==`, `!=`
-   ✅ Logical operators: `&&` (and), `||` (or), `!` (not)
-   ✅ Conditionals: `if-else` statements
-   ✅ Loops: `while` and `for` loops with `break` and `continue`
-   ✅ Functions: User-defined functions with parameters and return values
-   ✅ Arrays with indexing and manipulation
-   ✅ Objects with property access and assignment
-   ✅ Error handling: `try-catch` blocks
-   ✅ Comments: Single-line comments with `#`
-   ✅ 20+ built-in functions for common operations

## 📖 Syntax Overview

The language uses Nepali-inspired keywords. Most statements are prefixed with `sathi` (friend).

### Comments
```sathi
# This is a single-line comment
```

### Variables

#### Declaration
Use `sathi yo ho` to declare variables:
```sathi
sathi yo ho x = 10
sathi yo ho name = "Ram"
sathi yo ho isActive = satya  # true
sathi yo ho nothing = khali    # null
```

#### Reassignment
```sathi
x = 20
name = "Sita"
```

### Data Types

#### Numbers
```sathi
sathi yo ho integer = 42
sathi yo ho decimal = 3.14
sathi yo ho negative = -10
```

#### Strings
Strings support single or double quotes and escape sequences:
```sathi
sathi yo ho greeting = "Namaste!"
sathi yo ho message = 'Hello\nWorld'  # \n for newline
sathi yo ho path = "C:\\Users\\Name"  # \\ for backslash
```

#### Booleans
```sathi
sathi yo ho isTrue = satya    # true
sathi yo ho isFalse = asatya  # false
```

#### Arrays
```sathi
sathi yo ho numbers = [1, 2, 3, 4, 5]
sathi yo ho mixed = [42, "text", satya, [1, 2]]
sathi bhana(numbers[0])  # Access by index
numbers[2] = 99          # Modify by index
```

#### Objects
```sathi
sathi yo ho person = {name: "Ram", age: 25, city: "Kathmandu"}
sathi bhana(person.name)  # Property access
person.age = 26           # Property modification
```

### Operators

#### Arithmetic
```sathi
sathi yo ho sum = 10 + 5      # 15
sathi yo ho diff = 10 - 5     # 5
sathi yo ho product = 10 * 5  # 50
sathi yo ho quotient = 10 / 5 # 2
sathi yo ho remainder = 10 % 3 # 1
```

#### Comparison
```sathi
sathi yo ho a = 10 > 5    # satya (true)
sathi yo ho b = 10 < 5    # asatya (false)
sathi yo ho c = 10 >= 10  # satya
sathi yo ho d = 10 == 10  # satya
sathi yo ho e = 10 != 5   # satya
```

#### Logical
```sathi
sathi yo ho result1 = satya ra satya    # satya (and)
sathi yo ho result2 = satya wa asatya   # satya (or)
sathi yo ho result3 = hoina satya       # asatya (not)
# Or use && and || operators
sathi yo ho result4 = satya && asatya   # asatya
```

### Control Flow

#### If-Else Statements
```sathi
sathi yo ho age = 18

yadi (age >= 18) {
  sathi bhana("Adult")
} anya {
  sathi bhana("Minor")
}
```

Nested conditionals:
```sathi
yadi (score >= 90) {
  sathi bhana("A")
} anya {
  yadi (score >= 80) {
    sathi bhana("B")
  } anya {
    sathi bhana("C")
  }
}
```

#### While Loops
```sathi
sathi yo ho count = 0
jaba (count < 5) {
  sathi bhana(count)
  count = count + 1
}
```

#### For Loops
Syntax: `prawahit (variable dekhi start samma end kadam step)`
```sathi
# Count from 0 to 9
prawahit (i dekhi 0 samma 10 kadam 1) {
  sathi bhana(i)
}

# Count backwards
prawahit (i dekhi 10 samma 0 kadam -1) {
  sathi bhana(i)
}
```

#### Break and Continue
```sathi
prawahit (i dekhi 0 samma 10 kadam 1) {
  yadi (i == 3) {
    jari  # continue - skip to next iteration
  }
  yadi (i == 7) {
    thodau  # break - exit loop
  }
  sathi bhana(i)
}
```

### Functions

#### Defining Functions
```sathi
sathi kaam greet(name) {
  sathi bhana("Hello")
  sathi bhana(name)
}

sathi kaam add(a, b) {
  sathi firta a + b  # return statement
}
```

#### Calling Functions
```sathi
greet("Sathi")
sathi yo ho sum = add(10, 20)
sathi bhana(sum)
```

#### Recursive Functions
```sathi
sathi kaam factorial(n) {
  yadi (n <= 1) {
    sathi firta 1
  } anya {
    sathi firta n * factorial(n - 1)
  }
}

sathi bhana(factorial(5))  # 120
```

### Error Handling

#### Try-Catch
```sathi
pryas {
  sathi yo ho result = 10 / 0
  sathi bhana(result)
} samatan (error) {
  sathi bhana("An error occurred!")
  sathi bhana(error)
}
```

### Printing Output
Use `sathi bhana()` to print:
```sathi
sathi bhana("Hello, World!")
sathi bhana(42)
sathi bhana(x + y)
```

## 🔧 Built-in Functions

Sathi comes with 20+ built-in functions:

### Type Conversion
- `sankhya(value)` - Convert to number
- `shabda(value)` - Convert to string
- `tathya(value)` - Convert to boolean
- `prakar(value)` - Get typeof value

### String Operations
- `lambai(str)` - Get string/array length
- `upari(str)` - Convert to uppercase
- `tala(str)` - Convert to lowercase
- `khojne(str, substr)` - Find substring index
- `kaatne(str, start, end)` - Slice string
- `jodne(str1, str2, ...)` - Join/concatenate strings

### Array Operations
- `thapaune(arr, item, ...)` - Push items to array
- `hataune(arr)` - Pop item from array
- `prapt(arr, index)` - Get element at index
- `sthapana(arr, index, value)` - Set element at index

### Math Operations
- `gol(num)` - Round number
- `mathi(num)` - Ceiling
- `tala_math(num)` - Floor
- `mutlak(num)` - Absolute value
- `shakti(base, exp)` - Power (base^exp)
- `vargamul(num)` - Square root
- `yaksyamsh(num)` - Random number (0 to num)
- `thulo(...nums)` - Maximum value
- `sano(...nums)` - Minimum value

### Examples
```sathi
sathi bhana(thulo(10, 20, 5, 30))     # 30
sathi bhana(sano(10, 20, 5, 30))      # 5
sathi bhana(shakti(2, 10))            # 1024
sathi bhana(vargamul(144))            # 12
sathi bhana(upari("namaste"))         # "NAMASTE"
sathi bhana(lambai("Sathi"))          # 5
sathi bhana(jodne("Hello", " ", "World"))  # "Hello World"
```

## 🗂️ Keywords Reference

| Nepali | English | Usage |
|--------|---------|-------|
| `sathi` | friend | Statement prefix |
| `yo ho` | this is | Variable declaration |
| `bhana` | say/print | Output to console |
| `yadi` | if | Conditional statement |
| `anya` | else | Alternative branch |
| `jaba` | while | While loop |
| `prawahit` | iterate | For loop |
| `dekhi` | from | Loop start |
| `samma` | to | Loop end |
| `kadam` | step | Loop increment |
| `kaam` | work/function | Function definition |
| `firta` | return | Return value |
| `thodau` | break | Exit loop |
| `jari` | continue | Skip iteration |
| `pryas` | try | Try block |
| `samatan` | catch | Catch errors |
| `satya` | true | Boolean true |
| `asatya` | false | Boolean false |
| `khali` | empty/null | Null value |
| `ra` | and | Logical AND |
| `wa` | or | Logical OR |
| `hoina` | not | Logical NOT |

## 🚀 Getting Started

### Prerequisites
- Node.js (v12 or higher)

### Installation & Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bornebyte/sathi.git
   cd sathi
   ```

2. **Create a `.sathi` file:**
   ```sathi
   # hello.sathi
   sathi yo ho message = "Namaste, World!"
   sathi bhana(message)
   
   sathi kaam greet(name) {
     sathi firta jodne("Hello, ", name, "!")
   }
   
   sathi bhana(greet("Sathi"))
   ```

3. **Run your program:**
   ```bash
   node sathi.js hello.sathi
   ```

### Example Program

See [program.sathi](program.sathi) for a comprehensive example showcasing all language features.

## 📝 Example Programs

### Fibonacci Sequence
```sathi
sathi kaam fibonacci(n) {
  yadi (n <= 1) {
    sathi firta n
  } anya {
    sathi firta fibonacci(n - 1) + fibonacci(n - 2)
  }
}

prawahit (i dekhi 0 samma 10 kadam 1) {
  sathi bhana(fibonacci(i))
}
```

### Array Sum
```sathi
sathi yo ho numbers = [1, 2, 3, 4, 5]
sathi yo ho sum = 0
sathi yo ho i = 0

jaba (i < lambai(numbers)) {
  sum = sum + numbers[i]
  i = i + 1
}

sathi bhana(sum)  # 15
```

### Object Manipulation
```sathi
sathi yo ho student = {
  name: "Ram Sharma",
  grade: 85,
  passed: satya
}

sathi bhana(student.name)
student.grade = 90
sathi bhana(student.grade)
```

## 🏗️ Architecture

The Sathi interpreter consists of three main components:

1. **Lexer** - Tokenizes source code into a stream of tokens
2. **Parser** - Builds an Abstract Syntax Tree (AST) from tokens
3. **Interpreter** - Traverses the AST and executes the program

### Error Handling
- Syntax errors with line numbers
- Runtime errors with descriptive messages
- Try-catch for graceful error recovery

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new features
- Improve error messages
- Add more built-in functions
- Write documentation
- Create example programs

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

Built with love for the programming community. Sathi means "friend" in Nepali, and this language aims to be your friendly companion in learning language design and interpreter implementation!

---

**Happy Coding, Sathi! 🇳🇵**
