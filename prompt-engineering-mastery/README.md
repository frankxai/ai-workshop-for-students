# Prompt Engineering Mastery Workshop
**From Basic Commands to Advanced AI Orchestration**

---

## Workshop Overview

Master the art and science of communicating with AI. Learn systematic prompt engineering techniques that consistently produce excellent results across any AI system.

**Duration**: 2 days | **Level**: All Levels | **Foundation for All AI Work**

---

## Why Prompt Engineering Matters

```
NOVICE PROMPTS                       ENGINEERED PROMPTS
──────────────                       ─────────────────
Vague requests                 →    Precise instructions
Hit-or-miss results            →    Consistent quality
Frustrating iterations         →    First-attempt success
Generic outputs                →    Tailored responses
Wasted tokens                  →    Efficient communication
```

---

## The FrankX Prompt Framework

### The 5C Structure

Every effective prompt contains these elements:

| Component | Purpose | Example |
|-----------|---------|---------|
| **Context** | Background information | "I'm building a Next.js e-commerce site" |
| **Constraints** | Rules and boundaries | "Use TypeScript, no external libraries" |
| **Command** | The actual request | "Create a shopping cart component" |
| **Clarifications** | Edge cases, preferences | "Handle empty cart state" |
| **Completion** | Output format | "Include usage example" |

---

## Workshop Structure

### Module 1: Fundamentals (2 hours)

Understanding how AI processes prompts.

**How LLMs Read Your Prompts**:
```
┌─────────────────────────────────────────────────────────────┐
│                    PROMPT PROCESSING                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   YOUR TEXT                                                  │
│       │                                                      │
│       ▼                                                      │
│   ┌───────────────┐                                         │
│   │  Tokenization │  "Hello world" → [15496, 995]           │
│   └───────┬───────┘                                         │
│           │                                                  │
│           ▼                                                  │
│   ┌───────────────┐                                         │
│   │   Attention   │  Which words relate to which?           │
│   │   Mechanism   │  Context determines meaning             │
│   └───────┬───────┘                                         │
│           │                                                  │
│           ▼                                                  │
│   ┌───────────────┐                                         │
│   │   Response    │  Most likely next tokens                │
│   │  Generation   │  Based on patterns learned              │
│   └───────────────┘                                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Key Principles**:
1. Order matters - earlier context has more weight
2. Specific beats vague every time
3. Examples are worth 1000 instructions
4. Structure helps AI parse your request

[Start Module 1 →](./01-fundamentals/)

---

### Module 2: The 5C Framework (2 hours)

Master the systematic approach to prompt construction.

**Context Setting**:
```markdown
BAD:  "Write some code"
GOOD: "I'm a senior developer working on a Node.js
       microservice that handles payment processing.
       Our stack includes Express, TypeScript, and PostgreSQL."
```

**Constraint Definition**:
```markdown
BAD:  "Make it good"
GOOD: "Requirements:
       - TypeScript strict mode
       - No external dependencies beyond express
       - Error handling for all edge cases
       - Unit test coverage >80%"
```

**Clear Commands**:
```markdown
BAD:  "Do the API thing"
GOOD: "Create a POST endpoint at /api/payments/process
       that accepts {amount, currency, customerId} and
       returns {transactionId, status, timestamp}"
```

**Clarifications**:
```markdown
"Edge cases to handle:
 - Invalid currency codes → return 400
 - Customer not found → return 404
 - Insufficient funds → return 402"
```

**Completion Format**:
```markdown
"Output format:
 1. The endpoint code
 2. Type definitions
 3. Example curl command
 4. Unit test example"
```

[Start Module 2 →](./02-five-c-framework/)

---

### Module 3: Advanced Techniques (3 hours)

Professional prompt engineering patterns.

**Chain-of-Thought Prompting**:
```markdown
"Think through this step by step:
1. First, analyze the current implementation
2. Identify potential issues
3. Propose improvements
4. Implement the best solution
5. Verify it works"
```

**Few-Shot Learning**:
```markdown
"Convert these function names to kebab-case:

getUserById → get-user-by-id
createNewPost → create-new-post
validateEmailFormat → validate-email-format

Now convert:
fetchAllProducts →"
```

**Role Prompting**:
```markdown
"You are a senior security engineer conducting a code
review. Analyze this authentication code for:
- OWASP Top 10 vulnerabilities
- Best practice violations
- Potential attack vectors"
```

**Structured Output**:
```markdown
"Respond in JSON format:
{
  \"analysis\": \"...\",
  \"issues\": [...],
  \"recommendations\": [...],
  \"priority\": \"high|medium|low\"
}"
```

[Start Module 3 →](./03-advanced-techniques/)

---

### Module 4: Domain-Specific Prompting (2 hours)

Specialized prompts for different tasks.

**Code Generation**:
```markdown
"Generate a [Language] function that:
- Purpose: [What it does]
- Inputs: [Parameters with types]
- Outputs: [Return value]
- Constraints: [Requirements]
- Example usage: [Show me how to call it]"
```

**Code Review**:
```markdown
"Review this code for:
1. Security vulnerabilities
2. Performance issues
3. Code quality
4. Best practice violations

