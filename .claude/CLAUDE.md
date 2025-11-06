# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based prompt generator tool designed to help users create well-structured prompts for Claude Code. The application guides users through building comprehensive coding prompts by providing templates (Build, Fix/Debug, Review/Optimize) and reusable snippets for common requirements.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production (runs TypeScript compiler + Vite build)
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Icons**: lucide-react
- **TypeScript**: Strict mode enabled with comprehensive linting rules

## Architecture

### Component Structure

The application is a single-page app with a monolithic component design:

- `src/main.tsx` - Application entry point with React 18 StrictMode
- `src/App.tsx` - Root component that renders the main generator
- `src/components/CodingPromptGenerator.tsx` - Main component (~480 lines) containing all UI logic

### CodingPromptGenerator Component

This is the core of the application and contains:

1. **Template System** (`templates` object):
   - Three prompt templates: `build`, `fix`, `review`
   - Each template has predefined fields, icons, descriptions, and default values
   - Templates control which form fields are visible via `showFields` array

2. **Snippet System** (`snippets` object):
   - Pre-written text snippets organized by category
   - Categories: `context`, `technical`, `constraints`, `acceptance`, `userFlow`, `errorHandling`, `testCases`
   - Snippets can be inserted into fields via "Add" buttons

3. **State Management**:
   - Uses React hooks (useState) for all state
   - Individual state variables for each form field (task, context, technical, etc.)
   - Template selection determines which fields are shown and pre-populated

4. **Prompt Generation**:
   - `generatePrompt()` function assembles all non-empty fields into a formatted markdown string
   - Format: `# Section Title\n{content}\n\n`
   - Quality indicator based on number of filled core vs enhanced fields

### UI Layout

Two-column responsive layout (stacks on mobile):
- **Left Column**: Template selector, core input fields, enhanced fields
- **Right Column**: Quality indicator, live prompt preview, quick tips

## TypeScript Configuration

- Strict mode enabled with additional linting checks
- Bundler module resolution (Vite-optimized)
- No emit mode (Vite handles bundling)
- Unused locals/parameters detection enabled

## Key Patterns

### Template Loading
When a template is selected via `loadTemplate()`, the component:
1. Sets the active template
2. Populates fields with template defaults
3. Clears enhanced fields (acceptance, userFlow, etc.)

### Snippet Insertion
`insertSnippet()` function:
- Takes a field key and snippet text
- Appends to existing field content (doesn't replace)
- Uses a mapping of field names to setter functions

### Quality Calculation
```typescript
const filledCore = [task, context, technical, constraints].filter(Boolean).length;
const filledEnhanced = [acceptance, userFlow, errorHandling, testCases].filter(Boolean).length;
const quality = filledCore >= 3 ? (filledEnhanced >= 2 ? 'excellent' : 'good') : 'basic';
```

## Styling Approach

- Tailwind utility classes throughout
- Color scheme: Blue for primary actions, slate for neutral UI
- Responsive breakpoints: Mobile-first, `md:` for tablets, `lg:` for desktop grid
- Active states use blue-500/600 borders and backgrounds

## Making Changes

### Adding a New Template
1. Add entry to `templates` object with name, icon, description, showFields, and defaults
2. Add conditional snippet buttons in the form fields based on template selection
3. Update the `TemplateKey` type if using TypeScript

### Adding New Snippets
1. Add to appropriate category in `snippets` object
2. Add corresponding `SnippetButton` in the relevant field section
3. Use conditional rendering if snippet is template-specific

### Adding New Form Fields
1. Add state variable with useState
2. Add to `showFields` array in relevant templates
3. Add setter to `setters` object in `insertSnippet()`
4. Add getter to `getters` object in `insertSnippet()`
5. Update `FieldKey` type
6. Add field to `generatePrompt()` function
7. Create UI section in the component return
