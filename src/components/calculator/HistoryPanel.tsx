import { HistoryEntry } from '@/lib/calculator';
import { Clock, Trash2, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface HistoryPanelProps {
  history: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onClear: () => void;
  isOpen: boolean;
}

export function HistoryPanel({ history, onSelect, onClear, isOpen }: HistoryPanelProps) {
  const copyToClipboard = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  if (!isOpen) return null;

  return (
    <div className="animate-slide-up absolute bottom-full left-0 right-0 mb-4 glass-panel max-h-64 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">History</span>
        </div>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
            aria-label="Clear history"
          >
            <Trash2 className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* History list */}
      <div className="overflow-y-auto max-h-48 p-2">
        {history.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm py-8">
            No calculations yet
          </p>
        ) : (
          <ul className="space-y-1">
            {history.map((entry, index) => (
              <li
                key={entry.id}
                onClick={() => onSelect(entry)}
                className={cn(
                  'group p-3 rounded-xl cursor-pointer transition-all duration-200',
                  'hover:bg-muted/50 active:scale-[0.98]',
                  index === 0 && 'animate-fade-in'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground font-mono truncate">
                      {entry.expression}
                    </p>
                    <p className="text-lg font-mono font-semibold text-foreground">
                      = {entry.result}
                    </p>
                  </div>
                  <button
                    onClick={(e) => copyToClipboard(entry.result, e)}
                    className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-muted transition-all"
                    aria-label="Copy result"
                  >
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
