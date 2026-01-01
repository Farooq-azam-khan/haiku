import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Sparkles } from 'lucide-react'

export const Route = createFileRoute('/')({ component: App })

const haikus = [
  {
    line1: "Code flows like a stream",
    line2: "Logic builds a waking dream",
    line3: "Screen light soft and gleam"
  },
  {
    line1: "Errors in the night",
    line2: "Debugging by pale moon light",
    line3: "Green checks, pure delight"
  },
  {
    line1: "Variables defined",
    line2: "Functions pure, state aligned",
    line3: "Order in the mind"
  },
  {
    line1: "Server humming low",
    line2: "Data packets fast and slow",
    line3: "World wide webs do grow"
  },
  {
    line1: "Pixels on the glass",
    line2: "Interface with style and class",
    line3: "User tests we pass"
  }
]

function App() {
  const [currentHaiku, setCurrentHaiku] = useState<typeof haikus[0] | null>(null)

  const generateHaiku = () => {
    const randomIndex = Math.floor(Math.random() * haikus.length)
    setCurrentHaiku(haikus[randomIndex])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl w-full">
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Haiku
            </span>{' '}
            Generator
          </h1>
          <p className="text-xl text-gray-400 font-light">
            Find serenity in code and poetry.
          </p>
        </div>

        <div className="min-h-[200px] mb-12 flex items-center justify-center">
          {currentHaiku ? (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-xl shadow-cyan-500/10 animate-in fade-in zoom-in duration-500">
              <p className="text-2xl md:text-3xl text-gray-200 font-serif italic leading-relaxed mb-2">
                {currentHaiku.line1}
              </p>
              <p className="text-2xl md:text-3xl text-gray-200 font-serif italic leading-relaxed mb-2">
                {currentHaiku.line2}
              </p>
              <p className="text-2xl md:text-3xl text-gray-200 font-serif italic leading-relaxed">
                {currentHaiku.line3}
              </p>
            </div>
          ) : (
            <div className="text-gray-600 italic text-lg">
              Press the button to reveal a poem...
            </div>
          )}
        </div>

        <button
          onClick={generateHaiku}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white text-lg font-semibold rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-1 active:translate-y-0"
        >
          <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
          Generate Haiku
        </button>
      </div>
    </div>
  )
}