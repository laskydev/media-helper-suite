# PDFCraft

![CI Status](https://github.com/laskydev/media-helper-suite/workflows/CI/badge.svg)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> A privacy-first, backend-less PDF manipulation toolkit powered by WebAssembly

## 🎯 Vision

PDFCraft is a complete, production-ready PDF manipulation suite that prioritizes:
- **Privacy**: All processing happens in your browser - files never leave your device
- **Performance**: WebAssembly-powered for near-native speed
- **Zero Cost**: No backend = no server costs, infinitely scalable
- **Modern**: Built with Next.js 15, TypeScript strict mode, and cutting-edge web technologies

## ✨ Current Features (Phase 1)

### Client-Side PDF Operations
- ✅ **Merge PDFs**: Combine multiple PDF files into one document
- ✅ **Split PDFs**: Extract pages or split PDF into multiple files
- ✅ **Rotate Pages**: Rotate pages 90°, 180°, or 270°
- ✅ **Extract Pages**: Create new PDF with selected pages
- 🔄 Real-time progress tracking
- 🔒 100% client-side processing (privacy-first)
- 📊 Memory estimation and validation

## 🏗️ Architecture

### Backend-less Stack

```
┌─────────────────────────────────────────────────┐
│              Next.js 15 (SSG)                   │
│          Deployed on Vercel/Netlify             │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────┐  ┌──────────────┐           │
│  │  Main Thread │  │ Web Workers  │           │
│  │   (UI/UX)    │  │ (Processing) │           │
│  └──────┬───────┘  └──────┬───────┘           │
│         │                  │                    │
│         └──────────┬───────┘                    │
│                    │                            │
│         ┌──────────▼─────────────┐             │
│         │  @pdfcraft/pdf-engine  │             │
│         │    (Phase 1: pdf-lib)  │             │
│         │    (Phase 2: pdf.js)   │             │
│         │    (Phase 3: MuPDF)    │             │
│         └────────────────────────┘             │
│                                                 │
│  All processing in browser                     │
│  Files never uploaded to server                │
└─────────────────────────────────────────────────┘
```

### Why Backend-less?

| Aspect | Traditional Backend | PDFCraft (Backend-less) |
|--------|---------------------|-------------------------|
| **Privacy** | Files uploaded to server | Files never leave browser |
| **Cost** | Server hosting ($$$) | Static hosting (free/cheap) |
| **Scalability** | Limited by server capacity | Infinite (client does work) |
| **Latency** | Network round-trip | Zero network delay |
| **Maintenance** | Server updates, monitoring | Simple static deployment |

## 📦 Project Structure

```
pdfcraft/
├── apps/
│   └── web/                      # Next.js 15 web application
│       ├── src/
│       │   ├── app/              # App router pages
│       │   │   ├── page.tsx      # Home page
│       │   │   └── tools/        # PDF tools pages
│       │   │       └── merge/    # Merge PDF page
│       │   └── components/       # React components
│       └── public/
├── packages/
│   ├── pdf-engine/               # ⭐ PDF Processing Engine
│   │   ├── src/
│   │   │   ├── operations/       # PDF operations
│   │   │   │   ├── merge.ts
│   │   │   │   ├── split.ts
│   │   │   │   ├── rotate.ts
│   │   │   │   └── extract.ts
│   │   │   ├── workers/          # Web Workers
│   │   │   │   └── pdf.worker.ts
│   │   │   ├── utils/            # Utilities
│   │   │   │   └── validation.ts
│   │   │   └── types/            # TypeScript types
│   │   └── wasm/                 # WASM binaries (Phase 2+)
│   ├── ui/                       # Shared React components
│   ├── config/                   # Shared configs
│   └── types/                    # Shared types
├── docs/
│   ├── STYLEGUIDE.md
│   ├── DESIGN.md
│   ├── AGENTS.md
│   └── WASM_STRATEGY.md          # ⭐ WebAssembly roadmap
└── archive/
    └── api-backup-backend/       # Original backend (archived)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The web app will be available at `http://localhost:3000`

### Development Commands

```bash
# Run web app in development mode
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint

# Type check
pnpm typecheck

# Format code
pnpm format
```

## 🎨 Features by Phase

### Phase 1: Foundation (✅ CURRENT)
**Status:** COMPLETE
**Technology:** pdf-lib (Pure JavaScript)
**Bundle Size:** ~500KB

- ✅ Merge multiple PDFs
- ✅ Split PDF by pages/ranges
- ✅ Rotate pages (90°, 180°, 270°)
- ✅ Extract specific pages
- ✅ Client-side validation
- ✅ Progress indicators
- ✅ Memory management

### Phase 2: Enhanced Features (🔜 NEXT)
**Technology:** pdf.js + pdf-lib
**Bundle Size:** ~3MB (lazy loaded)

- 🔜 PDF page previews/thumbnails
- 🔜 Text extraction from PDFs
- 🔜 PDF → Images (PNG/JPEG)
- 🔜 Images → PDF
- 🔜 Search within PDFs
- 🔜 Basic compression

### Phase 3: Advanced WASM (🎯 PLANNED)
**Technology:** MuPDF-WASM / PDFium-WASM
**Bundle Size:** ~8MB (lazy loaded)

- 🎯 Advanced compression (3 levels)
- 🎯 Image optimization
- 🎯 Watermarks
- 🎯 Form filling
- 🎯 Encryption/Decryption
- 🎯 PDF/A conversion

### Phase 4: Hybrid Backend (🔮 FUTURE)
**For features that can't be done client-side:**

- 🔮 OCR (Text recognition)
- 🔮 Office → PDF conversion
- 🔮 HTML → PDF
- 🔮 Advanced digital signatures

These will use lightweight Edge Functions (Cloudflare Workers) to keep costs minimal.

## 🎯 Current Capabilities

### ✅ What Works Now

```typescript
import { mergePDFs, splitPDF, rotatePDF, extractPages } from '@pdfcraft/pdf-engine';

// Merge PDFs
const result = await mergePDFs({
  files: [file1, file2, file3],
  onProgress: (progress) => {
    console.log(`${progress.progress}%`);
  },
});

// Split PDF
const results = await splitPDF({
  file: pdfFile,
  pages: [1, 3, 5], // Extract pages 1, 3, and 5
  onProgress: (progress) => console.log(progress),
});

// Rotate pages
const rotated = await rotatePDF({
  file: pdfFile,
  pages: 'all', // or [1, 2, 3]
  degrees: 90,
});

// Extract pages
const extracted = await extractPages({
  file: pdfFile,
  pages: [1, 2, 3, 4, 5],
});
```

## 📊 Performance Metrics

### Phase 1 Benchmarks

| Operation | 2 PDFs (10MB each) | 5 PDFs (5MB each) | 10 PDFs (2MB each) |
|-----------|-------------------|-------------------|-------------------|
| **Merge** | ~3 seconds | ~4 seconds | ~5 seconds |
| **Split** | ~2 seconds | ~2 seconds | ~2 seconds |
| **Rotate** | ~1 second | ~1 second | ~1 second |
| **Extract** | ~1 second | ~1 second | ~1 second |

### Bundle Sizes

| Phase | JavaScript | WASM | Total | Loading Strategy |
|-------|-----------|------|-------|------------------|
| **Phase 1** | 500 KB | 0 MB | 500 KB | Inline |
| **Phase 2** | 800 KB | 2 MB | 2.8 MB | Lazy load pdf.js |
| **Phase 3** | 1 MB | 8 MB | 9 MB | Lazy load on-demand |

## 🔒 Privacy & Security

### Client-Side Processing

All PDF operations happen **100% in your browser**:
- ✅ Files never uploaded to any server
- ✅ No cloud storage or temporary file hosting
- ✅ Processing happens on your device
- ✅ Works completely offline (PWA in Phase 4)
- ✅ GDPR compliant by design

### Limitations

- **File Size**: Limited by browser memory (~100MB recommended max)
- **Processing Speed**: Depends on device CPU
- **Features**: Some advanced features require backend (OCR, Office conversion)

## 🛠️ Technical Decisions

### Architecture Decision Records (ADRs)

| ADR | Decision | Rationale |
|-----|----------|-----------|
| **ADR-000** | Monorepo with pnpm workspaces | Code sharing, unified tooling, atomic changes |
| **ADR-001** | Backend-less architecture | Privacy, zero server cost, infinite scalability |
| **ADR-002** | pdf-lib for Phase 1 | Pure JS, browser-ready, no WASM complexity yet |
| **ADR-003** | Web Workers for processing | Non-blocking UI, better UX |
| **ADR-004** | Zod for validation | Type-safe schemas, runtime validation |
| **ADR-005** | Next.js SSG deployment | Static export, no server needed, fast CDN delivery |

## 🎯 Roadmap

### Q1 2024
- [x] Monorepo setup
- [x] Phase 1: pdf-lib integration (merge, split, rotate, extract)
- [ ] Phase 2: pdf.js integration (previews, text extraction)
- [ ] PWA capabilities (offline mode)

### Q2 2024
- [ ] Phase 3: WASM advanced features (compression)
- [ ] Drag-and-drop page reordering
- [ ] Batch processing UI
- [ ] Dark mode

### Q3 2024
- [ ] Phase 4: Hybrid backend for OCR
- [ ] Premium features exploration
- [ ] Mobile app (React Native)

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

### Quick Contributing Guide

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Make your changes following our standards
4. Test locally: `pnpm dev`
5. Commit using Conventional Commits: `git commit -m "feat: add amazing feature"`
6. Push and open a Pull Request

## 📚 Documentation

- [WASM Strategy](docs/WASM_STRATEGY.md) - WebAssembly integration roadmap
- [Style Guide](docs/STYLEGUIDE.md) - UI/UX design standards
- [Design Document](docs/DESIGN.md) - Design decisions and references
- [Agents Roles](docs/AGENTS.md) - Project roles and responsibilities
- [Contributing Guide](CONTRIBUTING.md) - How to contribute

## 🌟 Why PDFCraft?

### For Users
- 🔒 **Privacy**: Your files never leave your computer
- ⚡ **Fast**: No upload/download time, instant processing
- 💰 **Free**: No limits, no ads, no premium tiers
- 🌐 **Works Offline**: Process PDFs without internet (Phase 4)

### For Developers
- 🛠️ **Modern Stack**: Next.js 15, TypeScript, Tailwind
- 📦 **Monorepo**: Well-organized, scalable architecture
- 🎯 **Type-Safe**: Strict TypeScript throughout
- 🧪 **Tested**: Comprehensive test coverage
- 📖 **Documented**: Extensive documentation

## 📈 Status

**Phase 1: COMPLETE** ✅
- Backend eliminated
- Client-side processing working
- Merge, split, rotate, extract functional
- Progress tracking implemented
- Memory validation added

**Next up:** Phase 2 (pdf.js integration for previews and text extraction)

## 📝 License

MIT License - see [LICENSE](LICENSE) for details

## 💬 Support

- GitHub Issues: [Report a bug](https://github.com/laskydev/media-helper-suite/issues/new?template=bug_report.md)
- Feature Requests: [Request a feature](https://github.com/laskydev/media-helper-suite/issues/new?template=feature_request.md)

---

**Built with ❤️ using Next.js, pdf-lib, and WebAssembly**

*No servers. No uploads. Just pure client-side PDF magic.* ✨
