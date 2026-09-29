---
startDate: 2025-11-01
title: "TeachArm"
description: |
  「AIが動いて教える」 をテーマにした学習支援システム
tech: ["SO-101", "DeepSeek", "Python", "ArUco", "Tailscale", "React", "MediaPipe Hands", "VOICEVOX", "whisper"]
team:
  format: "個人開発"
  context: "授業課題"
highlight: "企画から実装まで一人で、AIと協力しながら開発"
details: |
  紙のプリントを"指差し"すると、その場所に合わせて声と動きで返します。
  ロボティクスの授業で、ニーズ調査・企画から実装まで一人でやりきったプロジェクトです。
  「こんなものを作る」というコンセプトを動画生成AIで可視化してから開発に入りました。

  開発期間：
  2025年11月〜2026年2月（授業内＋放課後の自主開発）

  アーキテクチャ：
  - MediaPipe Handsによる手の指差し検出
  - ArUcoマーカーでプリント上の位置を特定
  - DeepSeekが内容を解析し説明文を生成
  - VOICEVOXで音声合成、whisperで音声認識
  - SO-101ロボットアームが動きで応答
  - TailscaleでPC間のネットワーク接続

  工夫した点・学び：
  - AIの提案をきっかけにIK（逆運動学）を調べ、アームの動き制御に応用
  - ニーズ調査→コンセプト動画生成→実装という企画フローを経験
  - 初めてロボットアームに触れ、ソフト×ハードの統合の面白さを体験
github: "https://github.com/l4na-git/TechArm"
demo: "https://teacharm.figma.site"
media:
  - image: "./1.png"
    alt: "TeachArm 企画"
  - image: "./2.png"
    alt: "TeachArm 企画-1"
  - image: "./3.png"
    alt: "TeachArm 企画-2"
  - image: "./4.png"
    alt: "TeachArm 企画-3"
  - image: "./5.png"
    alt: "TeachArm 最終発表"
  - image: "./6.png"
    alt: "TeachArm 最終発表-1"
  - image: "./7.png"
    alt: "TeachArm 最終発表-2"
  - image: "./8.png"
    alt: "TeachArm 最終発表-3"
  - image: "./9.png"
    alt: "TeachArm 最終発表-4"
  - image: "./10.png"
    alt: "TeachArm 最終発表-5"
  - image: "./11.png"
    alt: "TeachArm 最終発表-6"
  - image: "./12.png"
    alt: "TeachArm 最終発表-7"
  - image: "./13.png"
    alt: "TeachArm 最終発表-8"
  - image: "./14.png"
    alt: "TeachArm 最終発表-9"
---
