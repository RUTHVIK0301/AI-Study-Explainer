import { RefreshCw } from "lucide-react";

type Props = {
  topic: string;
  explanation: string | null;
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
};

export default function ExplanationCard({
  topic,
  explanation,
  isLoading,
  error,
  onRetry,
}: Props) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-10">
        <div className="space-y-4">
          <div className="h-8 w-1/3 animate-pulse rounded-full bg-blue-900/5" />
          <div className="h-4 w-full animate-pulse rounded-full bg-blue-900/5" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-blue-900/5" />
        </div>
        <div className="space-y-4">
          <div className="h-8 w-1/4 animate-pulse rounded-full bg-blue-900/5" />
          <div className="h-4 w-full animate-pulse rounded-full bg-blue-900/5" />
          <div className="h-4 w-4/6 animate-pulse rounded-full bg-blue-900/5" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-blue-900/5" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-10 text-center">
        <div className="rounded-full bg-rose-50 p-4">
          <RefreshCw className="h-6 w-6 text-rose-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-rose-600">Request Interrupted</h3>
          <p className="max-w-xs text-sm text-rose-900/60">{error}</p>
        </div>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="rounded-full bg-rose-900 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-rose-800"
          >
            Retry Analysis
          </button>
        )}
      </div>
    );
  }

  if (!explanation) {
    return (
      <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
        <div className="space-y-3">
          <div className="text-sm font-semibold tracking-wider text-blue-900/20 uppercase">
            Awaiting Concept
          </div>
          <p className="max-w-[200px] text-xs leading-relaxed text-blue-900/30">
            Enter a topic on the left to generate a deep academic breakdown.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/5 pb-6">
        <div className="space-y-1">
          <div className="text-[10px] font-bold tracking-widest text-blue-500 uppercase">
            Academic Analysis
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
            {topic}
          </h2>
        </div>
      </header>

      <div className="prose prose-slate max-w-none prose-headings:text-blue-900 prose-headings:font-bold prose-p:text-blue-900/80 prose-p:leading-relaxed prose-strong:text-blue-600">
        <div className="whitespace-pre-wrap text-[16px]">
          {explanation}
        </div>
      </div>
    </div>
  );
}
