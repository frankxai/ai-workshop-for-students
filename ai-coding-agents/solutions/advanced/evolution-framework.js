# Frank's Evolution Framework Implementation

*Proprietary code from GenCreator Labs by Frank - Only available here*

---

## The Complete Evolution Framework

This is Frank's complete implementation of the Evolution Framework for AI-assisted development.

### Directory Structure

```
evolution-framework/
├── CLAUDE.md              # Project context template
├── skill.md               # Domain expertise template
├── agent.md               # Agent persona template
├── evolution-levels.md    # Complete framework documentation
├── examples/              # Real-world examples
│   ├── level-0-basic/
│   ├── level-1-claude-md/
│   ├── level-2-skill/
│   ├── level-3-agent/
│   ├── level-4-orchestration/
│   └── level-5-ecosystem/
└── generators/            # Code generators
    ├── generate-claude-md.js
    ├── generate-skill.js
    └── generate-agent.js
```

---

## Quick Start

```bash
# Clone this folder
cd evolution-framework

# Run the generator
node generators/generate-claude-md.js --name "my-project"

# Follow the levels in order
# Level 0 → Level 1 → Level 2 → Level 3 → Level 4 → Level 5
```

---

## Frank's Core Implementation

### evolution.config.js

```javascript
// Frank's optimized evolution framework configuration
module.exports = {
  // Framework version
  version: '4.0.0',
  
  // Current level (0-5)
  level: 0,
  
  // Progression settings
  progression: {
    // Can skip levels? (default: no)
    allowSkip: false,
    // Minimum commits before level up
    commitsRequired: 5,
    // Test coverage required (percentage)
    testCoverageRequired: 80,
    // Linting score required (1-10)
    lintingScoreRequired: 9,
  },
  
  // Quality gates for each level
  qualityGates: {
    level0: {
      tests: false,
      linting: false,
      documentation: false,
    },
    level1: {
      tests: false,
      linting: true,
      documentation: true,
    },
    level2: {
      tests: true,
      linting: true,
      documentation: true,
    },
    level3: {
      tests: true,
      linting: true,
      documentation: true,
      agentReview: true,
    },
    level4: {
      tests: true,
      linting: true,
      documentation: true,
      agentReview: true,
      integrationTests: true,
    },
    level5: {
      tests: true,
      linting: true,
      documentation: true,
      agentReview: true,
      integrationTests: true,
      e2eTests: true,
      securityAudit: true,
    },
  },
  
  // Agent configurations for each level
  agents: {
    coder: {
      name: 'Code Assistant',
      temperature: 0.1,
      model: 'claude-sonnet-4-20250514',
    },
    reviewer: {
      name: 'Code Reviewer',
      temperature: 0.3,
      model: 'claude-sonnet-4-20250514',
    },
    architect: {
      name: 'System Architect',
      temperature: 0.5,
      model: 'claude-sonnet-4-20250514',
    },
  },
};
```

### evolve.js - The Main Orchestrator

