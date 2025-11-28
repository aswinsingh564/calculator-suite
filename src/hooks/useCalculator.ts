import { useState, useCallback, useEffect } from 'react';
import { calculate, generateId, HistoryEntry, CalculatorMode } from '@/lib/calculator';

const MAX_HISTORY = 10;

export function useCalculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);
  const [hasResult, setHasResult] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [memory, setMemory] = useState<number>(0);
  const [mode, setMode] = useState<CalculatorMode>('basic');
  const [useDegrees, setUseDegrees] = useState(true);
  const [resultKey, setResultKey] = useState(0); // For animation trigger

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('calc-history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistory(parsed.map((h: HistoryEntry) => ({
          ...h,
          timestamp: new Date(h.timestamp)
        })));
      } catch (e) {
        console.error('Failed to load history');
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('calc-history', JSON.stringify(history));
  }, [history]);

  const appendToDisplay = useCallback((value: string) => {
    setDisplay(prev => {
      if (isNewNumber || prev === '0' || prev === 'Error') {
        setIsNewNumber(false);
        setHasResult(false);
        return value === '.' ? '0.' : value;
      }
      // Prevent multiple decimals
      if (value === '.' && prev.includes('.')) return prev;
      // Limit length
      if (prev.length >= 15) return prev;
      return prev + value;
    });
  }, [isNewNumber]);

  const appendOperator = useCallback((op: string) => {
    setExpression(prev => {
      const newExpr = prev + display + op;
      return newExpr;
    });
    setIsNewNumber(true);
    setHasResult(false);
  }, [display]);

  const appendFunction = useCallback((func: string) => {
    // For functions like sin, cos, etc., we add them to expression
    setExpression(prev => prev + func + '(');
    setDisplay('0');
    setIsNewNumber(true);
  }, []);

  const closeParenthesis = useCallback(() => {
    setExpression(prev => prev + display + ')');
    setIsNewNumber(true);
  }, [display]);

  const openParenthesis = useCallback(() => {
    setExpression(prev => prev + '(');
    setIsNewNumber(true);
  }, []);

  const clear = useCallback(() => {
    setDisplay('0');
    setIsNewNumber(true);
  }, []);

  const allClear = useCallback(() => {
    setDisplay('0');
    setExpression('');
    setIsNewNumber(true);
    setHasResult(false);
  }, []);

  const toggleSign = useCallback(() => {
    setDisplay(prev => {
      if (prev === '0' || prev === 'Error') return prev;
      return prev.startsWith('-') ? prev.slice(1) : '-' + prev;
    });
  }, []);

  const percent = useCallback(() => {
    setDisplay(prev => {
      const num = parseFloat(prev);
      if (isNaN(num)) return prev;
      return (num / 100).toString();
    });
  }, []);

  const backspace = useCallback(() => {
    setDisplay(prev => {
      if (prev.length <= 1 || prev === 'Error') return '0';
      return prev.slice(0, -1);
    });
  }, []);

  const evaluate = useCallback(() => {
    const fullExpression = expression + display;
    if (!fullExpression) return;

    const result = calculate(fullExpression, useDegrees);
    
    // Add to history
    const entry: HistoryEntry = {
      id: generateId(),
      expression: fullExpression,
      result,
      timestamp: new Date()
    };
    
    setHistory(prev => [entry, ...prev].slice(0, MAX_HISTORY));
    setDisplay(result);
    setExpression('');
    setIsNewNumber(true);
    setHasResult(true);
    setResultKey(prev => prev + 1); // Trigger animation
  }, [expression, display, useDegrees]);

  // Memory functions
  const memoryClear = useCallback(() => setMemory(0), []);
  const memoryRecall = useCallback(() => {
    setDisplay(memory.toString());
    setIsNewNumber(true);
  }, [memory]);
  const memoryAdd = useCallback(() => {
    setMemory(prev => prev + parseFloat(display) || prev);
  }, [display]);
  const memorySubtract = useCallback(() => {
    setMemory(prev => prev - parseFloat(display) || prev);
  }, [display]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('calc-history');
  }, []);

  const loadFromHistory = useCallback((entry: HistoryEntry) => {
    setDisplay(entry.result);
    setExpression('');
    setIsNewNumber(true);
  }, []);

  const copyResult = useCallback(() => {
    navigator.clipboard.writeText(display);
  }, [display]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default for calculator keys
      if (/^[\d+\-*/.=]$/.test(e.key) || e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Escape') {
        e.preventDefault();
      }

      switch (e.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          appendToDisplay(e.key);
          break;
        case '.':
          appendToDisplay('.');
          break;
        case '+':
          appendOperator('+');
          break;
        case '-':
          appendOperator('−');
          break;
        case '*':
          appendOperator('×');
          break;
        case '/':
          appendOperator('÷');
          break;
        case '=':
        case 'Enter':
          evaluate();
          break;
        case 'Backspace':
          backspace();
          break;
        case 'Escape':
          allClear();
          break;
        case '%':
          percent();
          break;
        case '(':
          openParenthesis();
          break;
        case ')':
          closeParenthesis();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appendToDisplay, appendOperator, evaluate, backspace, allClear, percent, openParenthesis, closeParenthesis]);

  return {
    display,
    expression,
    history,
    memory,
    mode,
    useDegrees,
    hasResult,
    resultKey,
    setMode,
    setUseDegrees,
    appendToDisplay,
    appendOperator,
    appendFunction,
    openParenthesis,
    closeParenthesis,
    clear,
    allClear,
    toggleSign,
    percent,
    backspace,
    evaluate,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
    clearHistory,
    loadFromHistory,
    copyResult,
  };
}
