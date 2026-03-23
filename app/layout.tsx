import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Miks Valorant Agent - Valorant 特工信息查询站',
  description: 'Valorant 特工技能详解、对比工具和使用攻略',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
