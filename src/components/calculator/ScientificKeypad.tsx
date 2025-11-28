import { CalcButton } from './CalcButton';

interface ScientificKeypadProps {
  onNumber: (num: string) => void;
  onOperator: (op: string) => void;
  onFunction: (func: string) => void;
  onOpenParen: () => void;
  onCloseParen: () => void;
  onClear: () => void;
  onAllClear: () => void;
  onToggleSign: () => void;
  onPercent: () => void;
  onEquals: () => void;
  onBackspace: () => void;
  useDegrees: boolean;
  onToggleDegrees: () => void;
  onMemoryClear: () => void;
  onMemoryRecall: () => void;
  onMemoryAdd: () => void;
  onMemorySubtract: () => void;
  hasMemory: boolean;
}

export function ScientificKeypad({
  onNumber,
  onOperator,
  onFunction,
  onOpenParen,
  onCloseParen,
  onClear,
  onAllClear,
  onToggleSign,
  onPercent,
  onEquals,
  onBackspace,
  useDegrees,
  onToggleDegrees,
  onMemoryClear,
  onMemoryRecall,
  onMemoryAdd,
  onMemorySubtract,
  hasMemory,
}: ScientificKeypadProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Scientific row 1 - Memory & Mode */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        <CalcButton onClick={onToggleDegrees} variant="function" className="text-sm" ariaLabel={useDegrees ? 'Degrees mode' : 'Radians mode'}>
          {useDegrees ? 'DEG' : 'RAD'}
        </CalcButton>
        <CalcButton onClick={onMemoryClear} variant="function" className="text-sm" ariaLabel="Memory Clear">
          MC
        </CalcButton>
        <CalcButton onClick={onMemoryRecall} variant="function" className={`text-sm ${hasMemory ? 'ring-1 ring-accent' : ''}`} ariaLabel="Memory Recall">
          MR
        </CalcButton>
        <CalcButton onClick={onMemoryAdd} variant="function" className="text-sm" ariaLabel="Memory Add">
          M+
        </CalcButton>
        <CalcButton onClick={onMemorySubtract} variant="function" className="text-sm" ariaLabel="Memory Subtract">
          M−
        </CalcButton>
      </div>

      {/* Scientific row 2 - Functions */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        <CalcButton onClick={onOpenParen} variant="function" ariaLabel="Open Parenthesis">
          (
        </CalcButton>
        <CalcButton onClick={onCloseParen} variant="function" ariaLabel="Close Parenthesis">
          )
        </CalcButton>
        <CalcButton onClick={() => onFunction('sqrt')} variant="function" ariaLabel="Square Root">
          √
        </CalcButton>
        <CalcButton onClick={() => onOperator('^')} variant="function" ariaLabel="Power">
          x<sup className="text-xs">y</sup>
        </CalcButton>
        <CalcButton onClick={() => onOperator('!')} variant="function" ariaLabel="Factorial">
          !
        </CalcButton>
      </div>

      {/* Scientific row 3 - Trig & Log */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        <CalcButton onClick={() => onFunction('sin')} variant="function" className="text-sm" ariaLabel="Sine">
          sin
        </CalcButton>
        <CalcButton onClick={() => onFunction('cos')} variant="function" className="text-sm" ariaLabel="Cosine">
          cos
        </CalcButton>
        <CalcButton onClick={() => onFunction('tan')} variant="function" className="text-sm" ariaLabel="Tangent">
          tan
        </CalcButton>
        <CalcButton onClick={() => onFunction('ln')} variant="function" className="text-sm" ariaLabel="Natural Log">
          ln
        </CalcButton>
        <CalcButton onClick={() => onFunction('log')} variant="function" className="text-sm" ariaLabel="Log Base 10">
          log
        </CalcButton>
      </div>

      {/* Main keypad */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {/* Row 1 */}
        <CalcButton onClick={onAllClear} variant="function" ariaLabel="All Clear">
          AC
        </CalcButton>
        <CalcButton onClick={onToggleSign} variant="function" ariaLabel="Toggle Sign">
          ±
        </CalcButton>
        <CalcButton onClick={onPercent} variant="function" ariaLabel="Percent">
          %
        </CalcButton>
        <CalcButton onClick={() => onOperator('÷')} variant="operator" ariaLabel="Divide">
          ÷
        </CalcButton>

        {/* Row 2 */}
        <CalcButton onClick={() => onNumber('7')} ariaLabel="7">
          7
        </CalcButton>
        <CalcButton onClick={() => onNumber('8')} ariaLabel="8">
          8
        </CalcButton>
        <CalcButton onClick={() => onNumber('9')} ariaLabel="9">
          9
        </CalcButton>
        <CalcButton onClick={() => onOperator('×')} variant="operator" ariaLabel="Multiply">
          ×
        </CalcButton>

        {/* Row 3 */}
        <CalcButton onClick={() => onNumber('4')} ariaLabel="4">
          4
        </CalcButton>
        <CalcButton onClick={() => onNumber('5')} ariaLabel="5">
          5
        </CalcButton>
        <CalcButton onClick={() => onNumber('6')} ariaLabel="6">
          6
        </CalcButton>
        <CalcButton onClick={() => onOperator('−')} variant="operator" ariaLabel="Subtract">
          −
        </CalcButton>

        {/* Row 4 */}
        <CalcButton onClick={() => onNumber('1')} ariaLabel="1">
          1
        </CalcButton>
        <CalcButton onClick={() => onNumber('2')} ariaLabel="2">
          2
        </CalcButton>
        <CalcButton onClick={() => onNumber('3')} ariaLabel="3">
          3
        </CalcButton>
        <CalcButton onClick={() => onOperator('+')} variant="operator" ariaLabel="Add">
          +
        </CalcButton>

        {/* Row 5 */}
        <CalcButton onClick={() => onNumber('0')} span={2} ariaLabel="0">
          0
        </CalcButton>
        <CalcButton onClick={() => onNumber('.')} ariaLabel="Decimal">
          .
        </CalcButton>
        <CalcButton onClick={onEquals} variant="equals" ariaLabel="Equals">
          =
        </CalcButton>
      </div>
    </div>
  );
}
