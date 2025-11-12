# PDFCraft

![CI Status](https://github.com/laskydev/media-helper-suite/workflows/CI/badge.svg)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> A functional iLovePDF clone - PDF manipulation toolkit built with modern web technologies

## Vision

PDFCraft aims to provide a complete, production-ready PDF manipulation suite that is:
- **Fast**: Optimized for performance with efficient PDF processing
- **Secure**: Files are automatically cleaned up with TTL-based management
- **Developer-friendly**: Built as a monorepo with shared packages and strict TypeScript
- **Extensible**: Modular architecture ready for new features

## Features

### Phase 1 (Current)
- ✅ Merge multiple PDF files into one
- ✅ Drag-and-drop interface
- ✅ File size limits and validation
- ✅ Automatic file cleanup
- ✅ RESTful API with Fastify

### Phase 2 (Planned)
- Split PDF by pages or ranges
- Compress PDF files
- Convert PDF to/from images
- Rotate PDF pages

### Phase 3 (Future)
- Password protection
- Watermarks
- OCR support
- Batch processing

## Project Structure

```
pdfcraft/
├── apps/
│   ├── web/          # Next.js 15 web application
│   └── api/          # Fastify PDF API server
├── packages/
│   ├── ui/           # Shared React components (Button, Card, Header)
│   ├── config/       # Shared configs (Tailwind, ESLint, TypeScript)
│   └── types/        # Shared types and Zod schemas
├── docs/             # Project documentation
│   ├── STYLEGUIDE.md
│   ├── API_CONTRACTS.md
│   ├── AGENTS.md
│   └── DESIGN.md
└── .github/
    └── workflows/    # CI/CD workflows
```

## Quick Start

### Prerequisites
- Node.js 20+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Start development servers (web:3000, api:4000)
pnpm dev
```

### Development Commands

```bash
# Run all apps in development mode
pnpm dev

# Build all apps
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

### Docker

```bash
# Start API in Docker
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down
```

## Testing the API

### Using curl

```bash
# Merge two PDFs
curl -X POST http://localhost:4000/pdf/merge \
  -F "files=@file1.pdf" \
  -F "files=@file2.pdf" \
  -o merged.pdf

# Health check
curl http://localhost:4000/health
```

### Using the Web Interface

1. Navigate to `http://localhost:3000`
2. Click on "Merge PDF"
3. Drag and drop or select PDF files
4. Click "Merge" to download the result

## Architecture Decisions

| ADR | Decision | Rationale |
|-----|----------|-----------|
| ADR-000 | Monorepo with pnpm workspaces | Code sharing, unified tooling, atomic changes |
| ADR-001 | Fastify for API | Performance, TypeScript support, plugin ecosystem |
| ADR-002 | pdf-lib for PDF operations | Pure JavaScript, no external dependencies, works in all environments |
| ADR-003 | Zod for validation | Type-safe schemas, runtime validation, great DX |

## Standards

### Code Quality
- **TypeScript**: Strict mode enabled
- **ESLint**: Recommended rules + TypeScript
- **Prettier**: Consistent formatting
- **Husky**: Pre-commit hooks for lint + typecheck

### Git Workflow
- **Conventional Commits**: Enforced via commitlint
- **Branch Protection**: CI must pass before merge
- **Pull Request Template**: Structured PR descriptions

### Testing
- **Unit Tests**: Vitest for API services
- **Integration Tests**: E2E testing for critical paths
- **Coverage**: Aim for >80% coverage

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

### Quick Contributing Guide

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Make your changes following our standards
4. Commit using Conventional Commits: `git commit -m "feat: add amazing feature"`
5. Push to your fork: `git push origin feat/amazing-feature`
6. Open a Pull Request

## Environment Variables

### Web App (`apps/web/.env`)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### API (`apps/api/.env`)
```env
PORT=4000
HOST=0.0.0.0
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
MAX_FILE_SIZE=52428800
FILE_TTL=1800000
LOG_LEVEL=info
```

## Documentation

- [Style Guide](docs/STYLEGUIDE.md) - UI/UX design standards
- [API Contracts](docs/API_CONTRACTS.md) - API endpoint specifications
- [Design Document](docs/DESIGN.md) - Design decisions and references
- [Agents](docs/AGENTS.md) - Project roles and responsibilities

## Roadmap

### Q1 2024
- [x] Initial monorepo setup
- [x] PDF merge functionality
- [ ] PDF split functionality
- [ ] PDF compression

### Q2 2024
- [ ] PDF conversion (PDF to images)
- [ ] PDF rotation
- [ ] User authentication

### Q3 2024
- [ ] Premium features (password protection, watermarks)
- [ ] Batch processing
- [ ] API rate limiting

## License

MIT License - see [LICENSE](LICENSE) for details

## Support

- GitHub Issues: [Report a bug](https://github.com/laskydev/media-helper-suite/issues/new?template=bug_report.md)
- Feature Requests: [Request a feature](https://github.com/laskydev/media-helper-suite/issues/new?template=feature_request.md)

---

Built with ❤️ using Next.js, Fastify, and pdf-lib
