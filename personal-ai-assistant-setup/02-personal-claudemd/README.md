# Module 2: Personal CLAUDE.md

**Duration**: 1 hour
**Level**: Beginner
**Prerequisites**: Completed Module 1

---

## Learning Objectives

By the end of this module, you will:

1. Understand the CLAUDE.md system and its power
2. Create your personal global CLAUDE.md
3. Design effective project-specific CLAUDE.md files
4. Master context layering for maximum effectiveness
5. Build templates for different project types

---

## What is CLAUDE.md?

CLAUDE.md is the configuration file that tells your AI assistant WHO you are, HOW you work, and WHAT you expect.

```
Without CLAUDE.md:
"Write a function" → Generic code

With CLAUDE.md:
"Write a function" → Code in YOUR style,
                     following YOUR conventions,
                     formatted YOUR way
```

### The Context Hierarchy

```
~/.claude/CLAUDE.md (Global)
         ↓ overridden by
~/projects/myapp/CLAUDE.md (Project)
         ↓ overridden by
~/projects/myapp/src/CLAUDE.md (Directory)
         ↓ overridden by
Conversation context
```

Each level adds specificity. Global defines your identity; project defines the codebase.

---

## 2.1 Global CLAUDE.md: Your AI Identity

### Location
```
~/.claude/CLAUDE.md
```

### Essential Sections

Your global CLAUDE.md should include:

```markdown
# Personal AI Configuration

## About Me
I'm [Your Name], a [role] working primarily with [technologies].
I have [X] years of experience in [domains].

## Communication Preferences
- Be direct and concise
- Explain your reasoning when asked
- Ask clarifying questions when requirements are ambiguous
- Prefer practical solutions over theoretical perfection

## Coding Style
- Language: [TypeScript/Python/etc.]
- Formatting: [Prettier/Black/etc.] with [specific settings]
- Naming: [camelCase/snake_case/etc.]
- Comments: [Style preference]

## Technical Preferences
- State Management: [Redux/Zustand/etc.]
- Testing: [Jest/Vitest/pytest/etc.]
- Database: [PostgreSQL/MongoDB/etc.]
- Architecture: [Patterns you prefer]

## Workflow Conventions
- Git: [Conventional Commits/etc.]
- PR Size: [Preference]
- Documentation: [JSDoc/etc.]

## Avoid
- [Patterns you dislike]
- [Technologies you want to avoid]
- [Coding practices to skip]
```

### Example: Complete Global CLAUDE.md

```markdown
# Personal AI Configuration

## About Me
I'm Sarah, a senior full-stack developer specializing in TypeScript and React.
10 years of experience building scalable web applications.
Currently focused on AI-powered developer tools.

## Communication Style
- Be direct and skip unnecessary preamble
- When I ask "why", explain the reasoning concisely
- If something is unclear, ask ONE focused question
- Prefer showing code over describing it
- Use technical terms freely - I understand them

## Coding Style Preferences

### TypeScript
- Strict mode always
- Prefer explicit types over inference for function parameters
- Use type guards over type assertions
- Functional programming patterns when appropriate
- Named exports over default exports

### React
- Functional components only
- Custom hooks for shared logic
- Props interfaces, not types
- Avoid prop drilling - use context or composition

### Formatting
- Prettier with: singleQuote, trailingComma: 'es5', semi: false
- 100 character line width
- 2 space indentation

### Naming Conventions
- Components: PascalCase
- Hooks: use* prefix
- Utils: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Files: kebab-case except components

## Technical Stack Preferences
- Runtime: Bun > Node
- Framework: Next.js App Router
- Styling: Tailwind CSS
- State: Zustand for global, React state for local
- Forms: react-hook-form + zod
- Testing: Vitest + Testing Library
- Database: PostgreSQL + Drizzle ORM

## Git Conventions
- Conventional Commits (feat:, fix:, chore:, etc.)
- Small, focused PRs (<400 lines)
- Squash merge to main
- Branch naming: type/description (feat/user-auth)

## What I Don't Want
- Class components
- Redux (unless specifically requested)
- CSS-in-JS (styled-components, emotion)
- Excessive comments - code should be self-documenting
- Over-engineering simple solutions

## Quality Standards
- All code must have types
- Functions over 20 lines should be reviewed for splitting
- Error handling must be explicit
- No console.log in production code
- Tests for business logic
```

### Exercise 2.1.1: Create Your Global CLAUDE.md

1. Create the file at `~/.claude/CLAUDE.md`
2. Include all sections from the template
3. Customize based on YOUR preferences
4. Test by starting a new Claude Code session

**Verification**: Ask Claude to write a simple function and verify it matches your style.

---

## 2.2 Project CLAUDE.md: Codebase Context

### Location
```
your-project/CLAUDE.md
```

### Purpose
Teach Claude about THIS specific codebase:
- Architecture decisions
- File structure
- Naming patterns
- Key abstractions
- Common tasks

### Essential Sections for Projects

