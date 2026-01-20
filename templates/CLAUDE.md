# CLAUDE.md - Project Context for AI Assistants

*Template from GenCreator Labs by Frank*

---

## Project Overview

**Project Name**: [Your Project Name]
**Purpose**: [Brief description of what this project does]
**Tech Stack**: [Languages, frameworks, tools]

---

## Code Style & Standards

### Language-Specific Conventions

**[Language 1]**:
- Style guide: [e.g., Airbnb, Google, or custom]
- Indentation: [spaces/tabs]
- Line length: [max characters]
- Other: [specific preferences]

**[Language 2]**:
- [Same format]

### File Organization

```
src/
├── components/     # UI components
├── lib/           # Utilities and helpers
├── hooks/         # Custom React hooks
├── types/         # TypeScript definitions
└── pages/         # Page components
```

### Naming Conventions

- **Files**: [camelCase, kebab-case, PascalCase?]
- **Variables**: [camelCase?]
- **Constants**: [UPPER_SNAKE_CASE?]
- **Classes/Components**: [PascalCase?]
- **Database tables**: [snake_case?]

---

## Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

### Commit Messages

```
type(scope): subject

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Restructuring
- test: Adding tests
- chore: Maintenance

Example: feat(auth): Add OAuth2 login
```

### Code Review Checklist

- [ ] Tests pass
- [ ] Linting passes
- [ ] TypeScript types correct
- [ ] No console.log statements
- [ ] Comments for complex logic
- [ ] Follows naming conventions
- [ ] Security considerations addressed

---

## AI-Specific Instructions

### Working with AI Assistants

When I ask you to help with code:

1. **Read CLAUDE.md first** - Understand project context
2. **Read relevant files** - Don't assume structure
3. **Suggest, don't just do** - Explain your reasoning
4. **Test your suggestions** - Verify before committing

### Prompting Guidelines

**Good prompts**:
- "Add error handling to the API client"
- "Refactor the auth module to use JWT tokens"
- "Write tests for the user service"

**Avoid**:
- "Make it work" (too vague)
- "Fix the bug" (no context)
- "Rewrite everything" (too broad)

### Testing Requirements

All new code must include:

1. **Unit tests** for business logic
2. **Integration tests** for API endpoints
3. **E2E tests** for critical user flows

Run tests with: `npm test`

### Documentation

- Add JSDoc comments for functions
- Update README for new features
- Add inline comments for complex logic
- Update API documentation for endpoints

---

## Environment Variables

```bash
# Copy this to .env and fill in values
DATABASE_URL=
API_KEY=
AUTH_SECRET=
# ... other variables
```

Never commit `.env` to version control.

---

## Common Tasks

### Running the Project

```bash
# Development
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Linting
npm run lint
```

### Adding a New Feature

1. Create branch: `git checkout -b feature/my-feature`
2. Make changes following code style
3. Add tests
4. Run linting: `npm run lint`
5. Run tests: `npm test`
6. Commit: `git commit -m "feat: Add my feature"`
7. Push: `git push origin feature/my-feature`
8. Create PR for review

### Debugging Common Issues

**[Issue 1]**:
- Symptom: [What happens]
- Solution: [How to fix]

**[Issue 2]**:
- Symptom: [What happens]
- Solution: [How to fix]

---

## Security Considerations

- **Authentication**: [How auth works]
- **Authorization**: [Role-based access?]
- **Data Validation**: [Library used]
- **API Security**: [Rate limiting, CORS, etc.]
- **Secrets Management**: [How to handle sensitive data]

---

## Dependencies

### Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| [pkg] | x.x.x | [reason] |
| [pkg] | x.x.x | [reason] |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| [pkg] | x.x.x | [reason] |

---

## Contact

- **Owner**: [Frank - frankx.ai]
- **Documentation**: [Link to docs]
- **Issues**: [Link to issue tracker]

---

*This CLAUDE.md was created using GenCreator Labs templates by Frank*
