# Prompt Generator for Claude Code

A React-based tool that helps you create well-structured, comprehensive prompts for Claude Code. This interactive generator provides templates and reusable snippets to build effective coding prompts.

## Features

- **Three Prompt Templates**
  - **Build**: For creating new features or projects from scratch
  - **Fix/Debug**: For troubleshooting and resolving issues
  - **Review/Optimize**: For code review and performance improvements

- **Smart Snippets Library**: Pre-written text snippets for common requirements including:
  - Context and background information
  - Technical specifications
  - Constraints and requirements
  - Acceptance criteria
  - User flows
  - Error handling patterns
  - Test cases

- **Live Preview**: See your prompt update in real-time as you fill in the fields

- **Quality Indicator**: Visual feedback on prompt completeness to ensure you're providing enough context

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/promptGen.git

# Navigate to the project directory
cd promptGen

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

### Code Quality

```bash
# Run ESLint
npm run lint
```

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development with strict mode
- **Vite 5** - Fast build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## Project Structure

```
promptGen/
├── src/
│   ├── components/
│   │   └── CodingPromptGenerator.tsx  # Main generator component
│   ├── App.tsx                         # Root component
│   ├── main.tsx                        # Application entry point
│   └── index.css                       # Global styles
├── public/                             # Static assets
├── .claude/                            # Claude Code project instructions
└── package.json
```

## Usage

1. **Select a Template**: Choose from Build, Fix, or Review based on your needs
2. **Fill in Core Fields**: Provide task description, context, and technical details
3. **Add Enhanced Details**: Include acceptance criteria, user flows, error handling, or test cases
4. **Use Snippets**: Click "Add" buttons to insert pre-written snippets
5. **Copy Your Prompt**: Use the generated prompt with Claude Code

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

Built to enhance the Claude Code development experience by helping users create more effective and comprehensive coding prompts.
