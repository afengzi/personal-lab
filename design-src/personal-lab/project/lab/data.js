/* FENGZIAAA Lab — content for the cosmos + roadmap. */
window.FZ_DATA = {
  owner: {
    handle: 'fengziaaa', domain: 'fengziaaa.com', tagline: 'Building in public. Ship daily.',
    location: 'Shenzhen, China', url: 'github.com/fengziaaa',
    repos: 72, followers: '1.2k', following: 98, contributions: '3,641',
  },

  /* GitHub recent activity feed */
  activity: [
    { icon: 'git-commit-horizontal', tone: 'var(--green)',  title: 'Pushed to fengziaaa/flowcraft', sub: 'feat: add AI context summarizer', time: '2m' },
    { icon: 'git-pull-request',       tone: 'var(--cyan)',   title: 'Opened PR #128',                sub: 'fix: streaming render performance', time: '18m' },
    { icon: 'git-merge',              tone: 'var(--purple)', title: 'Merged PR #127',                sub: 'chore: upgrade dev dependencies',   time: '1h' },
    { icon: 'circle-dot',             tone: 'var(--amber)',  title: 'Created Issue #126',            sub: 'idea: visual git graph in 3D',      time: '2h' },
    { icon: 'star',                   tone: 'var(--amber)',  title: 'Starred vercel/ai',             sub: 'SDK for building AI apps',          time: '3h' },
  ],

  /* Personal ideas (right rail, with progress) */
  personal: [
    { id: 'flow',  title: 'Flowcraft',       tag: 'AI / Tools', tone: 'var(--node-flow)',  hex: '#2bff88', desc: 'Visual AI Workflow Builder',   progress: 75 },
    { id: 'ai',    title: 'AI Copilot',      tag: 'AI / Dev',   tone: 'var(--node-ai)',    hex: '#b06bff', desc: 'Context-aware Pair Programmer', progress: 60 },
    { id: 'radar', title: 'Dev Radar',       tag: 'Analytics',  tone: 'var(--node-radar)', hex: '#2ee6f6', desc: 'Real-time Dev Insights',       progress: 40 },
    { id: 'blog',  title: 'Neon Blog',       tag: 'Content',    tone: 'var(--node-blog)',  hex: '#ff2d9b', desc: 'Thoughts on Code & AI',        progress: 80 },
    { id: 'os',    title: 'Open Source Hub', tag: 'Platform',   tone: 'var(--node-os)',    hex: '#ffae3a', desc: 'Developer Resources Platform', progress: 30 },
  ],

  /* Visitor-submitted ideas (upvotable) */
  visitor: [
    { id: 'v1', title: 'AI Code Review Game',       handle: '@devdreamer',   time: '2h',  votes: 23 },
    { id: 'v2', title: 'One-Click Dev Environment', handle: '@cloudnative',  time: '5h',  votes: 18 },
    { id: 'v3', title: 'Project Time Machine',      handle: '@oldschooldev', time: '8h',  votes: 15 },
    { id: 'v4', title: 'AI Debugger',               handle: '@bughunter',    time: '12h', votes: 12 },
    { id: 'v5', title: 'Open Source Bounty Board',  handle: '@ossfan',       time: '1d',  votes: 9 },
  ],

  console: [
    { time: '22:47:55', tag: 'INFO', msg: 'Lab cockpit initialized' },
    { time: '22:47:55', tag: 'OK',   msg: 'All systems operational' },
    { time: '22:47:56', tag: 'DATA', msg: 'GitHub API connected' },
    { time: '22:47:56', tag: 'DATA', msg: 'Ideas engine online' },
    { time: '22:47:57', tag: 'SYNC', msg: 'Real-time sync active' },
    { time: '22:47:57', tag: 'INFO', msg: 'Ready to build the future' },
  ],
  consoleStream: [
    { tag: 'SYNC', msg: 'Polling fengziaaa/flowcraft …' },
    { tag: 'OK',   msg: 'Pulled 3 new commits' },
    { tag: 'DATA', msg: 'Idea #143 received from @neondev' },
    { tag: 'INFO', msg: 'Mission progress recalculated → 63%' },
    { tag: 'DATA', msg: 'Network throughput 42.7 MB/s' },
    { tag: 'SYNC', msg: 'Orbital map re-indexed · 9 nodes' },
    { tag: 'OK',   msg: 'Build queue drained · 0 pending' },
    { tag: 'WARN', msg: 'Dev Radar rate-limit at 82%' },
  ],
  gitlog: [
    { sha: 'a1b2c3d', msg: 'feat: AI context' },
    { sha: 'b2c3d4e', msg: 'fix: render bug' },
    { sha: 'c3d4e5f', msg: 'chore: deps update' },
    { sha: 'd4e5f6g', msg: 'docs: update readme' },
    { sha: 'e5f6g7h', msg: 'refactor: core engine' },
  ],

  /* Quick access tiles */
  quick: [
    { id: 'notes',    icon: 'notebook-pen', label: 'Lab Notes',    tone: 'var(--cyan)' },
    { id: 'snippets', icon: 'code-xml',     label: 'Snippets',     tone: 'var(--purple)' },
    { id: 'play',     icon: 'gamepad-2',    label: 'Playground',   tone: 'var(--magenta)' },
    { id: 'roadmap',  icon: 'map',          label: 'Roadmap',      tone: 'var(--green)' },
    { id: 'achieve',  icon: 'trophy',       label: 'Achievements', tone: 'var(--amber)' },
    { id: 'stack',    icon: 'database',     label: 'Stack',        tone: 'var(--cyan)' },
    { id: 'settings', icon: 'settings',     label: 'Settings',     tone: 'var(--purple)' },
    { id: 'contact',  icon: 'mail',         label: 'Contact',      tone: 'var(--magenta)' },
  ],

  /* System modules — also nodes wired to the center. Click one to open it. */
  modules: [
    { id: 'github',    kind: 'module', title: 'GitHub Presence',  icon: 'git-branch', tone: 'var(--cyan)',    hex: '#2ee6f6', desc: 'Live profile & activity' },
    { id: 'console',   kind: 'module', title: 'System Console',   icon: 'terminal',   tone: 'var(--green)',   hex: '#2bff88', desc: 'Real-time log stream' },
    { id: 'mission',   kind: 'module', title: '100 Ideas Mission', icon: 'target',    tone: 'var(--green)',   hex: '#2bff88', desc: '63 / 100 shipped' },
    { id: 'visitor',   kind: 'module', title: 'Visitor Ideas',    icon: 'lightbulb',  tone: 'var(--amber)',   hex: '#ffae3a', desc: 'Community submissions' },
    { id: 'quick',     kind: 'module', title: 'Quick Access',     icon: 'layout-grid', tone: 'var(--purple)', hex: '#b06bff', desc: 'Jump to any module' },
    { id: 'telemetry', kind: 'module', title: 'Lab Telemetry',    icon: 'activity',   tone: 'var(--magenta)', hex: '#ff2d9b', desc: 'Signal · intake · vibe' },
  ],

  /* The ideas that float around you in the cosmos. Detail is hidden until you
     click a card — then its full blurb + stats fly to the front. */
  nodes: [
    { id: 'ai',     title: 'AI Copilot',      cat: 'AI / Dev',   tone: 'var(--node-ai)',    hex: '#b06bff', progress: 60,  stars: '1.2k', updated: '2d',  lang: 'TypeScript', commits: 342, issues: 12, sub: [{ l: 'Repo Memory', href: '#' }, { l: 'Inline Review', href: '#' }, { l: 'Test Gen', href: '#' }], desc: 'Context-aware pair programmer', blurb: 'A pair programmer that reads your whole repo, remembers the thread, and ships diffs you can actually trust. Inline review, test generation, and a memory of every decision you have made.' },
    { id: 'flow',   title: 'Flowcraft',       cat: 'AI / Tools', tone: 'var(--node-flow)',  hex: '#2bff88', progress: 75,  stars: '860',  updated: '5h',  lang: 'Rust',       commits: 489, issues: 7,  sub: [{ l: 'Node Canvas', href: '#' }, { l: 'Tool Routing', href: '#' }, { l: 'Run Replay', href: '#' }], desc: 'Visual AI workflow builder', blurb: 'Drag nodes, wire prompts, watch data flow. Build agentic pipelines without leaving the canvas — branch on model output, fan out to tools, and replay any run step by step.' },
    { id: 'radar',  title: 'Dev Radar',       cat: 'Analytics',  tone: 'var(--node-radar)', hex: '#2ee6f6', progress: 40,  stars: '410',  updated: '1d',  lang: 'Go',         commits: 211, issues: 23, sub: [{ l: 'Live Feed', href: '#' }, { l: 'Repo Health', href: '#' }, { l: 'Trends', href: '#' }], desc: 'Real-time dev insights', blurb: 'Live telemetry across every repo — what shipped, what broke, what is trending in your stack. A single pane that turns scattered GitHub signals into a heartbeat.' },
    { id: 'blog',   title: 'Neon Blog',       cat: 'Content',    tone: 'var(--node-blog)',  hex: '#ff2d9b', progress: 80,  stars: '2.4k', updated: '8h',  lang: 'MDX',        commits: 156, issues: 3,  sub: [{ l: 'Building in Public', href: '#' }, { l: 'AI Notes', href: '#' }, { l: 'RSS Feed', href: '#' }], desc: 'Thoughts on code, AI & the future', blurb: 'Long-form notes from building in public. Code, AI, and the occasional 2am idea — written raw, shipped fast, and indexed so future-me can actually find them.' },
    { id: 'os',     title: 'Open Source Hub', cat: 'Platform',   tone: 'var(--node-os)',    hex: '#ffae3a', progress: 30,  stars: '320',  updated: '3d',  lang: 'Various',    commits: 98,  issues: 41, sub: [{ l: 'Templates', href: '#' }, { l: 'Bounty Board', href: '#' }, { l: 'Snippets', href: '#' }], desc: 'Developer resources platform', blurb: 'A hub of reusable building blocks — give back to the community, one commit at a time. Templates, starters, and battle-tested snippets with a bounty board on top.' },
    { id: 'git3d',  title: 'Visual Git 3D',   cat: 'Tooling',    tone: 'var(--node-radar)', hex: '#2ee6f6', progress: 18,  stars: '95',   updated: '6d',  lang: 'WebGL',      commits: 64,  issues: 9,  sub: [{ l: 'Branch Orbits', href: '#' }, { l: 'Commit Stars', href: '#' }, { l: 'Fly-through', href: '#' }], desc: 'See your history in 3D', blurb: 'Branches as orbits, commits as stars. Fly through your repository history in a spatial graph and finally understand that merge from six months ago.' },
    { id: 'prompt', title: 'Prompt Library',  cat: 'AI / Tools', tone: 'var(--node-ai)',    hex: '#b06bff', progress: 52,  stars: '640',  updated: '12h', lang: 'Python',     commits: 178, issues: 5,  sub: [{ l: 'Versioning', href: '#' }, { l: 'A/B Test', href: '#' }, { l: 'Export', href: '#' }], desc: 'Reusable prompt snippets', blurb: 'A versioned, taggable home for the prompts that actually work. Fork, test against models side by side, and drop the winner straight into your codebase.' },
    { id: 'time',   title: 'Time Machine',    cat: 'Tooling',    tone: 'var(--node-blog)',  hex: '#ff2d9b', progress: 12,  stars: '48',   updated: '9d',  lang: 'TypeScript', commits: 41,  issues: 14, sub: [{ l: 'Snapshots', href: '#' }, { l: 'Diff View', href: '#' }, { l: 'Restore', href: '#' }], desc: 'Replay any project state', blurb: 'Scrub your project like a video. Jump to any past state, diff two moments in time, and resurrect that file you deleted three refactors ago.' },
    { id: 'stack',  title: 'Vibe Stack',      cat: 'DevOps',     tone: 'var(--node-flow)',  hex: '#2bff88', progress: 100, stars: '1.6k', updated: '1d',  lang: 'Shell',      commits: 523, issues: 2,  sub: [{ l: 'Dotfiles', href: '#' }, { l: 'Secrets', href: '#' }, { l: 'One-Command', href: '#' }], desc: 'One command, any machine', blurb: 'Dotfiles, environments, and secrets that follow you everywhere. One command spins up a fresh machine into your exact setup — shipped and battle-tested daily.' },
  ],

  mission: { value: 63, max: 100, received: 142, completed: 23, inProgress: 5 },

  /* Roadmap (Ideas Kanban) seed */
  board: [
    { id: 'i1', title: 'AI Copilot',       tag: 'AI / Dev',   tone: 'var(--node-ai)',    hex: '#b06bff', progress: 60,  stage: 'build',   votes: 34, note: 'Context-aware pair programmer' },
    { id: 'i2', title: 'Flowcraft',        tag: 'AI / Tools', tone: 'var(--node-flow)',  hex: '#2bff88', progress: 75,  stage: 'build',   votes: 28, note: 'Visual AI workflow builder' },
    { id: 'i3', title: 'Dev Radar',        tag: 'Analytics',  tone: 'var(--node-radar)', hex: '#2ee6f6', progress: 40,  stage: 'explore', votes: 19, note: 'Real-time dev insights' },
    { id: 'i4', title: 'Neon Blog',        tag: 'Content',    tone: 'var(--node-blog)',  hex: '#ff2d9b', progress: 80,  stage: 'build',   votes: 22, note: 'Thoughts on code & AI' },
    { id: 'i5', title: 'Open Source Hub',  tag: 'Platform',   tone: 'var(--node-os)',    hex: '#ffae3a', progress: 30,  stage: 'explore', votes: 15, note: 'Developer resources platform' },
    { id: 'i6', title: 'Visual Git 3D',    tag: 'Tooling',    tone: 'var(--cyan)',       hex: '#2ee6f6', progress: 0,   stage: 'backlog', votes: 12, note: 'See history in 3D' },
    { id: 'i7', title: 'Prompt Library',   tag: 'AI / Tools', tone: 'var(--purple)',     hex: '#b06bff', progress: 0,   stage: 'backlog', votes: 9,  note: 'Reusable prompt snippets' },
    { id: 'i8', title: 'Time Machine',     tag: 'Tooling',    tone: 'var(--magenta)',    hex: '#ff2d9b', progress: 0,   stage: 'backlog', votes: 7,  note: 'Replay any project state' },
    { id: 'i9', title: 'Vibe Stack',       tag: 'DevOps',     tone: 'var(--green)',      hex: '#2bff88', progress: 100, stage: 'shipped', votes: 41, note: 'One command, any machine' },
    { id: 'i10', title: 'Personal Cockpit', tag: 'Web',       tone: 'var(--green)',      hex: '#2bff88', progress: 100, stage: 'shipped', votes: 16, note: 'This very cosmos' },
  ],
};
