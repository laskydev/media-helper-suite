# WebAssembly Strategy

**PDFCraft WASM Integration Roadmap**

Version: 1.0
Last Updated: 2024
Status: Phase 1 Complete

---

## 🎯 Philosophy

**Maximize client-side processing with WebAssembly** while maintaining privacy and eliminating server costs.

**Core Principle:** Everything that CAN be done in the browser SHOULD be done in the browser.

---

## 📊 Capability Matrix

### ✅ Phase 1: Foundation (CURRENT)

| Feature | Technology | Status | Bundle Size | Notes |
|---------|-----------|--------|-------------|-------|
| Merge PDFs | pdf-lib (JS) | ✅ Live | ~500KB | Pure JavaScript, no WASM yet |
| Split PDFs | pdf-lib (JS) | ✅ Live | ~500KB | Fast enough without WASM |
| Rotate Pages | pdf-lib (JS) | ✅ Live | ~500KB | Instant rotation |
| Extract Pages | pdf-lib (JS) | ✅ Live | ~500KB | Simple page copying |
| Validation | Custom (JS) | ✅ Live | ~10KB | File type & size checks |
| Progress Tracking | Custom (JS) | ✅ Live | ~5KB | Real-time progress |

**Decision:** Start with pure JS (pdf-lib) to validate architecture before adding WASM complexity.

---

### 🔜 Phase 2: Enhanced Features

| Feature | Technology | Status | Bundle Size | Priority |
|---------|-----------|--------|-------------|----------|
| **Page Previews** | pdf.js (WASM) | 🔜 Next | ~2MB | P0 - High value |
| **Text Extraction** | pdf.js | 🔜 Next | ~2MB | P0 - Essential |
| **PDF → Images** | pdf.js + Canvas | 🔜 Next | ~2MB | P0 - Popular |
| **Images → PDF** | pdf-lib | 🔜 Next | ~500KB | P1 - Good to have |
| **Search in PDF** | pdf.js | 🔜 Next | ~2MB | P1 - Nice feature |
| **Basic Compress** | pdf-lib | 🔜 Next | ~500KB | P2 - Limited quality |

