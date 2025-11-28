// Safe expression parser - no eval()
// Supports: +, -, *, /, %, ^, sqrt, sin, cos, tan, log, ln, factorial, parentheses

export type CalculatorMode = 'basic' | 'scientific';

export interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

// Tokenize expression
function tokenize(expr: string): string[] {
  const tokens: string[] = [];
  let current = '';
  
  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];
    
    if (char === ' ') continue;
    
    // Check for multi-char operators/functions
    if (/[a-z]/i.test(char)) {
      current += char;
      continue;
    }
    
    if (current) {
      tokens.push(current);
      current = '';
    }
    
    // Handle negative numbers at start or after operator/open paren
    if (char === '-' && (tokens.length === 0 || /[+\-*/^(]/.test(tokens[tokens.length - 1]))) {
      current = '-';
      continue;
    }
    
    if (/[\d.]/.test(char)) {
      current += char;
    } else if (/[+\-*/^%()!]/.test(char)) {
      if (current) {
        tokens.push(current);
        current = '';
      }
      tokens.push(char);
    }
  }
  
  if (current) tokens.push(current);
  
  return tokens;
}

// Factorial function
function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity;
  if (!Number.isInteger(n)) return NaN;
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Convert to radians
export function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Convert to degrees
export function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

// Shunting yard algorithm for parsing
function shuntingYard(tokens: string[], useDegrees: boolean): (string | number)[] {
  const output: (string | number)[] = [];
  const operators: string[] = [];
  
  const precedence: Record<string, number> = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '%': 2,
    '^': 3,
  };
  
  const rightAssociative = new Set(['^']);
  const functions = new Set(['sin', 'cos', 'tan', 'sqrt', 'log', 'ln', 'abs']);
  
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    
    // Number
    if (!isNaN(parseFloat(token))) {
      output.push(parseFloat(token));
    }
    // π constant
    else if (token === 'π' || token.toLowerCase() === 'pi') {
      output.push(Math.PI);
    }
    // e constant
    else if (token.toLowerCase() === 'e' && !functions.has(token.toLowerCase())) {
      output.push(Math.E);
    }
    // Function
    else if (functions.has(token.toLowerCase())) {
      operators.push(token.toLowerCase());
    }
    // Factorial (postfix)
    else if (token === '!') {
      output.push('!');
    }
    // Operator
    else if (token in precedence) {
      while (
        operators.length > 0 &&
        operators[operators.length - 1] !== '(' &&
        (precedence[operators[operators.length - 1]] > precedence[token] ||
          (precedence[operators[operators.length - 1]] === precedence[token] &&
            !rightAssociative.has(token)))
      ) {
        output.push(operators.pop()!);
      }
      operators.push(token);
    }
    // Left parenthesis
    else if (token === '(') {
      operators.push(token);
    }
    // Right parenthesis
    else if (token === ')') {
      while (operators.length > 0 && operators[operators.length - 1] !== '(') {
        output.push(operators.pop()!);
      }
      if (operators.length > 0 && operators[operators.length - 1] === '(') {
        operators.pop();
      }
      // Check if there's a function before the parenthesis
      if (operators.length > 0 && functions.has(operators[operators.length - 1])) {
        output.push(operators.pop()!);
      }
    }
  }
  
  while (operators.length > 0) {
    output.push(operators.pop()!);
  }
  
  return output;
}