```markdown
# Project: [Name]

## Overview
[What this project does in 2-3 sentences]

## Tech Stack
- Frontend: [specific versions]
- Backend: [specific technologies]
- Database: [type and version]
- Infrastructure: [cloud/deployment]

## Architecture

### Directory Structure
```
src/
├── app/           # Next.js app router pages
├── components/    # React components
│   ├── ui/        # Design system primitives
│   └── features/  # Feature-specific components
├── lib/           # Utilities and helpers
├── hooks/         # Custom React hooks
├── types/         # TypeScript types
└── services/      # API and external services
```

### Key Patterns
[Describe the patterns used in this codebase]

### Important Files
- `src/lib/db.ts` - Database connection
- `src/lib/auth.ts` - Authentication logic
- `src/components/ui/` - Design system

## Conventions for This Project

### Component Structure
[Project-specific component patterns]

### State Management
[How state is managed in this project]

### API Patterns
[How API calls are made]

## Common Tasks

### Adding a New Page
1. Create file in `app/page-name/page.tsx`
2. Add to navigation in `components/navigation.tsx`
3. Create tests in `__tests__/`

### Adding a New API Endpoint
1. Create handler in `app/api/endpoint/route.ts`
2. Add types in `types/api.ts`
3. Update client services

## Database Schema
[Key tables/collections and their relationships]

## Environment Variables
[List required env vars without sensitive values]

## Known Issues / Tech Debt
[Current limitations the AI should know about]
```

### Example: Complete Project CLAUDE.md

```markdown
# Project: TaskFlow

## Overview
TaskFlow is a project management SaaS for small teams. Built with Next.js 14,
PostgreSQL, and deployed on Vercel. ~50k MAU.

## Tech Stack
- Frontend: Next.js 14.1, React 18, TypeScript 5.3
- Styling: Tailwind CSS 3.4, shadcn/ui
- State: Zustand 4.5, TanStack Query 5
- Backend: Next.js API routes, tRPC 11
- Database: PostgreSQL 16 via Neon, Drizzle ORM
- Auth: NextAuth.js 5 with GitHub/Google OAuth
- Hosting: Vercel (frontend), Neon (database)

## Architecture

### Directory Structure
```
src/
├── app/
│   ├── (auth)/           # Auth pages (login, signup)
│   ├── (dashboard)/      # Authenticated app pages
│   │   ├── projects/
│   │   ├── tasks/
│   │   └── settings/
│   └── api/
│       └── trpc/         # tRPC API
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── forms/            # Form components
│   └── features/         # Feature components
│       ├── projects/
│       ├── tasks/
│       └── teams/
├── lib/
│   ├── db/               # Database schema & queries
│   ├── trpc/             # tRPC router & procedures
│   └── utils/            # Utility functions
├── hooks/                # Custom React hooks
└── types/                # Shared TypeScript types
```

### Key Patterns

**Data Fetching**: All data fetching uses TanStack Query via tRPC.
```typescript
// Pattern for queries
const { data, isLoading } = trpc.projects.list.useQuery()

// Pattern for mutations
const mutation = trpc.projects.create.useMutation({
  onSuccess: () => utils.projects.list.invalidate()
})
```

**Components**: Feature components in `components/features/[feature]/`.
Each feature folder contains:
- `[feature]-list.tsx` - List view
- `[feature]-card.tsx` - Card/item view
- `[feature]-form.tsx` - Create/edit form
- `[feature]-actions.tsx` - Action menu
- `index.ts` - Barrel export

**Forms**: All forms use react-hook-form + zod.
```typescript
const schema = z.object({ ... })
const form = useForm({ resolver: zodResolver(schema) })
```

### Important Files
- `src/lib/db/schema.ts` - Drizzle schema (source of truth)
- `src/lib/trpc/router.ts` - tRPC router definition
- `src/lib/auth/config.ts` - NextAuth configuration
- `src/components/ui/` - Design system (don't modify)

## Conventions

### Naming
- tRPC procedures: `resource.action` (projects.create, tasks.update)
- Hooks: `use[Resource][Action]` (useProjectsList, useTaskCreate)
- Components: `[Resource][Type]` (ProjectCard, TaskForm)

### Error Handling
All tRPC procedures use this pattern:
```typescript
.mutation(async ({ input, ctx }) => {
  if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' })
  // ... logic
})
```

### Testing
- Unit tests for utils: `*.test.ts`
- Component tests: `*.test.tsx` with Testing Library
- E2E tests: Playwright in `/e2e`

## Database Schema

### Core Tables
- `users` - User accounts (id, email, name, avatar)
- `teams` - Team workspaces (id, name, owner_id)
- `projects` - Projects (id, team_id, name, status)
- `tasks` - Tasks (id, project_id, title, status, assignee_id)

### Key Relations
- User → many Teams (through team_members)
- Team → many Projects
- Project → many Tasks
- Task → one User (assignee)

## Environment Variables
Required (see `.env.example`):
- DATABASE_URL
- NEXTAUTH_SECRET
- GITHUB_ID / GITHUB_SECRET
- GOOGLE_ID / GOOGLE_SECRET

## Common Tasks

### Adding a New Feature
1. Add schema in `lib/db/schema.ts`
2. Run `bun db:push` to update database
3. Add tRPC router in `lib/trpc/routers/`
4. Add to main router in `lib/trpc/router.ts`
5. Create components in `components/features/`
6. Add page in `app/(dashboard)/`

### Deploying
1. Push to main (auto-deploys to Vercel)
2. Migrations run automatically via Drizzle

## Known Issues / Tech Debt
- Task drag-and-drop needs optimization for large lists
- Email notifications not yet implemented
- Search is basic string matching (should use pg_trgm)
- Mobile responsive is incomplete in dashboard

## Active Development
Currently working on:
- [ ] Real-time updates via WebSockets
- [ ] File attachments for tasks
```

