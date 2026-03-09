Role:
You are a senior full-stack web developer and UX designer with deep understanding of trading, Smart Money Concepts (SMC), and ICT trading models.

Goal:
Build a clean, minimal, responsive web application for daily SMC + ICT trading tracking and journaling.
This app is for a solo trader, not a signal platform.

# CORE PURPOSE

- The website helps me:
- Track liquidity & sessions
- Log trades with SMC/ICT rules
- Review discipline & performance over time

# TECH STACK (REQUIRED)

- Frontend: React + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB
- Auth: Simple email + password
- Charts: Basic stats (win rate, RR, trades/day)
- Keep it simple, readable, and beginner-friendly code.

REQUIRED PAGES & FEATURES
1️⃣ AUTH PAGES
Login / Register
Email
Password
No social login
Redirect to Dashboard after login

2️⃣ DASHBOARD (MAIN PAGE)
Show a daily overview:
Sections:
Today’s date
Market traded (Forex / NAS100 / Crypto)
Session traded (London / NY)
Daily bias (Buy / Sell / No Trade)
Trades taken today
Win / Loss summary

Quick actions:

➕ Add Daily Marking
➕ Add Trade
📊 View Journal

3️⃣ DAILY MARKING PAGE (CORE FEATURE)

This page follows SMC + ICT logic.
Form Fields:
Date
Pair / Instrument
HTF Bias (Buy / Sell / Range)
Premium or Discount
Liquidity Targeted:
Buy-side
Sell-side

Key Levels:
Previous Day High
Previous Day Low
Asian High / Low

Model Planned:
2022 Model
Liquidity Sweep + MSS
Other (text)

Session:
London
New York
Screenshot upload (optional)
Notes (textarea)
Save marking for the day

4️⃣ TRADE JOURNAL PAGE

Each trade is linked to a daily marking.
Trade Fields:
Date
Pair
Session
Direction (Buy / Sell)

Entry price
Stop Loss
Take Profit
Risk % (max 1%)
RR (auto-calculated)
Model used (dropdown)

Result:

Win

Loss

BE

Screenshot before

Screenshot after

Emotion before trade

Lesson learned

5️⃣ JOURNAL LIST / HISTORY

Filter by:

Date

Pair

Session

Win / Loss

Click a day → see:

Daily marking

Trades taken

Mistakes & lessons

6️⃣ STATS PAGE

Basic but useful stats:

Total trades

Win rate %

Average RR

Best session

Worst mistake (most repeated note)

Use simple charts (bar / pie).

🎨 UI / UX RULES

Minimal

Dark mode default

TradingView-style vibe

No unnecessary animations

Mobile friendly

Clear typography

🔐 DATA MODELS (REQUIRED)
User

email

password (hashed)

DailyMarking

userId

date

bias

liquidityTarget

session

keyLevels

modelPlanned

notes

screenshot

Trade

userId

dailyMarkingId

pair

direction

entry

stopLoss

takeProfit

risk

rr

result

emotions

lesson

screenshots

🧪 EXTRA (OPTIONAL BUT NICE)

“No Trade Day” toggle

Discipline score (checkbox rules followed)

Export journal to CSV

📦 OUTPUT REQUIREMENTS

Generate full frontend + backend code

Explain how to run locally

Include sample data

Use clean folder structure
Comment important logic

🎯 FINAL INSTRUCTION
This app is for discipline and consistency, not overtrading.
Prioritize clarity, simplicity, and trader psychology.
