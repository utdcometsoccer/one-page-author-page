# Repository Documentation Standards

## Markdown Files Location

All project documentation should be stored in the `/docs` folder at the root of the repository.

### Rationale

1. **Organization**: Keeping all documentation in a dedicated folder makes it easy to find and maintain.
2. **Separation of Concerns**: Documentation is separate from code, configuration, and assets.
3. **Clarity**: New contributors immediately know where to look for project information.
4. **Best Practice**: This follows industry-standard conventions for repository organization.

### Documentation Structure

```bash
docs/
├── DESIGN-SYSTEM.md       # Design system and component documentation
├── DEPLOYMENT.md          # Deployment procedures and configuration
├── TELEMETRY.md          # Analytics and tracking documentation
├── UI-UX-ANALYSIS.md     # UI/UX analysis and recommendations
├── UI-UX-CHECKLIST.md    # Quick reference for UI/UX best practices
├── SEO-GUIDE.md          # SEO implementation guide
└── MARKETING/            # Marketing and promotion strategies
    ├── SOCIAL-MEDIA.md   # Social media strategy
    ├── EMAIL-CAMPAIGNS.md # Email marketing plans
    ├── BLOGGER-OUTREACH.md # Blogger engagement strategy
    ├── MEDIA-OUTREACH.md  # Podcaster, YouTuber, and traditional media plans
    └── OPPORTUNITIES.md   # Additional promotional opportunities
```

### Guidelines for New Documentation

- Use clear, descriptive filenames in UPPERCASE with hyphens (e.g., `API-REFERENCE.md`)
- Include a table of contents for documents longer than 3 sections
- Use proper Markdown formatting for readability
- Keep documentation up-to-date with code changes
- Cross-reference related documents when appropriate
- **Run `npm run lint:docs` before committing to ensure documentation follows linting standards**

## Markdown Linting

This repository uses [markdownlint](https://github.com/DavidAnson/markdownlint) to ensure consistent markdown formatting across all documentation files.

### Running the Linter

```bash
# Lint all markdown files
npm run lint:docs

# Auto-fix issues (when possible)
npx markdownlint "**/*.md" --ignore node_modules --fix
```

### Linting Configuration

Markdown linting rules are configured in `.markdownlint.json` at the repository root. Key rules:

- **MD013** (line-length): Disabled - allows long lines for readability
- **MD033** (no-inline-html): Disabled - allows HTML in markdown when needed
- **MD041** (first-line-heading): Disabled - flexible first line
- **MD024** (no-duplicate-heading): Only enforces uniqueness among sibling headings
- **MD036** (no-emphasis-as-heading): Disabled - allows bold text for emphasis
- **MD060** (table-column-style): Disabled - flexible table formatting

### Common Markdown Best Practices

1. **Headings**: Surround headings with blank lines (before and after)
2. **Lists**: Add blank lines before and after lists
3. **Code Blocks**: Always specify the language for fenced code blocks

   ```markdown
   ​```javascript
   const example = "Good";
   ​```
   ```

4. **Ordered Lists**: Start each new section's numbered list from 1
5. **Blank Lines**: Use blank lines to separate different content blocks

### What Should Not Go in /docs

- Code files (`.ts`, `.tsx`, `.js`, etc.)
- Configuration files (`.json`, `.yaml`, `.config.js`, etc.)
- Build artifacts
- Temporary notes or work-in-progress files (use `/tmp` for these)

### Updating Documentation

When making changes that affect existing documentation:

1. Update the relevant documentation file in the same PR as the code changes
2. If creating a new feature, add corresponding documentation
3. Reference the documentation update in your PR description