### Exercise 2.2.1: Create Your Project CLAUDE.md

1. Choose a real project you work on
2. Document its architecture, patterns, and conventions
3. Include common tasks and known issues
4. Test by asking Claude about the project

---

## 2.3 Directory-Level Context

For large projects, add CLAUDE.md files to specific directories:

### Example: Component Directory CLAUDE.md

`src/components/CLAUDE.md`:
```markdown
# Components Directory

## Structure
- `ui/` - Base UI components (buttons, inputs, etc.)
- `forms/` - Form components with validation
- `features/` - Feature-specific components
- `layouts/` - Page layouts and wrappers

## Component Guidelines
- Use shadcn/ui as base when possible
- Props interface must be exported
- Use `forwardRef` for form components
- Include displayName for debugging

## Creating New Components
```typescript
// Template for new components
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface MyComponentProps {
  // props
}

export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('base-styles', className)} {...props} />
    )
  }
)
MyComponent.displayName = 'MyComponent'
```
```

### Example: API Directory CLAUDE.md

`src/app/api/CLAUDE.md`:
```markdown
# API Routes

## Pattern
All API routes use Next.js App Router route handlers.

## Structure
```
api/
├── auth/         # NextAuth routes (don't modify)
├── trpc/         # tRPC handler (don't modify)
├── webhooks/     # External webhooks
└── public/       # Unauthenticated endpoints
```

## Creating New Endpoints
Most new endpoints should be tRPC procedures, not route handlers.
Only use route handlers for:
- Webhooks (need raw body)
- Public APIs
- File uploads

## Authentication
All routes (except /public) require authentication.
Use `getServerSession` to get current user.
```

---

## 2.4 Templates for Different Project Types

### Template: Next.js Project

```markdown
# Next.js Project Configuration

## Stack
- Next.js [version] with App Router
- [Styling solution]
- [State management]
- [Database]

## File Conventions
- Pages in `app/` using file-system routing
- API routes in `app/api/`
- Components in `components/`
- Utilities in `lib/`

## Data Fetching
- Server Components for initial data
- Client Components with [SWR/TanStack Query] for dynamic data

## Key Files
- `middleware.ts` - Request middleware
- `next.config.js` - Next.js configuration
- `tailwind.config.ts` - Tailwind configuration
```

### Template: Python/FastAPI Project

```markdown
# Python FastAPI Project Configuration

## Stack
- Python [version]
- FastAPI
- SQLAlchemy / Pydantic
- PostgreSQL

## File Conventions
- Routes in `app/routes/`
- Models in `app/models/`
- Schemas in `app/schemas/`
- Services in `app/services/`

## Code Style
- Black formatter
- isort for imports
- Type hints required
- Docstrings for public functions

## Testing
- pytest
- Factory Boy for fixtures
- Coverage > 80%
```

### Template: CLI Tool Project

```markdown
# CLI Tool Configuration

## Stack
- [Language]
- [CLI framework]

## Structure
- `src/commands/` - Individual commands
- `src/utils/` - Shared utilities
- `src/config/` - Configuration handling

## Conventions
- Subcommand pattern (tool command subcommand)
- Help text for all commands
- Error messages to stderr
- JSON output option for scripting
```

---

## Lab: Build Your CLAUDE.md Library

**Duration**: 30 minutes

### Objective
Create a complete CLAUDE.md setup for your development environment.

### Requirements

1. **Global CLAUDE.md** (`~/.claude/CLAUDE.md`)
   - Your identity and preferences
   - Communication style
   - Technical preferences
   - Coding conventions

2. **Project CLAUDE.md** (at least one)
   - For a real project you work on
   - Complete architecture documentation
   - Common tasks documented

3. **Template Library**
   - At least 2 templates for project types you commonly use

### Deliverable
A working CLAUDE.md system that makes Claude immediately effective on your projects.

---

## Assessment Checklist

Before moving to Module 3, verify:

- [ ] Global CLAUDE.md is created and working
- [ ] You understand the context hierarchy
- [ ] You can create project-specific CLAUDE.md files
- [ ] You have templates for your common project types
- [ ] Claude's output matches your preferences

---

## Next Steps

You've defined your AI identity. In **Module 3: Custom Skills**, you'll learn to package your expertise into reusable skill files that give Claude domain-specific knowledge.

[Continue to Module 3 →](../03-custom-skills/)

---

## Resources

- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [CLAUDE.md Best Practices](https://docs.anthropic.com/claude-code/claude-md)
- [Example CLAUDE.md Files](https://github.com/anthropics/claude-code-examples)
