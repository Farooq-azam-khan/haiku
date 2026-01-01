import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Sparkles, Terminal } from 'lucide-react'

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

// Reusable Neobrutalist Card Component
function NeoCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-md ${className}`}>
      {children}
    </div>
  )
}

// Reusable Neobrutalist Button Component
function NeoButton({ onClick, children, className = "" }: { onClick?: () => void, children: React.ReactNode, className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 font-bold text-black bg-pink-400 
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
  )
}

function App() {
  const [currentHaiku, setCurrentHaiku] = useState<typeof haikus[0] | null>(null)

  const generateHaiku = () => {
    const randomIndex = Math.floor(Math.random() * haikus.length)
    setCurrentHaiku(haikus[randomIndex])
  }

  return (
    <div className="min-h-screen bg-yellow-50 font-sans text-black flex flex-col items-center justify-center p-6">
      
      {/* Header Section */}
      <div className="max-w-xl w-full mb-12 text-center">
        <div className="inline-block mb-4 p-3 bg-blue-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-full">
           <Terminal className="w-8 h-8 text-black" />
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-2 uppercase tracking-tighter">
          Haiku_Gen_v1
        </h1>
        <p className="text-xl font-bold text-gray-700">
          // Digital Poetry Generator
        </p>
      </div>

      {/* Main Content Area */}
      <div className="max-w-xl w-full">
        <NeoCard className="p-8 mb-8 min-h-[240px] flex items-center justify-center">
          {currentHaiku ? (
            <div className="text-center space-y-4 animate-in fade-in zoom-in duration-300">
              <p className="text-3xl font-bold italic leading-tight bg-yellow-200 inline-block px-1 border border-black rotate-[-1deg]">
                "{currentHaiku.line1}"
              </p>
              <br />
              <p className="text-3xl font-bold italic leading-tight bg-green-200 inline-block px-1 border border-black rotate-[1deg]">
                "{currentHaiku.line2}"
              </p>
              <br />
              <p className="text-3xl font-bold italic leading-tight bg-cyan-200 inline-block px-1 border border-black rotate-[-1deg]">
                "{currentHaiku.line3}"
              </p>
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
        </NeoCard>

        <div className="flex justify-center">
          <NeoButton onClick={generateHaiku} className="w-full md:w-auto text-lg">
            <Sparkles className="w-6 h-6" />
            GENERATE_NEW_HAIKU
          </NeoButton>
        </div>
      </div>
      
      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-4 bg-black"></div>
      <div className="fixed top-0 right-0 w-4 h-full bg-black"></div>
    </div>
  )
}
