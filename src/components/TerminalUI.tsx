import { useEffect, useState } from "react"

const terminalLines = [
  { command: "> whoami", response: "l4na / IT student" },
  { command: "> about", response: "Web開発・インフラ・AI活用に取り組んでいます" },
  { command: "> message", response: "つくることを通して、\n技術と人のつながりを考えています" },
]

export function TerminalUI() {
  const [displayedLines, setDisplayedLines] = useState<{ text: string; isCommand: boolean }[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTypingCommand, setIsTypingCommand] = useState(true)
  const [showCursor, setShowCursor] = useState(true)

  // カーソルの点滅
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  // 1文字ずつタイピングするアニメーション
  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) return

    const currentLine = terminalLines[currentLineIndex]
    const textToType = isTypingCommand ? currentLine.command : currentLine.response

    if (currentCharIndex < textToType.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1)
      }, isTypingCommand ? 60 : 30)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [
          ...prev,
          { text: textToType, isCommand: isTypingCommand },
        ])
        setCurrentCharIndex(0)

        if (isTypingCommand) {
          setIsTypingCommand(false)
        } else {
          setIsTypingCommand(true)
          setCurrentLineIndex((prev) => prev + 1)
        }
      }, isTypingCommand ? 300 : 800)
      return () => clearTimeout(timeout)
    }
  }, [currentLineIndex, currentCharIndex, isTypingCommand])

  const currentLine = terminalLines[currentLineIndex]
  const textToType = currentLine
    ? isTypingCommand
      ? currentLine.command
      : currentLine.response
    : ""
  const typingText = textToType.slice(0, currentCharIndex)

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white/90 backdrop-blur-sm border-2 border-sky-medium/30 rounded-2xl shadow-lg overflow-hidden">
        {/* Window header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-sky-light/50 border-b border-sky-medium/20">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>
          <span className="text-xs font-mono text-navy/50 ml-2">terminal</span>
        </div>

        {/* Terminal content */}
        <div className="p-5 font-mono text-sm leading-relaxed min-h-[180px]">
          {displayedLines.map((line, index) => (
            <div key={index} className="mb-2">
              {line.text.split("\n").map((text, i) => (
                <p
                  key={i}
                  className={`${line.isCommand ? "text-sky-dark font-medium" : "text-navy/80 pl-4"}`}
                >
                  {text}
                </p>
              ))}
            </div>
          ))}

          {currentLineIndex < terminalLines.length && (
            <div className="mb-2">
              {typingText.split("\n").map((text, i) => (
                <p
                  key={i}
                  className={`${isTypingCommand ? "text-sky-dark font-medium" : "text-navy/80 pl-4"}`}
                >
                  {text}
                  {i === typingText.split("\n").length - 1 && (
                    <span
                      className={`inline-block w-2 h-4 ml-0.5 align-middle bg-sky-medium ${
                        showCursor ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  )}
                </p>
              ))}
            </div>
          )}

          {currentLineIndex >= terminalLines.length && (
            <p className="text-sky-dark font-medium">
              {">"}{" "}
              <span
                className={`inline-block w-2 h-4 ml-0.5 align-middle bg-sky-medium ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