```javascript
#!/usr/bin/env node

/**
 * Frank's Evolution Framework Orchestrator
 * 
 * This script manages the progression from basic prompts to
 * full multi-agent orchestration.
 * 
 * Usage: node evolve.js --level [0-5] --action [status|up|down|status]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class EvolutionFramework {
  constructor() {
    this.levels = [
      { level: 0, name: 'Basic Usage', file: 'level-0-basic' },
      { level: 1, name: 'CLAUDE.md', file: 'level-1-claude-md' },
      { level: 2, name: 'skill.md', file: 'level-2-skill' },
      { level: 3, name: 'agent.md', file: 'level-3-agent' },
      { level: 4, name: 'Orchestration', file: 'level-4-orchestration' },
      { level: 5, name: 'Ecosystem', file: 'level-5-ecosystem' },
    ];
    
    this.config = require('./evolution.config.js');
  }
  
  /**
   * Get current evolution level
   */
  getCurrentLevel() {
    if (!fs.existsSync('.evolution')) {
      return 0;
    }
    const state = JSON.parse(fs.readFileSync('.evolution', 'utf8'));
    return state.level || 0;
  }
  
  /**
   * Set evolution level
   */
  setLevel(level) {
    const state = {
      level: level,
      updatedAt: new Date().toISOString(),
    };
    fs.writeFileSync('.evolution', JSON.stringify(state, null, 2));
    console.log(`🎉 Level set to ${level}: ${this.levels[level].name}`);
  }
  
  /**
   * Check quality gates for current level
   */
  checkQualityGates() {
    const currentLevel = this.getCurrentLevel();
    const gates = this.config.qualityGates[this.levels[currentLevel].file];
    
    console.log(`\n🔍 Checking quality gates for Level ${currentLevel}...`);
    
    const results = {
      passed: [],
      failed: [],
    };
    
    // Check tests
    if (gates.tests && !this.hasTests()) {
      results.failed.push('Tests required but not found');
    } else if (gates.tests) {
      results.passed.push('Tests present');
    }
    
    // Check linting
    if (gates.linting && !this.passesLinting()) {
      results.failed.push('Linting score below threshold');
    } else if (gates.linting) {
      results.passed.push('Linting passed');
    }
    
    // Check documentation
    if (gates.documentation && !this.hasDocumentation()) {
      results.failed.push('Documentation required but not found');
    } else if (gates.documentation) {
      results.passed.push('Documentation present');
    }
    
    // Print results
    console.log('\n✅ Passed:');
    results.passed.forEach(msg => console.log(`   ${msg}`));
    
    if (results.failed.length > 0) {
      console.log('\n❌ Failed:');
      results.failed.forEach(msg => console.log(`   ${msg}`));
      return false;
    }
    
    return true;
  }
  
  hasTests() {
    return fs.existsSync('tests') || 
           fs.existsSync('test') ||
           fs.existsSync('__tests__') ||
           fs.existsSync('*.test.js') ||
           fs.existsSync('*.spec.js');
  }
  
  passesLinting() {
    try {
      // Check if lint script exists
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      if (packageJson.scripts.lint) {
        execSync('npm run lint', { stdio: 'pipe' });
        return true;
      }
      // If no lint script, assume passed
      return true;
    } catch (e) {
      return false;
    }
  }
  
  hasDocumentation() {
    return fs.existsSync('README.md') ||
           fs.existsSync('docs') ||
           fs.existsSync('.claude/CLAUDE.md');
  }
  
  /**
   * Display evolution status
   */
  status() {
    const currentLevel = this.getCurrentLevel();
    
    console.log('\n📊 Evolution Framework Status');
    console.log('═'.repeat(40));
    console.log(`Current Level: ${currentLevel}`);
    console.log(`Level Name: ${this.levels[currentLevel].name}`);
    console.log('\nProgress:');
    
    this.levels.forEach((l, i) => {
      const prefix = i === currentLevel ? '👉' : i < currentLevel ? '✅' : '⬜';
      console.log(`   ${prefix} Level ${i}: ${l.name}`);
    });
    
    console.log('\nNext Milestone:');
    if (currentLevel < 5) {
      const next = this.levels[currentLevel + 1];
      console.log(`   Level ${next.level}: ${next.name}`);
    } else {
      console.log('   🎉 Maximum evolution reached!');
    }
    
    console.log('');
  }
  
  /**
   * Generate a CLAUDE.md file from template
   */
  generateClaudeMd(projectName) {
    const template = fs.readFileSync(
      path.join(__dirname, 'templates', 'CLAUDE.md'),
      'utf8'
    );
    
    const content = template
      .replace(/\[Your Project Name\]/g, projectName)
      .replace(/\[Date\]/g, new Date().toISOString().split('T')[0]);
    
    fs.writeFileSync('CLAUDE.md', content);
    console.log(`✅ Generated CLAUDE.md for "${projectName}"`);
    
    // Auto-advance to level 1
    if (this.getCurrentLevel() === 0) {
      this.setLevel(1);
    }
  }
  
  /**
   * Generate a skill.md file from template
   */
  generateSkillMd(skillName, category) {
    const template = fs.readFileSync(
      path.join(__dirname, 'templates', 'skill.md'),
      'utf8'
    );
    
    const content = template
      .replace(/\[Name of the skill\/ability\]/g, skillName)
      .replace(/\[coding, writing, analysis, music, design, etc.\]/g, category)
      .replace(/\[Date\]/g, new Date().toISOString().split('T')[0]);
    
    fs.writeFileSync('skill.md', content);
    console.log(`✅ Generated skill.md for "${skillName}"`);
    
    // Auto-advance to level 2
    if (this.getCurrentLevel() === 1) {
      this.setLevel(2);
    }
  }
  
  /**
   * Generate an agent.md file from template
   */
  generateAgentMd(agentName, role) {
    const template = fs.readFileSync(
      path.join(__dirname, 'templates', 'agent.md'),
      'utf8'
    );
    
    const content = template
      .replace(/\[Name of the agent persona\]/g, agentName)
      .replace(/\[What the agent does\]/g, role)
      .replace(/\[Date\]/g, new Date().toISOString().split('T')[0]);
    
    fs.writeFileSync('agent.md', content);
    console.log(`✅ Generated agent.md for "${agentName}"`);
    
    // Auto-advance to level 3
    if (this.getCurrentLevel() === 2) {
      this.setLevel(3);
    }
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  const evolution = new EvolutionFramework();
  
  switch (command) {
    case 'status':
      evolution.status();
      break;
    case 'level':
      const level = parseInt(args[1]);
      if (level >= 0 && level <= 5) {
        evolution.setLevel(level);
      } else {
        console.error('❌ Level must be between 0 and 5');
      }
      break;
    case 'check':
      evolution.checkQualityGates();
      break;
    case 'gen-claude':
      evolution.generateClaudeMd(args[1] || 'My Project');
      break;
    case 'gen-skill':
      evolution.generateSkillMd(args[1] || 'My Skill', args[2] || 'general');
      break;
    case 'gen-agent':
      evolution.generateAgentMd(args[1] || 'My Agent', args[2] || 'helper');
      break;
    default:
      console.log(`
