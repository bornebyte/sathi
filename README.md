# Sathi Programming Language

Sathi (साथि) is a Nepali word that means "friend". This project is a simple, interpreted programming language built with JavaScript, designed to be a friendly introduction to the concepts of building a language from scratch.

It demonstrates the core components of a language interpreter:
-   **Lexer**: Converts the source code into a stream of tokens.
-   **Parser**: Builds an Abstract Syntax Tree (AST) from the tokens.
-   **Interpreter**: Executes the code by traversing the AST.

## Features

*   Variable assignment
*   Basic arithmetic operations (`+`, `-`, `*`, `/`)
*   Integer and floating-point numbers
*   Printing output to the console
*   Single-line comments

## Syntax Overview

The language uses a few Nepali-inspired keywords. All statements are prefixed with `sathi`.

### Comments
Comments start with `#`.

```sathi
# This is a comment
```

### Variable Assignment
Use `sathi yo ho` to declare and assign variables.

```sathi
# Syntax: sathi yo ho <variable_name> = <value_or_expression>
sathi yo ho x = 10
sathi yo ho result = x * 5
```

### Printing
Use `sathi bhana()` to print values or results of expressions to the console.

```sathi
# Syntax: sathi bhana(<variable_or_expression>)
sathi bhana(result)
sathi bhana(10 + 20 / 2)
```

## Getting Started

### Prerequisites

You need to have Node.js installed on your machine.

### Installation & Usage

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/bornebyte/sathi.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd sathi
    ```

3.  **Create a file** with the `.sathi` extension (e.g., `program.sathi`) and write your code.

    **`program.sathi`:**
    ```sathi
    # Calculate the area of a rectangle
    sathi yo ho length = 10
    sathi yo ho width = 5.5
    
    sathi yo ho area = length * width
    
    sathi bhana(area)
    ```

4.  **Run the file using the interpreter:**
    ```sh
    node sathi.js program.sathi
    ```

    **Output:**
    ```
    55
    ```