type Props = {
  topic: string;
  disabled: boolean;
  error: string | null;
  onTopicChange: (value: string) => void;
  onSubmit: () => void;
};

export default function TopicInput({
  topic,
  disabled,
  error,
  onTopicChange,
  onSubmit,
}: Props) {
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex flex-col gap-3">
        <label
          htmlFor="topic"
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-900/40"
        >
          Study Topic
        </label>
        <input
          id="topic"
          name="topic"
          value={topic}
          disabled={disabled}
          onChange={(e) => onTopicChange(e.target.value)}
          placeholder="e.g., Quantum Physics"
          autoComplete="off"
          className="h-12 w-full rounded-xl border border-blue-900/10 bg-blue-900/5 px-4 text-sm text-blue-900 outline-none transition-all placeholder:text-blue-900/30 focus:border-blue-500/50 focus:bg-white focus:ring-4 focus:ring-blue-500/5 disabled:cursor-not-allowed disabled:opacity-50"
        />
        {error ? (
          <div className="px-1 text-xs font-medium text-rose-600">{error}</div>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-blue-900 px-6 text-sm font-bold text-white transition-all hover:bg-blue-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="relative z-10 flex items-center gap-2">
          {disabled ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              Processing...
            </>
          ) : (
            "Analyze Concept"
          )}
        </span>
      </button>
    </form>
  );
}
