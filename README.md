# 🐂 GORO - Indonesian Stock Monitor PWA

<div align="center">

![GORO Logo](https://img.shields.io/badge/GORO-Stock%20Monitor-10b981?style=for-the-badge&logo=chart-line)

**Progressive Web App untuk monitoring saham-saham Indonesia dengan fitur deteksi pola candlestick dan manajemen portfolio.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

[Demo](https://goro.vercel.app) · [Report Bug](https://github.com/ukisatriana/goro/issues) · [Request Feature](https://github.com/ukisatriana/goro/issues)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Usage](#-usage)
- [Candlestick Patterns](#-candlestick-patterns)
- [PWA Features](#-pwa-features)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 📊 Stock Monitoring
- **Real-time monitoring** saham LQ45 dan saham Indonesia lainnya
- Data dari **Yahoo Finance API**
- Filter berdasarkan symbol, nama, atau sektor
- Tampilan harga, perubahan, dan volume

### 📈 Buy Signal Detection
Deteksi 7 pola **Bullish Reversal**:
1. ✅ Hammer
2. ✅ Bullish Engulfing
3. ✅ Morning Star
4. ✅ Piercing Pattern
5. ✅ Inverted Hammer
6. ✅ Bullish Harami
7. ✅ Three White Soldiers

### 📉 Sell Signal Detection
Deteksi 7 pola **Bearish Reversal**:
1. ⚠️ Shooting Star
2. ⚠️ Bearish Engulfing
3. ⚠️ Evening Star
4. ⚠️ Dark Cloud Cover
5. ⚠️ Hanging Man
6. ⚠️ Bearish Harami
7. ⚠️ Three Black Crows

### 💼 Portfolio Management
- Tambah, edit, dan hapus saham di portfolio
- Tracking performa investasi
- Kalkulasi gain/loss otomatis
- Catatan untuk setiap saham

### 📱 Progressive Web App
- Installable di mobile & desktop
- Offline support
- Fast loading dengan caching
- Responsive design

---

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Zustand** - State Management
- **Lucide React** - Icons

### APIs & Data
- **Yahoo Finance** - Stock Data
- **LocalStorage** - Portfolio Data

### PWA
- **Service Worker** - Offline Support
- **Web Manifest** - Installation

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ dan npm/yarn/pnpm
- Git

### Installation

1. **Clone repository**
```bash
git clone https://github.com/ukisatriana/goro.git
cd goro
```

2. **Checkout branch goroo**
```bash
git checkout goroo
```

3. **Install dependencies**
```bash
npm install
# atau
yarn install
# atau
pnpm install
```

4. **Copy environment variables**
```bash
cp .env.example .env.local
```

5. **Run development server**
```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

6. **Open browser**
```
http://localhost:3000
```

---

## 📖 Usage

### Dashboard
1. Lihat daftar saham yang tersedia
2. Gunakan search untuk mencari saham spesifik
3. Filter berdasarkan Buy Signal atau Sell Signal
4. Klik saham untuk melihat detail

### Portfolio
1. Klik tombol "Tambah Saham"
2. Pilih symbol saham
3. Masukkan quantity, buy price, dan tanggal pembelian
4. Tambahkan notes (opsional)
5. Klik "Add Stock"

### Stock Detail
1. Lihat informasi lengkap saham
2. Cek trend (Uptrend/Downtrend/Sideways)
3. Review detected patterns & signals
4. Analisa historical data

---

## 📊 Candlestick Patterns

### Bullish Patterns (Buy Signals)

| Pattern | Description | Confidence |
|---------|-------------|------------|
| **Hammer** | Body kecil di atas, shadow panjang di bawah | Medium |
| **Bullish Engulfing** | Candle hijau membungkus candle merah sebelumnya | High |
| **Morning Star** | 3 candle: bearish → doji → bullish | High |
| **Piercing Pattern** | Bullish menembus 50%+ body bearish | Medium |
| **Inverted Hammer** | Body kecil di bawah, shadow panjang di atas | Medium |
| **Bullish Harami** | Small bearish dalam body bullish besar | Medium |
| **Three White Soldiers** | 3 candle bullish berturut-turut | High |

### Bearish Patterns (Sell Signals)

| Pattern | Description | Confidence |
|---------|-------------|------------|
| **Shooting Star** | Body kecil di bawah, shadow panjang di atas | Medium |
| **Bearish Engulfing** | Candle merah membungkus candle hijau | High |
| **Evening Star** | 3 candle: bullish → doji → bearish | High |
| **Dark Cloud Cover** | Bearish menembus 50%+ body bullish | Medium |
| **Hanging Man** | Seperti hammer tapi di uptrend | Medium |
| **Bearish Harami** | Small bullish dalam body bearish besar | Medium |
| **Three Black Crows** | 3 candle bearish berturut-turut | High |

---

## 🌐 PWA Features

### Installation
- **Android**: Buka di Chrome → Menu → "Add to Home Screen"
- **iOS**: Buka di Safari → Share → "Add to Home Screen"
- **Desktop**: Klik icon install di address bar

### Offline Support
- Cache static assets
- Cache API responses
- Fallback untuk offline mode

### Performance
- Fast loading dengan code splitting
- Optimized images
- Service worker caching

---

## 📁 Project Structure

```
goro/
├── public/
│   ├── icons/              # PWA icons
│   ├── manifest.json       # PWA manifest
│   ├── sw.js              # Service worker
│   └── robots.txt         # SEO
├── src/
│   ├── app/               # Next.js app router
│   │   ├── page.tsx       # Dashboard
│   │   ├── portfolio/     # Portfolio page
│   │   ├── stock/[symbol] # Stock detail
│   │   └── layout.tsx     # Root layout
│   ├── components/        # React components
│   │   ├── ui/           # UI components
│   │   ├── Layout/       # Layout components
│   │   └── Portfolio/    # Portfolio components
│   ├── lib/              # Utilities
│   │   ├── patternDetection.ts
│   │   ├── trendAnalysis.ts
│   │   ├── stockApi.ts
│   │   └── portfolioManager.ts
│   ├── store/            # Zustand stores
│   ├── types/            # TypeScript types
│   └── constants/        # Constants
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ⚠️ Disclaimer

**IMPORTANT:** 
- Data saham diambil dari Yahoo Finance API
- Signal buy/sell adalah hasil deteksi pola candlestick
- **BUKAN merupakan rekomendasi investasi**
- Selalu lakukan riset mandiri sebelum berinvestasi
- Past performance tidak menjamin hasil di masa depan

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Anggoro nih**

- GitHub: [@ukisatriana](https://github.com/ukisatriana)
- Email: ukisatriana@gmail.com

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Yahoo Finance](https://finance.yahoo.com/) - Stock Data
- [Lucide Icons](https://lucide.dev/) - Icons
- [Vercel](https://vercel.com/) - Hosting

---

<div align="center">

Made with hantu
⭐ Star this repo if you find it helpful!

</div>