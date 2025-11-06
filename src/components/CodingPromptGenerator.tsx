import { useState } from 'react';
import { Copy, Check, Wand2, AlertCircle, Plus, Sparkles, Rocket, RefreshCw } from 'lucide-react';

const templates = {
  build: {
    name: 'Build Something',
    icon: Rocket,
    description: 'New features, components, APIs, or projects',
    showFields: ['task', 'context', 'technical', 'constraints', 'acceptance', 'userFlow'],
    defaults: {
      task: '',
      context: '',
      technical: '',
      constraints: ''
    }
  },
  fix: {
    name: 'Fix/Debug',
    icon: AlertCircle,
    description: 'Debug errors, refactor code, or fix issues',
    showFields: ['task', 'context', 'technical', 'constraints', 'errorHandling', 'testCases'],
    defaults: {
      task: 'Debug and fix an error',
      context: '',
      technical: 'Analyze root cause. Check related files and dependencies.',
      constraints: 'Fix should not introduce new bugs. Add error handling to prevent recurrence.'
    }
  },
  review: {
    name: 'Review/Optimize',
    icon: RefreshCw,
    description: 'Code reviews, refactoring, or optimization',
    showFields: ['task', 'context', 'technical', 'constraints', 'testCases'],
    defaults: {
      task: 'Review and improve existing code',
      context: '',
      technical: 'Check for bugs, performance issues, security concerns, and best practices.',
      constraints: 'Preserve all existing functionality. Maintain backward compatibility.'
    }
  }
};

const snippets = {
  context: {
    projectSetup: 'Starting a new project. Need proper foundation with modern tech stack and best practices.',
    userStory: 'USER STORY: As a [role], I want to [action] so that [benefit].',
    errorDetails: 'ERROR MESSAGE:\n[Paste exact error and stack trace]\n\nWHAT I EXPECTED: [behavior]\nWHAT HAPPENED: [actual behavior]\nRECENT CHANGES: [list changes]',
    designReference: 'DESIGN REFERENCE:\n[Attach/describe wireframe or mockup]\n\nKey visual elements:\n- [Element 1]\n- [Element 2]',
    apiContext: 'Endpoint purpose: [what it does]\nWho calls it: [frontend/service]\nData flow: Request → Processing → Response'
  },
  technical: {
    reactStack: 'React 18 with TypeScript, Tailwind CSS for styling, functional components with hooks',
    nodeStack: 'Node.js/Express with TypeScript, RESTful conventions, comprehensive error handling',
    database: 'PostgreSQL with parameterized queries, proper indexing, transaction safety',
    testing: 'Include unit tests. Follow test-driven development practices.',
    accessibility: 'WCAG 2.1 AA compliant. Keyboard navigation. Screen reader support. Proper ARIA labels.',
    performance: 'Optimize for performance. Lazy loading. Code splitting. Minimize bundle size.'
  },
  constraints: {
    security: 'Security: Input validation, SQL injection prevention, XSS protection, proper authentication',
    mobile: 'Responsive: Works on mobile, tablet, desktop. Touch-friendly interactions.',
    compatibility: 'Browser support: Chrome, Firefox, Safari, Edge (latest 2 versions)',
    noBreaking: 'CRITICAL: Do not break existing functionality. Maintain backward compatibility.',
    errorStates: 'Must handle all error states gracefully with user-friendly messages'
  },
  acceptance: {
    featureDone: '- [ ] Core functionality works correctly\n- [ ] Error handling implemented\n- [ ] Works on mobile and desktop\n- [ ] Code is well-documented',
    uiDone: '- [ ] Matches design/wireframe\n- [ ] All interaction states work (hover, active, disabled, loading, error)\n- [ ] Accessible via keyboard and screen reader\n- [ ] Responsive across breakpoints',
    apiDone: '- [ ] Returns correct data format\n- [ ] Validates all inputs\n- [ ] Proper HTTP status codes\n- [ ] Handles errors gracefully\n- [ ] Includes API documentation',
    debugDone: '- [ ] Error no longer occurs\n- [ ] Root cause identified and explained\n- [ ] Added preventive measures\n- [ ] All existing features still work'
  },
  userFlow: {
    uiStates: 'INTERACTION STATES:\n• Default: [appearance]\n• Hover: [appearance]\n• Active/Clicked: [behavior]\n• Disabled: [appearance]\n• Loading: [show spinner/skeleton]\n• Error: [show error message]',
    featureFlow: 'USER FLOW:\n1. User [action]\n2. System [response]\n3. User sees [result]\n4. User can [next action]',
    formFlow: 'FORM FLOW:\n1. User fills [fields]\n2. Validates [requirements]\n3. Submits → Loading state\n4. Success: [confirmation] OR Error: [helpful message]'
  },
  errorHandling: {
    apiErrors: 'API ERRORS:\n• 400 Invalid input → "Please check your input: [specific issue]"\n• 401 Unauthorized → "Please log in to continue"\n• 404 Not found → "Resource not found"\n• 500 Server error → "Something went wrong. Please try again"',
    uiErrors: 'UI ERRORS:\n• Empty state → Show helpful message and call-to-action\n• Load failure → Show retry button\n• Network offline → Show offline indicator\n• Validation error → Highlight field with specific message',
    formErrors: 'FORM VALIDATION:\n• Required fields → "This field is required"\n• Invalid format → "[Field] must be [format]"\n• Already exists → "[Item] already exists"\n• Show errors inline, near the relevant field'
  },
  testCases: {
    basic: 'TESTS:\n• Happy path: [expected behavior]\n• Empty data: [how to handle]\n• Invalid input: [error shown]\n• Edge case: [boundary conditions]',
    ui: 'UI TESTS:\n• Component renders correctly\n• User interactions work (click, hover, keyboard)\n• Loading states display\n• Error states display\n• Responsive behavior works',
    api: 'API TESTS:\n• Valid request returns 200\n• Invalid input returns 400 with details\n• Missing auth returns 401\n• Non-existent resource returns 404\n• Server error returns 500'
  }
};

