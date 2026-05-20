import { useState } from "react"

const oneTimeActivities = [
  {
    date: "2024.12",
    title: "〇〇ハッカソン 参加",
    description: "チームでWebアプリを開発し、優秀賞を受賞。",
  },
  {
    date: "2024.10",
    title: "〇〇カンファレンス 参加",
    description: "最新のフロントエンド技術について学ぶ。",
  },
  {
    date: "2024.08",
    title: "CTF大会 参加",
    description: "セキュリティの問題に挑戦し、チームで協力して解決。",
  },
  {
    date: "2024.06",
    title: "学内LT大会 登壇",
    description: "自作アプリについてプレゼンテーションを行う。",
  },
  {
    date: "2024.04",
    title: "〇〇勉強会 参加",
    description: "Reactの基礎について学ぶハンズオンに参加。",
  },
  {
    date: "2024.02",
    title: "インターンシップ 参加",
    description: "Web開発企業で2週間の実務体験。",
  },
  {
    date: "2023.12",
    title: "〇〇コンテスト 応募",
    description: "学生向けアプリコンテストに作品を出品。",
  },
]

const INITIAL_SHOW_COUNT = 4

export function EventTimeline() {
  const [showAll, setShowAll] = useState(false)
  const displayed = showAll ? oneTimeActivities : oneTimeActivities.slice(0, INITIAL_SHOW_COUNT)

  return (
    <div>
      <h3 className="text-lg font-semibold text-navy mb-4">イベント・参加履歴</h3>
      <div className="relative">
        {/* タイムラインの線 */}
        <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-sky-light/60 hidden md:block" />
        <div className="space-y-0">
          {displayed.map((activity) => (
            <div
              key={`${activity.date}-${activity.title}`}
              className="flex gap-4 md:gap-6 items-start py-4 border-b border-sky-light/40 last:border-b-0"
            >
              {/* 日付 */}
              <div className="flex-shrink-0 w-20 text-right">
                <span className="text-sm font-medium text-sky-dark">{activity.date}</span>
              </div>
              {/* ドット */}
              <div className="hidden md:flex flex-shrink-0 w-3 h-3 rounded-full bg-sky-medium mt-1.5 relative z-10" />
              {/* コンテンツ */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-navy text-sm md:text-base">{activity.title}</h4>
                <p className="text-sm text-muted-foreground mt-0.5">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* もっと見る / しまうボタン */}
        {oneTimeActivities.length > INITIAL_SHOW_COUNT && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-sky-medium/50 text-sky-dark text-sm hover:bg-sky-light/50 transition-colors"
            >
              {showAll ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                  しまう
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  もっと見る
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
