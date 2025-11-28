import { CalcButton } from './CalcButton';
import { Delete } from 'lucide-react';

interface BasicKeypadProps {
  onNumber: (num: string) => void;
  onOperator: (op: string) => void;
  onClear: () => void;
  onAllClear: () => void;
  onToggleSign: () => void;
  onPercent: () => void;
  onEquals: () => void;
  onBackspace: () => void;
}

export function BasicKeypad({
  onNumber,
  onOperator,
  onClear,
  onAllClear,
  onToggleSign,
  onPercent,
  onEquals,
  onBackspace,
}: BasicKeypadProps) {
  return (
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
  );
}
