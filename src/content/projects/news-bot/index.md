---
startDate: 2025-02-01
endDate: 2025-03-01
title: "ITニュース配信システム"
description: "ITニュースを収集・配信する自動化システム"
tech: ["AWS Lambda", "Amazon EventBridge", "Discord Bot", "RSS"]
team:
  format: "個人開発"
  context: "自主制作"
highlight: "定期実行、自動化"
details: |
  2年次に、APIを学んだことをきっかけに「実際に動くものを作りたい」と思い制作しました。
  実際はAPIで取得できるニュースがあまり見つからなかったため、RSSを採用しました。
  当初は自宅サーバで運用していましたが不安定だったため、AWS Lambdaへ移行しました。

  アーキテクチャ：
  - AWS LambdaとAmazon EventBridgeによる定期的なニュース収集
  - Discord Botによる配信

  工夫した点・学び：
  - サーバーレス化による安定稼働・低コスト運用
  - Markdownを活用し、読みやすい配信
  - AWS Lambdaは授業、EventBridgeは自宅サーバ時代のcron知識が活きて詰まらず実装できた
github: "https://github.com/l4na-git/discord-news-bot"
media:
  - image: "./1.png"
    alt: "ITニュース Discord配信"
---
