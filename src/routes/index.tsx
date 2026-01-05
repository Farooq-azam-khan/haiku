import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Sparkles,
  Terminal,
  Copy,
  History,
  ThumbsUp,
  AlertTriangle,
  X,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: App });

const haikus = [
  {
    id: 1,
    line1: "Code flows like a stream",
    line2: "Logic builds a waking dream",
    line3: "Screen light soft and gleam",
  },
  {
    id: 2,
    line1: "Errors in the night",
    line2: "Debugging by pale moon light",
    line3: "Green checks, pure delight",
  },
  {
    id: 3,
    line1: "Variables defined",
    line2: "Functions pure, state aligned",
    line3: "Order in the mind",
  },
  {
    id: 4,
    line1: "Server humming low",
    line2: "Data packets fast and slow",
    line3: "World wide webs do grow",
  },
  {
    id: 5,
    line1: "Pixels on the glass",
    line2: "Interface with style and class",
    line3: "User tests we pass",
  },
];

// --- Components ---

function NeoCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-md ${className}`}
    >
      {children}
    </div>
  );
}

function NeoButton({
  onClick,
  children,
  className = "",
  variant = "primary",
}: {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "success";
}) {
  const bgColors = {
    primary: "bg-pink-400",
    secondary: "bg-white",
    danger: "bg-red-400",
    success: "bg-green-400",
  };

  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 font-bold text-black ${bgColors[variant]}
        border-2 border-black rounded-md
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        hover:translate-x-[2px] hover:translate-y-[2px]
        hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        active:translate-x-[4px] active:translate-y-[4px]
        active:shadow-none
        transition-all duration-200
        flex items-center gap-2 justify-center
        ${className}
      `}
    >
      {children}
    </button>
  );
}

function TypewriterText({
  text,
  delay = 30,
  startDelay = 0,
  onComplete,
}: {
  text: string;
  delay?: number;
  startDelay?: number;
  onComplete?: () => void;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText("");
    setStarted(false);
  }, [text]);

  // Start delay timer
  useEffect(() => {
    if (!started) {
      const timer = setTimeout(() => setStarted(true), startDelay);
      return () => clearTimeout(timer);
    }
  }, [startDelay, text, started]);

  // Typing effect
  useEffect(() => {
    if (!started) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      // Use slice to be safe and accurate
      setDisplayedText(text.slice(0, currentIndex + 1));
      currentIndex++;

      if (currentIndex >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay, started, onComplete]);

  return (
    <span>
      {displayedText}
      {started && displayedText.length < text.length && (
        <span className="animate-pulse">█</span>
      )}
    </span>
  );
}

// --- Main App ---

