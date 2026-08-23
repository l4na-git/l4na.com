import { useEffect, useRef, useState } from "react"

const terminalLines = [
  { command: "> whoami", response: "l4na / IT student" },
  { command: "> about", response: "興味が湧いたことを中心に積極的に取り組んでいます。\nWeb開発、インフラ、AI、セキュリティetc..." },
  { command: "> message", response: "つくることを通して、\n人の笑顔の輪を広げられるようになりたいです :D" },
]

const sections = ["about", "skills", "projects", "activities", "contact"] as const

const HELP_TEXT = [
  "available commands:",
  "  help          show this message",
  "  ls            list sections",
  "  cd <section>  jump to a section",
  "  clear         clear the screen",
].join("\n")

function runCommand(raw: string, rmAttemptsRef: { current: number }): string {
  const trimmed = raw.trim()
  const [cmd, ...args] = trimmed.split(/\s+/)
  const cmdLower = (cmd ?? "").toLowerCase()

  switch (cmdLower) {
    case "":
      return "command not found"
    case "help":
      return HELP_TEXT
    case "ls":
      return sections.join("  ")
    case "cd": {
      const target = (args[0] ?? "").toLowerCase()
      if (!target) return "cd: missing operand"
      if (!sections.includes(target as (typeof sections)[number])) {
        return `cd: no such section: ${args[0]}`
      }
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" })
      return `moved to #${target}`
    }
    default: {
      if (trimmed.toLowerCase().replace(/\s+/g, " ") === "rm -rf /") {
        rmAttemptsRef.current += 1
        return rmAttemptsRef.current === 1 ? "...why would you do that." : "seriously?"
      }
      return `command not found: ${cmd}`
    }
  }
}

// アニメーション完了後に必要な全体の高さを事前確保するための最終表示行
// (完了後に表示される待機プロンプト行の分もダミーとして含める)
const finalLines: { text: string; isCommand: boolean }[] = [
  ...terminalLines.flatMap((line) => [
    { text: line.command, isCommand: true },
    { text: line.response, isCommand: false },
  ]),
  { text: ">", isCommand: true },
]

function TerminalLine({
  text,
  isCommand,
  cursor = false,
  showCursor = false,
  withMargin = true,
}: {
  text: string
  isCommand: boolean
  cursor?: boolean
  showCursor?: boolean
  withMargin?: boolean
}) {
  const lines = text.split("\n")
  return (
    <div className={withMargin ? "mb-2" : undefined}>
      {lines.map((t, i) => (
        <p key={i} className={isCommand ? "text-sky-dark whitespace-pre-wrap" : "text-navy/80 pl-4 whitespace-pre-wrap"}>
          {t}
          {cursor && i === lines.length - 1 && (
            <span
              aria-hidden="true"
              className={`inline-block w-2 h-4 ml-0.5 align-middle bg-sky-medium ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </p>
      ))}
    </div>
  )
}

export function TerminalUI() {
  const [displayedLines, setDisplayedLines] = useState<{ text: string; isCommand: boolean }[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTypingCommand, setIsTypingCommand] = useState(true)
  const [showCursor, setShowCursor] = useState(true)
  const [commandHistory, setCommandHistory] = useState<{ text: string; isCommand: boolean }[]>([])
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const rmAttemptsRef = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)

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

  // 新しい行が増えるたびに一番下までスクロールする
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [displayedLines, commandHistory, currentCharIndex])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return
    const raw = inputValue
    setInputValue("")

    if (raw.trim().toLowerCase() === "clear") {
      setCommandHistory([])
      return
    }

    const output = runCommand(raw, rmAttemptsRef)
    setCommandHistory((prev) => [
      ...prev,
      { text: `> ${raw}`, isCommand: true },
      { text: output, isCommand: false },
    ])
  }

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
          <span className="text-xs font-sans text-navy/50 ml-2">terminal</span>
        </div>

        {/* Terminal content */}
        <div className="relative font-mono font-medium text-sm leading-relaxed">
          {/* 高さ確保用の不可視プレースホルダー。最終コンテンツをそのまま描画して高さを決定する */}
          <div className="p-5 invisible" aria-hidden="true">
            {finalLines.map((line, i) => (
              <TerminalLine
                key={i}
                text={line.text}
                isCommand={line.isCommand}
                withMargin={i !== finalLines.length - 1}
              />
            ))}
          </div>

          {/* 実際に表示するコンテンツ。プレースホルダーと同じ高さの枠内で内部スクロールする */}
          <div
            ref={scrollRef}
            className="absolute inset-0 overflow-y-auto p-5"
            onClick={() => inputRef.current?.focus()}
          >
            {displayedLines.map((line, index) => (
              <TerminalLine key={index} text={line.text} isCommand={line.isCommand} />
            ))}

            {currentLineIndex < terminalLines.length && (
              <TerminalLine text={typingText} isCommand={isTypingCommand} cursor showCursor={showCursor} />
            )}

            {currentLineIndex >= terminalLines.length && (
              <>
                {commandHistory.map((line, i) => (
                  <TerminalLine key={`cmd-${i}`} text={line.text} isCommand={line.isCommand} />
                ))}
                <div className="relative">
                  <div aria-hidden="true">
                    <TerminalLine
                      text={`> ${inputValue}`}
                      isCommand
                      cursor
                      showCursor={showCursor}
                      withMargin={false}
                    />
                  </div>
                  <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="absolute inset-0 w-full opacity-0 outline-none border-none"
                    aria-label="terminal command input"
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
