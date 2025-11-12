# Contributing to PDFCraft

Thank you for your interest in contributing to PDFCraft! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm 8+
- Git
- A code editor (VS Code recommended)

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/media-helper-suite.git
   cd media-helper-suite
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Create a branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```

## Development Workflow

### Running the Project

```bash
# Start all apps in development mode
pnpm dev

# Run specific app
pnpm --filter @pdfcraft/web dev
pnpm --filter @pdfcraft/api dev

# Run tests
pnpm test

# Run tests in watch mode
pnpm --filter @pdfcraft/api test

# Lint and format
pnpm lint
pnpm format
```

### Making Changes

1. **Write Code**: Make your changes following our coding standards
2. **Test**: Ensure all tests pass and add new tests for new features
3. **Lint**: Run linter and fix any issues
4. **Type Check**: Ensure TypeScript types are correct
5. **Commit**: Use Conventional Commits format

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes

**Examples:**
```bash
feat(api): add PDF split endpoint
fix(web): resolve file upload issue on Safari
docs: update API documentation
test(api): add tests for merge service
```

### Code Standards

#### TypeScript
- Use strict mode
- Avoid `any` type (use `unknown` if needed)
- Define interfaces for all complex objects
- Use type inference where possible

#### React
- Use functional components with hooks
- Keep components small and focused
- Use proper TypeScript types for props
- Follow naming conventions: PascalCase for components

#### File Structure
```
component-name/
├── component-name.tsx
├── component-name.test.tsx
└── index.ts
```

#### Naming Conventions
- **Files**: kebab-case (`pdf-merge.service.ts`)
- **Components**: PascalCase (`PDFDropzone.tsx`)
- **Functions**: camelCase (`mergePDFs`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)

### Testing

#### Writing Tests

```typescript
import { describe, it, expect } from 'vitest';

describe('MyService', () => {
  it('should do something', () => {
    // Arrange
    const input = 'test';

    // Act
    const result = myFunction(input);

    // Assert
    expect(result).toBe('expected');
  });
});
```

#### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm --filter @pdfcraft/api test

# Run tests with coverage
pnpm --filter @pdfcraft/api test -- --coverage
```

### Pull Request Process

1. **Update Documentation**: Update README.md, docs/, or API documentation if needed
2. **Add Tests**: Ensure new features have adequate test coverage
3. **Pass CI**: All CI checks must pass
4. **Request Review**: Request review from maintainers
5. **Address Feedback**: Make requested changes
6. **Merge**: Maintainer will merge once approved

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] All tests passing
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
```

## Project Structure

### Monorepo Organization

```
pdfcraft/
├── apps/
│   ├── web/              # Next.js application
│   │   ├── src/
│   │   │   ├── app/      # App router pages
│   │   │   └── components/
│   │   └── package.json
│   └── api/              # Fastify API
│       ├── src/
│       │   ├── routes/
│       │   ├── services/
│       │   └── middleware/
│       ├── tests/
│       └── package.json
├── packages/
│   ├── ui/               # Shared components
│   ├── config/           # Shared configs
│   └── types/            # Shared types
└── docs/                 # Documentation
```

### Adding a New Package

1. Create directory in `packages/` or `apps/`
2. Add `package.json` with name `@pdfcraft/package-name`
3. Update `pnpm-workspace.yaml` if needed
4. Run `pnpm install` to link workspace packages

## Common Tasks

### Adding a New API Endpoint

1. Define types in `packages/types/src/`
2. Create service in `apps/api/src/services/`
3. Add route in `apps/api/src/routes/`
4. Write tests in `apps/api/tests/`
5. Update `docs/API_CONTRACTS.md`

### Adding a New UI Component

1. Create component in `packages/ui/src/components/`
2. Export from `packages/ui/src/index.ts`
3. Add Storybook story (if applicable)
4. Update documentation

### Updating Dependencies

```bash
# Update all dependencies
pnpm up --recursive

# Update specific package
pnpm --filter @pdfcraft/api up fastify

# Check for outdated packages
pnpm outdated --recursive
```

## Getting Help

- Read the documentation in `/docs`
- Check existing issues and PRs
- Ask questions in discussions
- Contact maintainers via issues

## Recognition

Contributors will be added to our README.md contributors section.

Thank you for contributing to PDFCraft!