// Evaluate RPN
function evaluateRPN(rpn: (string | number)[], useDegrees: boolean): number {
  const stack: number[] = [];
  
  for (const token of rpn) {
    if (typeof token === 'number') {
      stack.push(token);
    } else {
      switch (token) {
        case '+':
          if (stack.length < 2) throw new Error('Invalid expression');
          stack.push(stack.pop()! + stack.pop()!);
          break;
        case '-':
          if (stack.length < 2) throw new Error('Invalid expression');
          const b = stack.pop()!;
          const a = stack.pop()!;
          stack.push(a - b);
          break;
        case '*':
          if (stack.length < 2) throw new Error('Invalid expression');
          stack.push(stack.pop()! * stack.pop()!);
          break;
        case '/':
          if (stack.length < 2) throw new Error('Invalid expression');
          const divisor = stack.pop()!;
          const dividend = stack.pop()!;
          if (divisor === 0) throw new Error('Division by zero');
          stack.push(dividend / divisor);
          break;
        case '%':
          if (stack.length < 2) throw new Error('Invalid expression');
          const mod = stack.pop()!;
          const num = stack.pop()!;
          stack.push(num % mod);
          break;
        case '^':
          if (stack.length < 2) throw new Error('Invalid expression');
          const exp = stack.pop()!;
          const base = stack.pop()!;
          stack.push(Math.pow(base, exp));
          break;
        case '!':
          if (stack.length < 1) throw new Error('Invalid expression');
          stack.push(factorial(stack.pop()!));
          break;
        case 'sin':
          if (stack.length < 1) throw new Error('Invalid expression');
          const sinVal = stack.pop()!;
          stack.push(Math.sin(useDegrees ? toRadians(sinVal) : sinVal));
          break;
        case 'cos':
          if (stack.length < 1) throw new Error('Invalid expression');
          const cosVal = stack.pop()!;
          stack.push(Math.cos(useDegrees ? toRadians(cosVal) : cosVal));
          break;
        case 'tan':
          if (stack.length < 1) throw new Error('Invalid expression');
          const tanVal = stack.pop()!;
          stack.push(Math.tan(useDegrees ? toRadians(tanVal) : tanVal));
          break;
        case 'sqrt':
          if (stack.length < 1) throw new Error('Invalid expression');
          const sqrtVal = stack.pop()!;
          if (sqrtVal < 0) throw new Error('Invalid input');
          stack.push(Math.sqrt(sqrtVal));
          break;
        case 'log':
          if (stack.length < 1) throw new Error('Invalid expression');
          const logVal = stack.pop()!;
          if (logVal <= 0) throw new Error('Invalid input');
          stack.push(Math.log10(logVal));
          break;
        case 'ln':
          if (stack.length < 1) throw new Error('Invalid expression');
          const lnVal = stack.pop()!;
          if (lnVal <= 0) throw new Error('Invalid input');
          stack.push(Math.log(lnVal));
          break;
        case 'abs':
          if (stack.length < 1) throw new Error('Invalid expression');
          stack.push(Math.abs(stack.pop()!));
          break;
        default:
          throw new Error(`Unknown operator: ${token}`);
      }
    }
  }
  
  if (stack.length !== 1) throw new Error('Invalid expression');
  return stack[0];
}

// Main calculate function
export function calculate(expression: string, useDegrees: boolean = true): string {
  try {
    // Clean up expression
    let cleanExpr = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/\s+/g, '');
    
    // Handle percentage at end (e.g., "100+10%" becomes "100+100*0.1")
    cleanExpr = cleanExpr.replace(/(\d+)%/g, '($1/100)');
    
    const tokens = tokenize(cleanExpr);
    if (tokens.length === 0) return '0';
    
    const rpn = shuntingYard(tokens, useDegrees);
    const result = evaluateRPN(rpn, useDegrees);
    
    // Format result
    if (!isFinite(result)) {
      if (isNaN(result)) return 'Error';
      return result > 0 ? '∞' : '-∞';
    }
    
    // Round to avoid floating point errors
    const rounded = Math.round(result * 1e12) / 1e12;
    
    // Format with appropriate precision
    if (Math.abs(rounded) >= 1e10 || (Math.abs(rounded) < 1e-6 && rounded !== 0)) {
      return rounded.toExponential(6);
    }
    
    // Remove trailing zeros after decimal
    return rounded.toString();
  } catch (error) {
    return 'Error';
  }
}

// Format display number
export function formatDisplay(value: string): string {
  if (value === 'Error' || value === '∞' || value === '-∞') return value;
  
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  
  // Add thousand separators for display
  const parts = value.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return parts.join('.');
}

// Generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
