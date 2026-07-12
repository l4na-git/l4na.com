import { useEffect, useState } from "react"

const terminalLines = [
  { command: "> whoami", response: "l4na / IT student" },
  { command: "> about", response: "興味が湧いたことを中心に積極的に取り組んでいます。\nWeb開発、インフラ、AI、セキュリティetc..." },
  { command: "> message", response: "つくることを通して、\n人の笑顔の輪を広げられるようになりたいです :D" },
]

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
        <p key={i} className={isCommand ? "text-sky-dark" : "text-navy/80 pl-4"}>
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
          <span className="text-xs font-sans text-navy/50 ml-2">terminal</span>
        </div>

        {/* Terminal content */}
        <div className="grid font-sans text-sm leading-relaxed">
          {/* 高さ確保用の不可視プレースホルダー。最終コンテンツをそのまま描画してグリッドセルの高さを決定する */}
          <div className="col-start-1 row-start-1 p-5 invisible" aria-hidden="true">
            {finalLines.map((line, i) => (
              <TerminalLine
                key={i}
                text={line.text}
                isCommand={line.isCommand}
                withMargin={i !== finalLines.length - 1}
              />
            ))}
          </div>

          {/* 実際にアニメーションする表示コンテンツ */}
          <div className="col-start-1 row-start-1 p-5">
            {displayedLines.map((line, index) => (
              <TerminalLine key={index} text={line.text} isCommand={line.isCommand} />
            ))}

            {currentLineIndex < terminalLines.length && (
              <TerminalLine text={typingText} isCommand={isTypingCommand} cursor showCursor={showCursor} />
            )}

            {currentLineIndex >= terminalLines.length && (
              <TerminalLine text="> " isCommand cursor showCursor={showCursor} withMargin={false} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