function App() {
  const [currentHaiku, setCurrentHaiku] = useState<(typeof haikus)[0] | null>(
    null,
  );
  const [history, setHistory] = useState<typeof haikus>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [rating, setRating] = useState<"like" | "dislike" | null>(null);

  // Initial load
  useEffect(() => {
    // Optional: Start with no haiku or generate one
  }, []);

  const generateHaiku = () => {
    const randomIndex = Math.floor(Math.random() * haikus.length);
    const newHaiku = haikus[randomIndex];

    // Avoid immediate duplicate if possible (simple check)
    if (currentHaiku?.id === newHaiku.id && haikus.length > 1) {
      generateHaiku();
      return;
    }

    setCurrentHaiku(newHaiku);
    setRating(null);
    setIsCopied(false);

    // Add to history (keep last 5)
    setHistory((prev) => [newHaiku, ...prev].slice(0, 5));
  };

  const handleCopy = () => {
    if (!currentHaiku) return;
    const text = `${currentHaiku.line1}\n${currentHaiku.line2}\n${currentHaiku.line3}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-yellow-50 font-sans text-black flex flex-col items-center justify-center p-6 relative overflow-x-hidden">
      <div className="max-w-xl w-full mb-8 text-center">
        <div className="inline-block mb-4 p-3 bg-blue-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-full">
          <Terminal className="w-8 h-8 text-black" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-2 uppercase tracking-tighter">
          Haiku_Gen_v1
        </h1>
      </div>

      {/* Main Card Area */}
      <div className="max-w-xl w-full relative z-10">
        <NeoCard className="p-8 mb-6 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
          {/* Copy Feedback Overlay */}
          {isCopied && (
            <div className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center animate-in fade-in duration-100">
              <h2 className="text-yellow-400 text-3xl md:text-4xl font-black border-4 border-yellow-400 p-4 rotate-[-3deg] uppercase tracking-widest">
                COPIED_TO_CLIPBOARD
              </h2>
            </div>
          )}

          {currentHaiku ? (
            <div key={currentHaiku.id} className="text-center space-y-6 w-full">
              {/* Typewriter Effect with staggered delays */}
              <div className="text-2xl md:text-3xl font-bold italic leading-tight bg-yellow-200 inline-block px-2 py-1 border border-black rotate-[-1deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <TypewriterText
                  text={`"${currentHaiku.line1}"`}
                  startDelay={0}
                />
              </div>
              <br />
              <div className="text-2xl md:text-3xl font-bold italic leading-tight bg-green-200 inline-block px-2 py-1 border border-black rotate-[1deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <TypewriterText
                  text={`"${currentHaiku.line2}"`}
                  startDelay={1000}
                />
              </div>
              <br />
              <div className="text-2xl md:text-3xl font-bold italic leading-tight bg-cyan-200 inline-block px-2 py-1 border border-black rotate-[-1deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <TypewriterText
                  text={`"${currentHaiku.line3}"`}
                  startDelay={2000}
                />
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-400 uppercase tracking-widest">
                Ready to Generate
              </p>
              <div className="mt-4 flex gap-2 justify-center">
                <div className="w-3 h-3 bg-black rounded-full animate-bounce delay-0"></div>
                <div className="w-3 h-3 bg-black rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-black rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}

          {/* Action Bar (Copy + Ratings) */}
          {currentHaiku && (
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={handleCopy}
                className="p-2 bg-white border-2 border-black hover:bg-gray-100 active:translate-y-1 transition-all"
                title="Copy to Clipboard"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          )}
        </NeoCard>

        {/* Rating System */}
        {currentHaiku && (
          <div className="flex gap-4 justify-center mb-6">
            <NeoButton
              onClick={() => setRating("like")}
              variant={rating === "like" ? "success" : "secondary"}
              className="flex-1"
            >
              <ThumbsUp
                className={`w-5 h-5 ${rating === "like" ? "fill-black" : ""}`}
              />
              [ COMPILE ]
            </NeoButton>
            <NeoButton
              onClick={() => setRating("dislike")}
              variant={rating === "dislike" ? "danger" : "secondary"}
              className="flex-1"
            >
              <AlertTriangle
                className={`w-5 h-5 ${rating === "dislike" ? "fill-black" : ""}`}
              />
              [ ERROR ]
            </NeoButton>
          </div>
        )}

        {/* Main Action Button */}
        <div className="flex justify-center gap-4">
          <NeoButton onClick={generateHaiku} className="w-full text-lg py-4">
            <Sparkles className="w-6 h-6" />
            {currentHaiku ? "GENERATE_NEXT" : "INITIALIZE_SEQUENCE"}
          </NeoButton>

          <NeoButton
            onClick={() => setShowLogs(true)}
            variant="secondary"
            className="px-4"
          >
            <History className="w-6 h-6" />
          </NeoButton>
        </div>
      </div>

      {/* Logs Drawer (Receipt Style) */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white border-l-4 border-black transform transition-transform duration-300 ease-in-out z-50 ${showLogs ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="h-full flex flex-col p-6 overflow-y-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          <div className="flex justify-between items-center mb-6 pb-4 border-b-4 border-black border-dashed">
            <h2 className="text-3xl font-black uppercase">Session_Logs</h2>
            <button
              onClick={() => setShowLogs(false)}
              className="p-2 hover:bg-red-100 rounded-full border-2 border-transparent hover:border-black transition-all"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {history.length === 0 ? (
            <div className="text-gray-400 font-mono text-center mt-10">
              NO_LOGS_FOUND
            </div>
          ) : (
            <div className="space-y-6 font-mono text-sm">
              {history.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="border-2 border-black p-4 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="flex justify-between mb-2 text-xs text-gray-500 border-b border-black pb-1">
                    <span>ID: #{item.id.toString().padStart(4, "0")}</span>
                    <span>{new Date().toLocaleTimeString()}</span>
                  </div>
                  <div className="space-y-1">
                    <p>{item.line1}</p>
                    <p>{item.line2}</p>
                    <p>{item.line3}</p>
                  </div>
                </div>
              ))}
              <div className="text-center mt-4 text-xs text-gray-400">
                *** END OF RECEIPT ***
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Borders */}
      <div className="fixed bottom-0 left-0 w-full h-4 bg-black z-40"></div>
      <div className="fixed top-0 right-0 w-4 h-full bg-black z-40"></div>
    </div>
  );
}