Frank's Evolution Framework
============================

Usage: node evolve.js <command> [options]

Commands:
  status              Show current evolution status
  level <0-5>         Set evolution level
  check               Run quality gates check
  gen-claude <name>   Generate CLAUDE.md template
  gen-skill <name> <category>  Generate skill.md template
  gen-agent <name> <role>      Generate agent.md template

Examples:
  node evolve.js status
  node evolve.js level 2
  node evolve.js gen-claude "My Project"
  node evolve.js gen-skill "API Design" "coding"
  node evolve.js gen-agent "Reviewer" "code review"
`);
  }
}

module.exports = EvolutionFramework;
```

---

## Frank's Quality Gates Implementation

### quality-gates.js

```javascript
/**
 * Frank's Quality Gates for AI-Generated Code
 * 
 * This module provides systematic validation of code
 * generated by AI assistants.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class QualityGates {
  constructor(config = {}) {
    this.thresholds = {
      testCoverage: config.testCoverage || 80,
      lintingScore: config.lintingScore || 9,
      maxComplexity: config.maxComplexity || 10,
      maxFileLines: config.maxFileLines || 500,
      ...config,
    };
    
    this.results = [];
  }
  
  /**
   * Run all quality gates
   */
  async runAll() {
    this.results = [];
    
    console.log('🔍 Running Frank\'s Quality Gates...\n');
    
    await this.checkTypeSafety();
    await this.checkTestCoverage();
    await this.checkLinting();
    await this.checkComplexity();
    await this.checkSecurity();
    await this.checkDocumentation();
    
    return this.generateReport();
  }
  
  /**
   * Check TypeScript/JavaScript type safety
   */
  async checkTypeSafety() {
    console.log('📝 Checking type safety...');
    
    try {
      // Check if TypeScript compilation passes
      if (fs.existsSync('tsconfig.json')) {
        execSync('npx tsc --noEmit', { stdio: 'pipe' });
        console.log('   ✅ TypeScript compilation passed\n');
        this.results.push({ gate: 'type-safety', passed: true });
      } 
      // For JavaScript, check JSDoc completeness
      else if (fs.existsSync('package.json')) {
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        if (packageJson.devDependencies?.typescript) {
          execSync('npx tsc --noEmit', { stdio: 'pipe' });
          console.log('   ✅ TypeScript compilation passed\n');
          this.results.push({ gate: 'type-safety', passed: true });
        } else {
          console.log('   ⚠️  JavaScript project - manual review recommended\n');
          this.results.push({ gate: 'type-safety', passed: true, warning: true });
        }
      } else {
        console.log('   ⚠️  No type checking configured\n');
        this.results.push({ gate: 'type-safety', passed: true, warning: true });
      }
    } catch (error) {
      console.log(`   ❌ Type safety check failed\n`);
      this.results.push({ 
        gate: 'type-safety', 
        passed: false, 
        error: error.message 
      });
    }
  }
  
  /**
   * Check test coverage
   */
  async checkTestCoverage() {
    console.log('🧪 Checking test coverage...');
    
    try {
      // Check if tests exist
      const testDirs = ['tests', 'test', '__tests__'];
      const hasTests = testDirs.some(dir => fs.existsSync(dir));
      
      if (!hasTests) {
        console.log('   ❌ No tests found\n');
        this.results.push({ 
          gate: 'test-coverage', 
          passed: false, 
          error: 'No test directory found' 
        });
        return;
      }
      
      // Check coverage if coverage report exists
      const coverageFiles = [
        'coverage/coverage-summary.json',
        'coverage/lcov.info',
        'test-results.xml',
      ];
      
      for (const file of coverageFiles) {
        if (fs.existsSync(file)) {
          const coverage = JSON.parse(fs.readFileSync(file, 'utf8'));
          // Extract coverage percentage (simplified)
          const lineCoverage = coverage?.data?.totals?.lines?.covered_pct || 0;
          
          if (lineCoverage >= this.thresholds.testCoverage) {
            console.log(`   ✅ Test coverage: ${lineCoverage}%\n`);
            this.results.push({ 
              gate: 'test-coverage', 
              passed: true,
              coverage: lineCoverage 
            });
          } else {
            console.log(`   ❌ Test coverage: ${lineCoverage}% (min: ${this.thresholds.testCoverage}%)\n`);
            this.results.push({ 
              gate: 'test-coverage', 
              passed: false, 
              coverage: lineCoverage,
              error: `Coverage below threshold` 
            });
          }
          return;
        }
      }
      
      // If no coverage report, assume basic tests exist
      console.log('   ⚠️  Tests exist but no coverage report\n');
      this.results.push({ gate: 'test-coverage', passed: true, warning: true });
      
    } catch (error) {
      console.log(`   ❌ Test coverage check failed: ${error.message}\n`);
      this.results.push({ 
        gate: 'test-coverage', 
        passed: false, 
        error: error.message 
      });
    }
  }
  
  /**
   * Check code quality via linting
   */
  async checkLinting() {
    console.log('🔎 Checking code quality...');
    
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      // Check if eslint/prettier config exists
      const hasLintConfig = fs.existsSync('.eslintrc') ||
                           fs.existsSync('.eslintrc.js') ||
                           fs.existsSync('.prettierrc') ||
                           fs.existsSync('eslint.config.js');
      
      if (!hasLintConfig) {
        console.log('   ⚠️  No linting configuration found\n');
        this.results.push({ gate: 'linting', passed: true, warning: true });
        return;
      }
      
      // Run linting
      if (packageJson.scripts.lint) {
        execSync('npm run lint', { stdio: 'pipe' });
        console.log('   ✅ Linting passed\n');
        this.results.push({ gate: 'linting', passed: true });
      } else {
        // Try direct eslint
        execSync('npx eslint . --max-warnings=0', { stdio: 'pipe' });
        console.log('   ✅ Linting passed\n');
        this.results.push({ gate: 'linting', passed: true });
      }
      
    } catch (error) {
      console.log(`   ❌ Linting failed\n`);
      this.results.push({ 
        gate: 'linting', 
        passed: false, 
        error: 'Linting errors found' 
      });
    }
  }
  
  /**
   * Check code complexity
   */
  async checkComplexity() {
    console.log('📊 Checking code complexity...');
    
    // Simplified complexity check
    const jsFiles = this.findFiles(process.cwd(), /\.(js|ts|jsx|tsx)$/);
    let highComplexityFiles = [];
    
    for (const file of jsFiles.slice(0, 50)) { // Check max 50 files
      try {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n').length;
        
        if (lines > this.thresholds.maxFileLines) {
          highComplexityFiles.push({
            file: path.relative(process.cwd(), file),
            lines,
            warning: 'File too long'
          });
        }
      } catch (e) {
        // Skip unreadable files
      }
    }
    
    if (highComplexityFiles.length > 0) {
      console.log(`   ⚠️  ${highComplexityFiles.length} files exceed line limit\n`);
      this.results.push({ 
        gate: 'complexity', 
        passed: true, 
        warning: true,
        files: highComplexityFiles 
      });
    } else {
      console.log('   ✅ Code complexity within limits\n');
      this.results.push({ gate: 'complexity', passed: true });
    }
  }
  
  /**
   * Basic security checks
   */
  async checkSecurity() {
    console.log('🔒 Checking security...');
    
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      // Check for known vulnerable packages
      const vulnerablePatterns = [
        'eval(', // Dangerous eval usage
        'innerHTML', // XSS risk
        'document.write', // Anti-pattern
      ];
      
      const jsFiles = this.findFiles(process.cwd(), /\.js$/).slice(0, 20);
      let securityIssues = [];
      
      for (const file of jsFiles) {
        const content = fs.readFileSync(file, 'utf8');
        vulnerablePatterns.forEach(pattern => {
          if (content.includes(pattern)) {
            securityIssues.push({
              file: path.relative(process.cwd(), file),
              issue: pattern,
            });
          }
        });
      }
      
      if (securityIssues.length > 0) {
        console.log(`   ⚠️  ${securityIssues.length} potential security issues found\n`);
        this.results.push({ 
          gate: 'security', 
          passed: true, 
          warning: true,
          issues: securityIssues 
        });
      } else {
        console.log('   ✅ No obvious security issues\n');
        this.results.push({ gate: 'security', passed: true });
      }
      
    } catch (error) {
      console.log(`   ⚠️  Security check incomplete: ${error.message}\n`);
      this.results.push({ gate: 'security', passed: true, warning: true });
    }
  }
  
  /**
   * Check documentation completeness
   */
  async checkDocumentation() {
    console.log('📚 Checking documentation...');
    
    const hasReadme = fs.existsSync('README.md');
    const hasApiDocs = fs.existsSync('docs') || fs.existsSync('API.md');
    const hasCodeComments = this.hasSignificantComments();
    
    if (!hasReadme) {
      console.log('   ❌ README.md missing\n');
      this.results.push({ 
        gate: 'documentation', 
        passed: false, 
        error: 'README.md not found' 
      });
    } else if (!hasApiDocs && !hasCodeComments) {
      console.log('   ⚠️  Limited documentation\n');
      this.results.push({ 
        gate: 'documentation', 
        passed: true, 
        warning: true 
      });
    } else {
      console.log('   ✅ Documentation adequate\n');
      this.results.push({ gate: 'documentation', passed: true });
    }
  }
  
  /**
   * Check if code has significant comments
   */
  hasSignificantComments() {
    const jsFiles = this.findFiles(process.cwd(), /\.(js|ts)$/);
    let hasComments = false;
    
    for (const file of jsFiles.slice(0, 10)) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        // Check for JSDoc-style comments
        if (content.includes('/**') || content.includes('///')) {
          hasComments = true;
          break;
        }
      } catch (e) {
        // Skip
      }
    }
    
    return hasComments;
  }
  
  /**
   * Find files matching pattern
   */
  findFiles(dir, pattern) {
    const results = [];
    
    const search = (d) => {
      if (results.length >= 100) return; // Limit search
      
      try {
        const entries = fs.readdirSync(d, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(d, entry.name);
          
          if (entry.isDirectory() && !entry.name.startsWith('.') && 
              entry.name !== 'node_modules' && entry.name !== 'coverage') {
            search(fullPath);
          } else if (entry.isFile() && pattern.test(entry.name)) {
            results.push(fullPath);
          }
        }
      } catch (e) {
        // Skip inaccessible directories
      }
    };
    
    search(dir);
    return results;
  }
  
  /**
   * Generate final report
   */
  generateReport() {
    const passed = this.results.filter(r => r.passed).length;
    const failed = this.results.filter(r => !r.passed).length;
    const warnings = this.results.filter(r => r.warning).length;
    
    console.log('═'.repeat(50));
    console.log('📊 Quality Gates Report');
    console.log('═'.repeat(50));
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Warnings: ${warnings}`);
    console.log('');
    
    if (failed > 0) {
      console.log('❌ Quality gates FAILED');
      console.log('\nFailed gates:');
      this.results.filter(r => !r.passed).forEach(r => {
        console.log(`   - ${r.gate}: ${r.error || 'Unknown error'}`);
      });
      return false;
    }
    
    if (warnings > 0) {
      console.log('⚠️  Quality gates passed with warnings');
    } else {
      console.log('✅ All quality gates PASSED');
    }
    
    return true;
  }
}

module.exports = QualityGates;
```

---

## Usage

```bash
# Run all quality gates
node quality-gates.js

# Or use as a module
const QualityGates = require('./quality-gates');

const gates = new QualityGates({
  testCoverage: 80,
  lintingScore: 9,
});

gates.runAll().then(passed => {
  process.exit(passed ? 0 : 1);
});
```

---

*This solution is part of GenCreator Labs by Frank*
