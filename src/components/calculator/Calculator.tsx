import { useState } from 'react';
import { useCalculator } from '@/hooks/useCalculator';
import { Display } from './Display';
import { BasicKeypad } from './BasicKeypad';
import { ScientificKeypad } from './ScientificKeypad';
import { HistoryPanel } from './HistoryPanel';
import { Clock, Copy, FlaskConical, Calculator as CalcIcon, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function Calculator() {
  const {
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
  } = useCalculator();

  const [showHistory, setShowHistory] = useState(false);

  const handleCopyResult = () => {
    copyResult();
    toast.success('Result copied!');
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* History Panel */}
      <HistoryPanel
        history={history}
        onSelect={(entry) => {
          loadFromHistory(entry);
          setShowHistory(false);
        }}
        onClear={clearHistory}
        isOpen={showHistory}
      />

      {/* Main Calculator */}
      <div className="glass-panel p-4 sm:p-6">
        {/* Header with mode toggle */}
        <div className="flex items-center justify-between mb-4">
          {/* Mode Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary/50">
            <button
              onClick={() => setMode('basic')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                mode === 'basic'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              aria-label="Basic mode"
            >
              <CalcIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Basic</span>
            </button>
            <button
              onClick={() => setMode('scientific')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                mode === 'scientific'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              aria-label="Scientific mode"
            >
              <FlaskConical className="w-4 h-4" />
              <span className="hidden sm:inline">Scientific</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyResult}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
              aria-label="Copy result"
            >
              <Copy className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={cn(
                'p-2 rounded-lg transition-all',
                showHistory
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
              aria-label="Toggle history"
            >
              <Clock className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Display */}
        <Display
          value={display}
          expression={expression}
          hasResult={hasResult}
          resultKey={resultKey}
        />

        {/* Keypad */}
        {mode === 'basic' ? (
          <BasicKeypad
            onNumber={appendToDisplay}
            onOperator={appendOperator}
            onClear={clear}
            onAllClear={allClear}
            onToggleSign={toggleSign}
            onPercent={percent}
            onEquals={evaluate}
            onBackspace={backspace}
          />
        ) : (
          <ScientificKeypad
            onNumber={appendToDisplay}
            onOperator={appendOperator}
            onFunction={appendFunction}
            onOpenParen={openParenthesis}
            onCloseParen={closeParenthesis}
            onClear={clear}
            onAllClear={allClear}
            onToggleSign={toggleSign}
            onPercent={percent}
            onEquals={evaluate}
            onBackspace={backspace}
            useDegrees={useDegrees}
            onToggleDegrees={() => setUseDegrees(!useDegrees)}
            onMemoryClear={memoryClear}
            onMemoryRecall={memoryRecall}
            onMemoryAdd={memoryAdd}
            onMemorySubtract={memorySubtract}
            hasMemory={memory !== 0}
          />
        )}

        {/* Keyboard hint */}
        <p className="text-center text-xs text-muted-foreground mt-4 hidden sm:block">
          Tip: Use keyboard for quick input
        </p>
      </div>

      {/* Swipe indicator for mobile */}
      <div className="flex justify-center mt-4 sm:hidden">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <ChevronUp className={cn('w-5 h-5 transition-transform', showHistory && 'rotate-180')} />
          <span className="text-xs">
            {showHistory ? 'Hide' : 'History'}
          </span>
        </button>
      </div>
    </div>
  );
}