**Technology Choice:** pdf.js (Mozilla's PDF renderer)
- **Pros**: Battle-tested, used by Firefox, excellent rendering
- **Cons**: ~2MB bundle, requires lazy loading
- **Strategy**: Lazy load only when user opens preview/text features

**Implementation Plan:**
```typescript
// Lazy load pdf.js only when needed
const loadPDFJS = async () => {
  const pdfjs = await import('pdfjs-dist');
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
  return pdfjs;
};
```

---

### 🎯 Phase 3: Advanced WASM

| Feature | Technology | Status | Bundle Size | Priority |
|---------|-----------|--------|-------------|----------|
| **Advanced Compression** | MuPDF-WASM | 🎯 Planned | ~8MB | P0 - Key feature |
| **Image Optimization** | MuPDF-WASM | 🎯 Planned | ~8MB | P0 - Part of compress |
| **Watermarks** | pdf-lib + Canvas | 🎯 Planned | ~500KB | P1 - Business feature |
| **Form Filling** | PDFium-WASM | 🎯 Planned | ~5MB | P2 - Complex |
| **Encryption** | pdf-lib + WebCrypto | 🎯 Planned | ~1MB | P2 - Security |
| **PDF/A Conversion** | PDFium-WASM | 🎯 Planned | ~8MB | P3 - Niche |

**Technology Options:**

#### Option A: MuPDF-WASM ⭐ RECOMMENDED
- **Size**: 5-8MB compressed
- **Capabilities**: Compression, rendering, text extraction
- **Pros**: Lighter than PDFium, good compression
- **Cons**: Less features than PDFium
- **Use Case**: Compression engine

#### Option B: PDFium-WASM
- **Size**: 15-20MB compressed
- **Capabilities**: Full PDF manipulation, forms, signing
- **Pros**: Complete feature set, Chrome's PDF engine
- **Cons**: Very large bundle
- **Use Case**: Only if we need advanced features

#### Option C: Custom WASM (MuPDF/Poppler)
- **Size**: 5-10MB (customizable)
- **Capabilities**: Whatever we compile
- **Pros**: Full control, optimized size
- **Cons**: Requires C++ expertise, maintenance
- **Use Case**: If we have C++ developers

**Decision:** Start with MuPDF-WASM in Phase 3, evaluate PDFium only if needed.

---

### ❌ Not Viable with WASM (Requires Backend)

| Feature | Why Not Client-Side | Alternative | Phase |
|---------|-------------------|-------------|-------|
| **OCR (Tesseract)** | 50-200MB models + slow | Edge API (Google Vision/Azure) | Phase 4 |
| **Word → PDF** | Requires Office rendering | Backend LibreOffice/Pandoc | Phase 4 |
| **Excel → PDF** | Complex formatting engine | Backend LibreOffice | Phase 4 |
| **PowerPoint → PDF** | Presentation rendering | Backend LibreOffice | Phase 4 |
| **HTML → PDF** | Full browser rendering | Backend Puppeteer/wkhtmltopdf | Phase 4 |
| **Advanced Signatures** | PKI, certificates, HSM | Backend with cert management | Phase 4 |
| **Batch 1000s** | Memory limitations | Backend worker queues | Not planned |

**Strategy for Phase 4:**
- Use Cloudflare Workers (Edge Functions)
- Pay-per-use pricing (near zero cost at low volume)
- Deploy close to users (low latency)
- Keep 95% of features client-side

---

## 🏗️ Architecture Evolution

### Phase 1: Pure JavaScript
```
User Browser
    ↓
Next.js App (Main Thread)
    ↓
pdf-lib (Pure JS)
    ↓
Download Result
```

### Phase 2: Add pdf.js WASM
```
User Browser
    ↓
Next.js App (Main Thread)
    ├─→ pdf-lib (Basic ops)
    └─→ pdf.js WASM (Rendering, text)
         ↓
    Web Worker (Non-blocking)
         ↓
    Download Result
```

### Phase 3: Full WASM Stack
```
User Browser
    ↓
Next.js App (Main Thread)
    ↓
@pdfcraft/pdf-engine
    ├─→ pdf-lib (Simple ops)
    ├─→ pdf.js (Rendering)
    └─→ MuPDF-WASM (Compression)
         ↓
    Web Workers (All heavy ops)
         ↓
    IndexedDB (Temp storage)
         ↓
    Download Result
```

### Phase 4: Hybrid
```
User Browser                     Edge (Cloudflare Workers)
    ↓                                    ↓
95% Client-side                   5% Edge Functions
    ↓                                    ↓
WASM Processing              OCR, Office Conversion
    ↓                                    ↓
    └────────── Results ←───────────────┘
```

---

## 📦 Bundle Size Strategy

### Loading Strategy

| Component | Size | When to Load | Cache Strategy |
|-----------|------|--------------|----------------|
| **pdf-lib** | 500KB | Initial load | Service Worker cache |
| **pdf.js** | 2MB | Lazy (on preview) | Cache indefinitely |
| **MuPDF-WASM** | 8MB | Lazy (on compress) | Cache indefinitely |
| **pdf.worker.js** | 500KB | Lazy (with pdf.js) | Cache indefinitely |

### Progressive Enhancement

```typescript
// Check browser capabilities
const canUseWASM = typeof WebAssembly === 'object';
const hasEnoughMemory = navigator.deviceMemory > 2; // GB

if (canUseWASM && hasEnoughMemory) {
  // Load advanced features
  await loadMuPDFWASM();
} else {
  // Fallback to basic features
  showLimitedFeatures();
}
```

---

## 🚀 Implementation Roadmap

### Phase 1: Foundation (✅ COMPLETE)

**Duration:** Week 1
**Status:** ✅ Deployed

- [x] Create `@pdfcraft/pdf-engine` package
- [x] Implement merge with pdf-lib
- [x] Implement split, rotate, extract
- [x] Add progress tracking
- [x] Client-side validation
- [x] Memory checks
- [x] Update web app to use engine
- [x] Remove backend dependency

**Deliverables:**
- Fully functional client-side PDF merge
- 4 operations working (merge, split, rotate, extract)
- Zero backend dependencies
- ~500KB bundle

---

### Phase 2: Enhanced Features (🔜 NEXT)

**Duration:** Week 2-3
**Status:** 🔜 Next Sprint

#### Tasks:

**Week 2: pdf.js Integration**
- [ ] Add pdf.js dependency
- [ ] Configure worker loading
- [ ] Implement page rendering
  ```typescript
  async function renderPage(pdf: Uint8Array, pageNum: number): Promise<string> {
    const doc = await pdfjs.getDocument({data: pdf}).promise;
    const page = await doc.getPage(pageNum);
    // Render to canvas, return data URL
  }
  ```
- [ ] Create thumbnail grid component
- [ ] Add preview modal
- [ ] Lazy load pdf.js (code splitting)

**Week 3: Text & Conversion**
- [ ] Text extraction from PDFs
- [ ] PDF → PNG/JPEG conversion
- [ ] Images → PDF creation
- [ ] Search functionality
- [ ] Performance optimization

**Deliverables:**
- Page previews working
- Text extraction functional
- Image conversion both ways
- ~3MB bundle (lazy loaded)

---

### Phase 3: Advanced WASM (🎯 PLANNED)

**Duration:** Week 4-6
**Status:** 🎯 Planning

#### Research Phase (Week 4)
- [ ] Evaluate MuPDF-WASM vs PDFium-WASM
- [ ] Benchmark compression quality
- [ ] Test bundle sizes
- [ ] POC compression feature
- [ ] Decision: Choose WASM engine

#### Implementation (Week 5-6)
- [ ] Integrate chosen WASM engine
- [ ] Implement 3-level compression (low/medium/high)
- [ ] Add watermark support
- [ ] Image optimization in PDFs
- [ ] Memory management for large files
- [ ] Streaming processing (chunks)

**Deliverables:**
- Advanced compression working
- Watermarks functional
- ~9MB bundle (lazy loaded)
- Compression reduces file size 50-70%

---

### Phase 4: Hybrid Backend (🔮 FUTURE)

**Duration:** Week 7+
**Status:** 🔮 Future

#### Edge Functions Setup
- [ ] Set up Cloudflare Workers project
- [ ] Create OCR endpoint (Tesseract.js or API)
- [ ] Create Office conversion endpoint (LibreOffice)
- [ ] Create HTML → PDF endpoint (Puppeteer)
- [ ] Add rate limiting
- [ ] Cost monitoring

#### Client Integration
- [ ] Detect when backend needed
- [ ] Show pricing/limits to users
- [ ] Implement upload to edge
- [ ] Handle edge responses
- [ ] Fallback if edge unavailable

**Deliverables:**
- OCR working (via edge)
- Office conversions working
- Still 95% client-side
- Pay-per-use costs (<$5/month expected)

---

## 📊 Success Metrics

### Phase 1 Targets (✅ MET)
- [x] Bundle size: <500KB ✅ (Achieved: ~500KB)
- [x] Merge time: <5s for 2x10MB PDFs ✅
- [x] Zero backend dependencies ✅
- [x] Works offline (after first load) ✅

### Phase 2 Targets
- [ ] Bundle size: <3MB total (lazy loaded)
- [ ] Preview generation: <2s per page
- [ ] Text extraction: <3s for 100-page PDF
- [ ] Image conversion: <5s per page

### Phase 3 Targets
- [ ] Compression ratio: 50-70% size reduction
- [ ] Compression time: <30s for 50MB PDF
- [ ] Memory usage: <200MB for 50MB PDF
- [ ] No browser crashes on large files

### Phase 4 Targets
- [ ] Edge API latency: <2s
- [ ] Monthly cost: <$10
- [ ] 95%+ features still client-side
- [ ] OCR accuracy: >90%

---

## 🔧 Technical Deep Dive

### Web Workers Implementation

```typescript
// packages/pdf-engine/src/workers/pdf.worker.ts
self.onmessage = async (e) => {
  const { operation, data } = e.data;

  switch (operation) {
    case 'merge':
      const result = await mergePDFs({
        files: data.files,
        onProgress: (p) => self.postMessage({ type: 'progress', progress: p }),
      });
      self.postMessage({ type: 'success', result: result.data });
      break;
    // ... other operations
  }
};
```

### Memory Management

```typescript
// Check available memory before operation
function canProcess(files: File[]): boolean {
  const estimatedMemory = files.reduce((sum, f) => sum + f.size, 0) * 3; // 3x for overhead

  if ('memory' in performance) {
    const available = (performance as any).memory.jsHeapSizeLimit
                    - (performance as any).memory.usedJSHeapSize;
    return available > estimatedMemory;
  }

  return estimatedMemory < 500 * 1024 * 1024; // 500MB max fallback
}
```

### Lazy Loading WASM

```typescript
// Lazy load MuPDF only when compression needed
let muPDFModule: any = null;

export async function initMuPDF() {
  if (!muPDFModule) {
    // Dynamic import with chunking
    const MuPDF = await import(/* webpackChunkName: "mupdf" */ 'mupdf-wasm');
    muPDFModule = await MuPDF.default({
      locateFile: (file: string) => `/wasm/${file}`,
    });
  }
  return muPDFModule;
}
```

---

## 🎯 Decision Framework

### When to Use Each Technology

| Task | Use This | Why |
|------|----------|-----|
| Merge <10 PDFs | pdf-lib (JS) | Fast enough, small bundle |
| Merge 50+ PDFs | MuPDF (WASM) | Better memory management |
| Show preview | pdf.js (WASM) | Industry standard renderer |
| Extract text | pdf.js | Excellent text parsing |
| Compress PDF | MuPDF (WASM) | Real compression algorithms |
| Simple watermark | pdf-lib + Canvas | No WASM needed |
| OCR | Backend API | Too large for browser |

---

## 🚨 Known Limitations

### Browser Limitations
- **Memory**: Chrome ~2GB per tab, Safari ~1GB
- **File Size**: Recommend <100MB per file
- **Processing Time**: CPU-bound, slower on old devices
- **WASM Support**: IE11 doesn't support WASM (not supported)

### Feature Limitations
- **OCR**: Requires backend (models too large)
- **Office Conversion**: Requires backend (complex rendering)
- **Batch Processing**: Limited by memory (max ~50 files)
- **Video in PDF**: Not supported (rare use case)

### Workarounds
- Show warnings for large files
- Offer to split large operations
- Progressive processing (chunks)
- Fallback to simpler algorithms

---

## 📚 Resources

### Libraries
- [pdf-lib](https://pdf-lib.js.org/) - Pure JS PDF manipulation
- [pdf.js](https://mozilla.github.io/pdf.js/) - Mozilla's PDF renderer
- [MuPDF](https://mupdf.com/) - Lightweight PDF toolkit
- [PDFium](https://pdfium.googlesource.com/pdfium/) - Chrome's PDF engine

### WASM Compilation
- [Emscripten](https://emscripten.org/) - C/C++ to WASM
- [wasm-pack](https://rustwasm.github.io/wasm-pack/) - Rust to WASM

### Performance
- [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Performance Memory](https://developer.mozilla.org/en-US/docs/Web/API/Performance/memory)

---

## 🔄 Change Log

### v1.0.0 - Initial Strategy
- Defined 4-phase roadmap
- Chose pdf-lib for Phase 1
- Planned pdf.js for Phase 2
- Researched MuPDF for Phase 3
- Reserved edge functions for Phase 4

---

**Status:** Phase 1 Complete ✅
**Next:** Begin Phase 2 (pdf.js integration)
**Target:** Q1 2024
