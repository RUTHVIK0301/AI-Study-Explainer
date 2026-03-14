"use client";

import { useCallback, useMemo, useState } from "react";
import ExplanationCard from "@/components/ExplanationCard";
import TopicInput from "@/components/TopicInput";

type ExplainResponse =
  | { ok: true; explanation: string }
  | { ok: false; error: { message: string; code?: string } };

const EXAMPLE_TOPICS = [
  "Newton’s Laws",
  "Photosynthesis",
  "Binary Search",
  "World War II",
] as const;

export default function Home() {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    const t = topic.trim();
    return t.length > 0 && !isLoading;
  }, [topic, isLoading]);

  const submit = useCallback(async () => {
    const t = topic.trim();

    if (!t) {
      setInputError("Please enter a topic to continue.");
      setApiError(null);
      setExplanation(null);
      return;
    }

    setIsLoading(true);
    setInputError(null);
    setApiError(null);

    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: t }),
      });

      const data = (await res.json()) as ExplainResponse;
      if (!data.ok) {
        setExplanation(null);
        setApiError(data.error.message || "Something went wrong. Please try again.");
        return;
      }

      setExplanation(data.explanation);
    } catch {
      setExplanation(null);
      setApiError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  return (
    <div className="min-h-dvh bg-[#faf9f6] text-blue-900 selection:bg-blue-200/50">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-blue-50/50 blur-[100px]" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-2">
          <h1 className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-800 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
            AI Study Explainer
          </h1>
          <p className="max-w-2xl text-sm text-blue-800/60 sm:text-base">
            Deep academic insights, simplified for understanding.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <section className="rounded-3xl border border-blue-900/10 bg-white/50 p-6 shadow-xl shadow-blue-900/5 backdrop-blur-xl lg:col-span-2">
            <TopicInput
              topic={topic}
              disabled={isLoading}
              error={inputError}
              onTopicChange={(v) => {
                setTopic(v);
                if (inputError) setInputError(null);
                if (apiError) setApiError(null);
              }}
              onSubmit={submit}
            />

            <div className="mt-8">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-900/40">
                Explore Concepts
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {EXAMPLE_TOPICS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    disabled={isLoading}
                    onClick={() => {
                      setTopic(t);
                      setInputError(null);
                      setApiError(null);
                      setExplanation(null);
                    }}
                    className="rounded-full border border-blue-900/5 bg-blue-900/5 px-4 py-1.5 text-xs font-medium text-blue-900/60 transition-all hover:border-blue-500/30 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-40"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <main className="rounded-3xl border border-blue-900/10 bg-white/30 p-8 shadow-xl shadow-blue-900/5 backdrop-blur-xl lg:col-span-3">
            <ExplanationCard
              topic={topic.trim()}
              explanation={explanation}
              isLoading={isLoading}
              error={apiError}
              onRetry={submit}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