Format: Use headings for each category,
bullet points for issues,
severity ratings (🔴 Critical, 🟡 Warning, 🟢 Suggestion)"
```

**Documentation**:
```markdown
"Document this function with:
- JSDoc/docstring format
- Parameter descriptions
- Return value explanation
- Usage example
- Edge case notes"
```

**Debugging**:
```markdown
"I'm getting this error: [Error message]

Context:
- Code: [Relevant code]
- Expected: [What should happen]
- Actual: [What's happening]

Help me:
1. Understand why this happens
2. Find the root cause
3. Fix it
4. Prevent it in future"
```

[Start Module 4 →](./04-domain-specific/)

---

### Module 5: Prompt Templates (2 hours)

Build your personal prompt library.

**Creating Templates**:
```markdown
# Template: Feature Implementation

## Context
Project: {{PROJECT_NAME}}
Stack: {{TECH_STACK}}
Current state: {{CURRENT_STATE}}

## Request
Implement {{FEATURE_NAME}} that {{FEATURE_DESCRIPTION}}

## Requirements
- {{REQUIREMENT_1}}
- {{REQUIREMENT_2}}
- {{REQUIREMENT_3}}

## Constraints
- {{CONSTRAINT_1}}
- {{CONSTRAINT_2}}

## Output Format
1. Implementation plan
2. Code with comments
3. Tests
4. Documentation
```

**Template Categories**:
- Code generation
- Refactoring
- Review
- Documentation
- Debugging
- Learning
- Creative

[Start Module 5 →](./05-prompt-templates/)

---

### Module 6: Multi-Turn Conversations (1.5 hours)

Master extended AI conversations.

**Conversation Design**:
```
TURN 1: Set context and overall goal
TURN 2: Break down into subtasks
TURN 3: Execute first subtask
TURN 4: Review and refine
TURN 5: Continue to next subtask
...
FINAL: Summarize and verify
```

**Context Management**:
```markdown
"Let's continue from where we left off.
So far we've:
- ✅ Created the database schema
- ✅ Built the API endpoints
- 🔄 Currently: Implementing authentication

Next step: [Your request]"
```

**Steering Conversations**:
```markdown
"That's close, but adjust:
- Keep the structure
- Change X to Y
- Add Z consideration
- Remove the part about W"
```

[Start Module 6 →](./06-multi-turn/)

---

## Labs

### Lab 1: 5C Practice (45 min)
Transform vague requests into structured prompts.

### Lab 2: Chain-of-Thought (45 min)
Use CoT prompting for complex problems.

### Lab 3: Template Building (1 hour)
Create 5 personal prompt templates.

### Lab 4: Domain Mastery (1 hour)
Build prompts for your specific field.

### Lab 5: Conversation Design (45 min)
Plan and execute a multi-turn project.

---

## Capstone Project

**Build Your Prompt Library**

Create a personal collection of:
- [ ] 5 code generation templates
- [ ] 3 code review templates
- [ ] 3 documentation templates
- [ ] 3 debugging templates
- [ ] 5 domain-specific templates
- [ ] Documentation with examples

---

## Prompt Quality Checklist

Before sending a prompt:

- [ ] **Context** - Does AI know enough background?
- [ ] **Specificity** - Is the request precise?
- [ ] **Format** - Did I specify output format?
- [ ] **Examples** - Would an example help?
- [ ] **Constraints** - Are boundaries clear?
- [ ] **Edge cases** - Did I mention special cases?

---

## Common Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Vague requests | "Make it better" | Specify what "better" means |
| Missing context | Assumes AI knows project | Provide relevant background |
| Information dump | Too much irrelevant info | Curate to essentials |
| No format spec | Unpredictable output | Define expected format |
| Single-shot complex | Overwhelming request | Break into steps |

---

## Resources

### Templates
- [FrankX Prompt Library](/prompt-library)
- [Community Templates](https://github.com/frankx-ai/prompts)

### Tools
- Claude Code (prompts in CLAUDE.md)
- Prompt versioning systems
- A/B testing frameworks

### Further Learning
- AI Coding Agents Workshop
- MCP Server Workshop
- Evolution Framework

---

## Start Mastering Prompts

Ready to communicate effectively with AI?

**[Begin with Module 1: Fundamentals →](./01-fundamentals/)**

---

*The foundation of all AI work - master this, master AI.*