type TemplateKey = keyof typeof templates;
type FieldKey = 'context' | 'technical' | 'constraints' | 'acceptance' | 'userFlow' | 'errorHandling' | 'testCases';

export default function CodingPromptGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('build');
  const [task, setTask] = useState('');
  const [context, setContext] = useState('');
  const [technical, setTechnical] = useState('');
  const [constraints, setConstraints] = useState('');
  const [acceptance, setAcceptance] = useState('');
  const [userFlow, setUserFlow] = useState('');
  const [errorHandling, setErrorHandling] = useState('');
  const [testCases, setTestCases] = useState('');
  const [copied, setCopied] = useState(false);

  const currentTemplate = templates[selectedTemplate];
  const showField = (field: string) => currentTemplate.showFields.includes(field);

  const loadTemplate = (templateKey: TemplateKey) => {
    setSelectedTemplate(templateKey);
    const template = templates[templateKey];
    setTask(template.defaults.task || '');
    setContext(template.defaults.context || '');
    setTechnical(template.defaults.technical || '');
    setConstraints(template.defaults.constraints || '');
    setAcceptance('');
    setUserFlow('');
    setErrorHandling('');
    setTestCases('');
  };

  const insertSnippet = (field: FieldKey, snippetText: string) => {
    const setters: Record<FieldKey, (value: string) => void> = {
      context: setContext,
      technical: setTechnical,
      constraints: setConstraints,
      acceptance: setAcceptance,
      userFlow: setUserFlow,
      errorHandling: setErrorHandling,
      testCases: setTestCases
    };

    const getters: Record<FieldKey, string> = {
      context, technical, constraints, acceptance, userFlow, errorHandling, testCases
    };

    const currentValue = getters[field];
    const newValue = currentValue ? `${currentValue}\n\n${snippetText}` : snippetText;
    setters[field](newValue);
  };

  const SnippetButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors"
    >
      <Plus className="w-3 h-3" />
      {label}
    </button>
  );

  const generatePrompt = () => {
    let prompt = '';
    
    if (task) prompt += `# Task\n${task}\n\n`;
    if (context) prompt += `# Context\n${context}\n\n`;
    if (userFlow) prompt += `# User Flow / Interaction States\n${userFlow}\n\n`;
    if (acceptance) prompt += `# Acceptance Criteria\n${acceptance}\n\n`;
    if (technical) prompt += `# Technical Requirements\n${technical}\n\n`;
    if (constraints) prompt += `# Constraints\n${constraints}\n\n`;
    if (errorHandling) prompt += `# Error Handling\n${errorHandling}\n\n`;
    if (testCases) prompt += `# Test Cases\n${testCases}\n\n`;
    
    return prompt.trim();
  };

  const copyToClipboard = () => {
    const prompt = generatePrompt();
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generatedPrompt = generatePrompt();
  const filledCore = [task, context, technical, constraints].filter(Boolean).length;
  const filledEnhanced = [acceptance, userFlow, errorHandling, testCases].filter(Boolean).length;
  const quality = filledCore >= 3 ? (filledEnhanced >= 2 ? 'excellent' : 'good') : 'basic';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Prompt Generator</h1>
          </div>
          <p className="text-slate-600">Smart prompts for Claude Code</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Template Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-sm font-semibold text-slate-900 mb-3">What are you doing?</h2>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(templates).map(([key, template]) => {
                  const Icon = template.icon;
                  const isSelected = selectedTemplate === key;
                  return (
                    <button
                      key={key}
                      onClick={() => loadTemplate(key as TemplateKey)}
                      className={`flex items-start gap-3 p-4 border-2 rounded-lg transition-all text-left ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 bg-slate-50 hover:border-blue-300'
                      }`}
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isSelected ? 'text-blue-600' : 'text-slate-600'}`} />
                      <div>
                        <div className={`font-semibold ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>
                          {template.name}
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5">{template.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Core Fields */}
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">Core Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  What do you want to build/fix?
                </label>
                <textarea
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="Be specific: 'Create a user dashboard that displays analytics' or 'Fix the login error when password contains special characters'"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-sm"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Context & Background
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <SnippetButton label="User Story" onClick={() => insertSnippet('context', snippets.context.userStory)} />
                  {selectedTemplate === 'fix' && (
                    <SnippetButton label="Error Details" onClick={() => insertSnippet('context', snippets.context.errorDetails)} />
                  )}
                  {selectedTemplate === 'build' && (
                    <>
                      <SnippetButton label="Design Reference" onClick={() => insertSnippet('context', snippets.context.designReference)} />
                      <SnippetButton label="API Context" onClick={() => insertSnippet('context', snippets.context.apiContext)} />
                    </>
                  )}
                </div>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder={selectedTemplate === 'fix' 
                    ? "Paste error messages and stack traces here. Describe what you were doing when it broke."
                    : "What problem does this solve? Who is it for? What's the current state?"
                  }
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-sm"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Technical Requirements
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <SnippetButton label="React Stack" onClick={() => insertSnippet('technical', snippets.technical.reactStack)} />
                  <SnippetButton label="Node/API" onClick={() => insertSnippet('technical', snippets.technical.nodeStack)} />
                  <SnippetButton label="Database" onClick={() => insertSnippet('technical', snippets.technical.database)} />
                  <SnippetButton label="Accessibility" onClick={() => insertSnippet('technical', snippets.technical.accessibility)} />
                </div>
                <textarea
                  value={technical}
                  onChange={(e) => setTechnical(e.target.value)}
                  placeholder="Tech stack, frameworks, coding patterns you want to follow..."
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-sm"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Constraints & Requirements
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <SnippetButton label="Security" onClick={() => insertSnippet('constraints', snippets.constraints.security)} />
                  <SnippetButton label="Responsive" onClick={() => insertSnippet('constraints', snippets.constraints.mobile)} />
                  {selectedTemplate === 'review' && (
                    <SnippetButton label="No Breaking Changes" onClick={() => insertSnippet('constraints', snippets.constraints.noBreaking)} />
                  )}
                </div>
                <textarea
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                  placeholder="What must it do? What must it avoid? Performance needs? Browser support?"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-sm"
                  rows={3}
                />
              </div>
            </div>

            {/* Enhanced Fields */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Wand2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-semibold text-blue-900">Make It Better</h3>
              </div>
              <p className="text-xs text-blue-700 mb-4">Add these for higher quality results</p>

              {showField('acceptance') && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    How do you know it's done?
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <SnippetButton label="Feature Done" onClick={() => insertSnippet('acceptance', snippets.acceptance.featureDone)} />
                    <SnippetButton label="UI Done" onClick={() => insertSnippet('acceptance', snippets.acceptance.uiDone)} />
                    <SnippetButton label="API Done" onClick={() => insertSnippet('acceptance', snippets.acceptance.apiDone)} />
                    {selectedTemplate === 'fix' && (
                      <SnippetButton label="Debug Done" onClick={() => insertSnippet('acceptance', snippets.acceptance.debugDone)} />
                    )}
                  </div>
                  <textarea
                    value={acceptance}
                    onChange={(e) => setAcceptance(e.target.value)}
                    placeholder="Checklist of what makes this complete..."
                    className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-sm"
                    rows={3}
                  />
                </div>
              )}

              {showField('userFlow') && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    User flow or interaction states
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <SnippetButton label="UI States" onClick={() => insertSnippet('userFlow', snippets.userFlow.uiStates)} />
                    <SnippetButton label="Feature Flow" onClick={() => insertSnippet('userFlow', snippets.userFlow.featureFlow)} />
                    <SnippetButton label="Form Flow" onClick={() => insertSnippet('userFlow', snippets.userFlow.formFlow)} />
                  </div>
                  <textarea
                    value={userFlow}
                    onChange={(e) => setUserFlow(e.target.value)}
                    placeholder="What happens when user interacts? What are all the states?"
                    className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-sm"
                    rows={3}
                  />
                </div>
              )}

              {showField('errorHandling') && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    How should errors be handled?
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <SnippetButton label="API Errors" onClick={() => insertSnippet('errorHandling', snippets.errorHandling.apiErrors)} />
                    <SnippetButton label="UI Errors" onClick={() => insertSnippet('errorHandling', snippets.errorHandling.uiErrors)} />
                    <SnippetButton label="Form Errors" onClick={() => insertSnippet('errorHandling', snippets.errorHandling.formErrors)} />
                  </div>
                  <textarea
                    value={errorHandling}
                    onChange={(e) => setErrorHandling(e.target.value)}
                    placeholder="What happens when things go wrong?"
                    className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-sm"
                    rows={3}
                  />
                </div>
              )}

              {showField('testCases') && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    How to test this works?
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <SnippetButton label="Basic Tests" onClick={() => insertSnippet('testCases', snippets.testCases.basic)} />
                    <SnippetButton label="UI Tests" onClick={() => insertSnippet('testCases', snippets.testCases.ui)} />
                    <SnippetButton label="API Tests" onClick={() => insertSnippet('testCases', snippets.testCases.api)} />
                  </div>
                  <textarea
                    value={testCases}
                    onChange={(e) => setTestCases(e.target.value)}
                    placeholder="What should you test? Happy path? Edge cases?"
                    className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-sm"
                    rows={3}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            {/* Quality Indicator */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-slate-900">Prompt Quality</h2>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  quality === 'excellent' ? 'bg-green-100 text-green-700' :
                  quality === 'good' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {quality === 'excellent' ? '🎯 Excellent' : quality === 'good' ? '👍 Good' : '⚡ Basic'}
                </span>
              </div>
              <p className="text-sm text-slate-600">
                {quality === 'excellent' && 'This prompt should produce great results! All key sections included.'}
                {quality === 'good' && 'Good prompt! Add acceptance criteria or test cases for even better results.'}
                {quality === 'basic' && 'Fill in core fields (task, context, technical) to improve quality.'}
              </p>
            </div>

            {/* Generated Prompt */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Your Prompt</h2>
                <button
                  onClick={copyToClipboard}
                  disabled={!generatedPrompt}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                    generatedPrompt
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              
              <div className="bg-slate-900 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto">
                {generatedPrompt ? (
                  <pre className="text-xs md:text-sm text-slate-100 font-mono whitespace-pre-wrap break-words">
                    {generatedPrompt}
                  </pre>
                ) : (
                  <div className="flex items-center justify-center h-[400px] text-slate-500">
                    <div className="text-center">
                      <Wand2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Fill in the fields above</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold text-amber-900 mb-2 text-sm">Quick Tips</h3>
              <ul className="text-xs text-amber-800 space-y-1">
                <li>• <strong>For debugging:</strong> Paste exact error messages in Context</li>
                <li>• <strong>For UI:</strong> Use the "UI States" snippet to define all states</li>
                <li>• <strong>Build incrementally:</strong> Test each feature before adding the next</li>
                <li>• <strong>Use snippets:</strong> Click the blue "+ Add" buttons for quick fills</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}