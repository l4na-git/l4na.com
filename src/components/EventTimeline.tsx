import { useState } from "react"

const oneTimeActivities = [
  {
    date: "2024.07 - 2024.08",
    title: "自動運転AIチャレンジ 予選",
    description: "1年生だったこともあり、開発に関わることは難しかったですが積極的に参加しました。授業で学んでない技術や授業では扱わない技術に触れることができ、今後の学習への意欲を高めることができました。",
  },
  {
    date: "2024.11 - 2024.12",
    title: "ドロカツ 東日本大会",
    description: "周囲の先生から努力を認めてもらい、自分自身でも自信を持って「頑張った」「やりきった」と言えるくらい時間を費やしてチームの中心となってプログラムを書きました。当日実機が正常に動かないというアクシデントがあり悔しい思いをしましたが、たくさん悩んで試行錯誤をした経験は宝物だと感じています。",
  },
  {
    date: "2025.02",
    title: "基本情報技術者試験 合格",
    description: "応用情報技術者試験を春(4月)に受験をしたかったため、学校の定期試験終了後に学習を開始して2月に受験をしました。結局、応用情報技術者試験は午後問題で落ちてしまいましたが...。",
  },
  {
    date: "2025.03",
    title: "SECCON 13 電脳会議 参加",
    description: "初心者向けのワークショップに参加しました。初めての学校外のイベントに参加して他校の人と交流することを通し、セキュリティに対する興味もさらに深まりました。",
  },
  {
    date: "2025.03",
    title: "未踏会議2025 MEET DAY 参加",
    description: "好きなことを開発に活かしている人の話を聞いて、刺激を受けました。私もいつか好きなことを活かして開発がしたいと思いました。",
  },
  {
    date: "2025.03",
    title: "P3NFEST 参加",
    description: "会場で会った人たちとチームを組み、協力してCTFに挑戦しました。",
  },
  {
    date: "2025.05",
    title: "paiza スキルチェック Aランク獲得",
    description: "応用情報技術者試験の午後問題に自信がなかったため、その悔しさをバネに学習をしてAランクを獲得することができました。",
  },
  {
    date: "2025.06",
    title: "AWS Summit 2025 参加",
    description: "講演や展示を通して、クラウド技術の最新動向を知ることができました。現地の盛り上がりを感じることができ、学習へのモチベーションが高まりました。",
  },
  {
    date: "2025.07 - 2025.08",
    title: "自動運転AIチャレンジ 予選",
    description: "学校外の勉強会に参加するなど、「今年こそは!」という気持ちで積極的に取り組みました。AIを活用して学びながら、自動車を指示したルートで走らせることができるように調整をしました。",
  },
  {
    date: "2025.08",
    title: "セキュリティ・キャンプ 2025 ミニ 東京 参加",
    description: "フォレンジックとインテリジェンスの基礎について学ぶハンズオンに参加しました。ログの見方や分析の方法など、セキュリティに関する知識を深めることができました。",
  },
  {
    date: "2025.08 - now",
    title: "保育園プロジェクト 参加",
    description: "クライアントがいるプロジェクトに初めて参加しました。保育園側とやりとりをしながら、業務を効率化するためのシステムを開発しています。",
  },
  {
    date: "2025.09",
    title: "paiza SQLスキルチェック レベル4獲得",
    description: "SQLスキルチェックがbeta版で公開された際に、学校でSQLを学習していたこともあり、すぐに挑戦してみました。レベル4を獲得することができました。",
  },
  {
    date: "2025.09 - 2025.11",
    title: "MBSD Cybersecurity Challenges 2025 参加",
    description: "学校の先輩方とチームを組んで参加しました。実際に会って作業することは少なかったためNotionで情報共有をしながら、セキュリティに関する様々な問題に挑戦しました。",
  },
  {
    date: "2025.11",
    title: "海外実学研修 参加",
    description: "1週間ほどアメリカに行きました。現地の大学で授業を受けたり、企業を訪問したり、観光をしたりと、充実した時間を過ごすことができました。",
  },
  {
    date: "2025.12",
    title: "技育CAMP2025 ハッカソン Vol.16 参加",
    description: "初めてハッカソンに参加しました。うまくいかない場面もありましたが、チームのメンバーと協力してデプロイまで行うことができました。",
  },
  {
    date: "2025.12 - now",
    title: "入学式プロジェクト(LiveFx) 参加",
    description: "本校の入学式で使用するシステムの開発に参加しています。保育園プロジェクトと並行して行っており大変ではありますが、立場が違う中でどちらも参加していることでそれぞれの立場からの視点を持つことができ、両方のプロジェクトに活かすことができています。",
  },
  {
    date: "2026.02",
    title: "防衛省サイバーコンテスト2026 参加",
    description: "AIを使いながら、セキュリティに関する様々な問題に挑戦しました。1位をとった方の本格的なAIの活用をみて、AIの可能性を感じました。",
  },
  {
    date: "2026.03",
    title: "AIハッカソン 参加",
    description: "様々な年代の人が参加するハッカソンに初めて参加しました。AIを活用してUIを作成したりPRまで作成させたりと、どこまでAIを活用できるのか、どう使うと良いのかを考える良い機会になりました。",
  },
  {
    date: "2026.04 - now",
    title: "GCI 2026 Summer 参加",
    description: "データを扱うことができる人材を目指して、データサイエンスを学んでいます。",
  },
  {
    date: "2026.05",
    title: "AWS Summit Japan 2026 AI-DLC ハッカソン 参加",
    description: "AI-DLCを活用したハッカソンに参加しました。AIに質問をされて答える形が新鮮で楽しかったですが、質問される内容に知らない言葉が多く含まれていたのでAIのスピード感を活かすためにももっと知識をつける必要があることを感じました。",
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
        <div id="timeline-list">
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
              aria-expanded={showAll}
              aria-controls="timeline-list"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-sky-medium/50 text-sky-dark text-sm hover:bg-sky-light/50 transition-colors"
            >
              {showAll ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>
                  しまう
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
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
