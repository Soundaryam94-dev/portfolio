// Edit this file to personalise the portfolio. Everything below is placeholder text.
export const profile = {
  name: 'Soundarya',
  role: 'Trainee Software Engineer',
  tagline: 'Building things for the web, one commit at a time.',
  about:
    'I am a trainee software engineer who enjoys turning ideas into clean, usable React apps. Replace this with 2-3 sentences about you, what you are learning and what you want to build next.',
  email: 'soundaryanadupuru@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/Soundaryam94-dev' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/soundarya-marpu-8a73b9381/' },
    { label: 'Resume', href: '/resume.pdf' },
  ],
}

export const pins = [
  { label: 'SVCE', bld: 'b1', fx: 0.5, fy: 0.2, icon: '🎓', x: 0, y: 0 }, // a label only (the 2015 card on the road carries the details)
  // 2016: the company from the CV (Front-End UI Developer, May 2016 – Jul 2017)
  { label: 'Syntax Tree Software Solutions Pvt Ltd', bld: 'b2', fx: 0.5, fy: 0.17, tag: '2016', icon: '💼', x: 0, y: 0 },
  // the skills building's two pills, each kept within its own block: Tools & Technologies on the top of the front rounded
  // block (its upper curved floor), My Approach on the back block (the tall glass block with the curved roof)
  { label: 'Tools & Technologies', bld: 'b3', fx: 0.27, fy: 0.46, block: '0.08 0.45 0.32 0.5', icon: '🛠️', x: 0, y: 0 },
  { label: 'My Approach', bld: 'b3', fx: 0.79, fy: 0.46, block: '0.7 0.88 0.2 0.58', icon: '🧭', x: 0, y: 0 },
  { label: 'YuppTV', bld: 'b4', fx: 0.5, fy: 0.17, tag: '2026', icon: '💼', x: 0, y: 0 }, // the current role, last on the road (the 2026 card carries the details)
]

// Content of the "SVCE" sheet.
export const educationSheet = {
  title: 'My Education',
  subtitle: 'Building the Foundation',
  paragraphs: [
    'I completed my Bachelor of Technology (B.Tech) in 2015. My educational journey helped me build a foundation for learning, problem-solving, and professional growth.',
  ],
  details: [
    { label: 'Degree', value: 'Bachelor of Technology (B.Tech)' },
    { label: 'Graduation Year', value: '2015' },
  ],
}

// Content of the YuppTV sheet.
export const yupptvSheet = {
  title: 'Trainee Software Engineer',
  subtitle: 'YuppTV | 2026 – Present',
  paragraphs: [
    'Working as a Trainee Software Engineer at YuppTV, taking an end-to-end approach to project development, from understanding requirements and planning to implementation, testing, and deployment.',
    'Currently focused on building a complete project, solving real-world challenges, and gaining practical experience throughout the software development lifecycle.',
  ],
  // the two key points of the paragraphs above, shortened for the 2026 card on the road (nothing added)
  highlights: [
    'End-to-end project development: requirements, planning, implementation, testing and deployment',
    'Building a complete project and solving real-world challenges',
  ],
}

// Content of the "My Approach" sheet. `icon` is one of: bulb, layout, bug.
export const approachSheet = {
  eyebrow: 'How I work',
  title: 'From idea to implementation.',
  paragraphs: [
    'I turn ideas into practical digital experiences through thoughtful planning, experimentation, and continuous improvement.',
  ],
  steps: [
    { icon: 'bulb', title: 'Understand', text: 'Understand the problem and define the goal.' },
    { icon: 'layout', title: 'Build', text: 'Plan the structure and develop practical solutions.' },
    { icon: 'bug', title: 'Refine', text: 'Test, debug, and improve the final experience.' },
  ],
}

// The Work section. Each project is a card in the box + a popup. Add a project by adding an object to `projects`.
// `image` is shown on the card and in the popup; `soon: true` makes a dashed placeholder card with no popup.
export const workSection = {
  eyebrow: 'Selected work',
  stamp: 'Things I built',
  title: 'Things I built, and',
  highlight: 'what I learned.',
  intro: 'Six projects, from full-stack apps to VS Code extensions.',
  projects: [
    {
      title: 'Creator & Brand Collaboration Platform',
      icon: '🤝',
      short: 'Creator & Brand Platform',
      accent: '#7c5cff',
      gradient: 'radial-gradient(120% 80% at 15% 0%, #c9b8ff 0%, transparent 55%), radial-gradient(90% 70% at 100% 100%, #5b2fd6 0%, transparent 60%), linear-gradient(165deg, #8b6cff, #4b2fc0)',
      image: '/projects/collab.webp',
      stack: 'Next.js · Supabase · Resend',
      legend: 'Full-stack platform',
      // Case study page. Facts come from the app's source (C:\collab\collab-platform): schema, matcher, API routes and
      // pages. Screenshots (public/projects/collab/) are real: captured from the live public pages. The live database
      // has no demo creators yet, so no fabricated profiles or numbers are shown.
      caseStudy: {
        slug: 'collabx',
        liveUrl: 'https://collab-platform-ruddy.vercel.app/',
        frameUrl: 'collab-platform-ruddy.vercel.app',
        heroImage: '/projects/collab/hero.webp',
        kicker: 'Case study · Full-stack project',
        title: 'CollabX',
        highlight: 'creator platform',
        tagline: 'A marketplace where brands find creators, send proposals and chat, and creators accept or decline, with a transparent match score and email notifications at every step.',
        meta: [
          { label: 'My role', value: 'Design and full-stack development' },
          { label: 'Type', value: 'Full-stack web app' },
          { label: 'Built with', value: 'Next.js · Supabase · Resend' },
          { label: 'Status', value: 'Live' },
        ],
        stats: [
          { value: '5', label: 'factors in the match score: niche, followers, engagement, rating and tags' },
          { value: '4', label: 'collaboration goals that re-weight the score' },
          { value: '9', label: 'stages a collaboration moves through, from invited to completed' },
        ],
        overview: {
          eyebrow: 'Chapter 1 · The idea',
          title: 'One place for the whole partnership.',
          paragraphs: [
            'Influencer marketing usually runs on scattered DMs, spreadsheets and email threads. A brand finds a creator in one place, negotiates in another and loses track of who agreed to what.',
            'CollabX puts it in one flow. Brands search creators by niche and audience size, or let the match score rank them. Either side can send a proposal, the other accepts or declines from the email, and an accepted collaboration opens a chat automatically.',
            'It has two roles, Creator and Brand, each with its own dashboard, and database rules that keep every user to their own data.',
          ],
        },
        screens: {
          eyebrow: 'Chapter 2 · The product',
          title: 'From landing page to sign-up.',
          intro: 'Real screenshots of the live site: the public pages anyone can open.',
          items: [
            { image: '/projects/collab/hero.webp', url: 'collab-platform-ruddy.vercel.app', title: 'The landing page', text: 'A dark, purple-accent page with a clear promise, two calls to action and a network diagram that shows creators connected to the platform.' },
            { image: '/projects/collab/features.webp', natural: true, url: 'collab-platform-ruddy.vercel.app', title: 'Five things it does', text: 'Creator Discovery, AI Match, Collaboration Management, Invite & Propose and the Collaboration Hub, each in one short card.' },
            { image: '/projects/collab/find.webp', natural: true, url: 'collab-platform-ruddy.vercel.app/find-creators', title: 'Find creators', text: 'Search by name, niche or bio, then narrow by 20 niches and by audience size: any, 10K+, 100K+, 500K+ or 1M+. It is public, so a brand can look before signing up.' },
            { image: '/projects/collab/signup.webp', natural: true, url: 'collab-platform-ruddy.vercel.app/signup', title: 'Pick a role', text: 'Sign-up starts with one choice: Creator or Brand. The role decides which dashboard and which actions you get.' },
          ],
        },
        features: {
          eyebrow: 'Chapter 3 · What it does',
          title: 'The workflow, end to end.',
          items: [
            { icon: '🔎', title: 'Creator discovery', text: 'Search and filter by niche and audience size on a public page, with a profile for every creator.' },
            { icon: '🎯', title: 'AI Match', text: 'Pick categories, tags, minimum audience, minimum engagement and a goal, and get creators ranked by a weighted score.' },
            { icon: '✉️', title: 'Invite and propose', text: 'Brands invite creators and creators propose to brands, with deliverables, platforms, a deadline and notes.' },
            { icon: '✅', title: 'Accept or decline', text: 'The other side answers from the email. The status updates and both people are told by email.' },
            { icon: '💬', title: 'Built-in chat', text: 'Accepting a collaboration creates a conversation, and new messages show up without a refresh.' },
            { icon: '📊', title: 'Role dashboards', text: 'A Brand Dashboard and a Creator Dashboard with a setup checklist and a list of collaborations.' },
          ],
        },
        workflow: {
          eyebrow: 'Chapter 4 · The workflow',
          title: 'From sign-up to a finished collaboration.',
          intro: 'What happens, in order, and what runs behind each step.',
          progress: false,
          steps: [
            { name: 'Sign up', text: 'Choose Creator or Brand, then enter a name, email and a password of at least 8 characters. Supabase Auth handles the account.' },
            { name: 'Complete the profile', text: 'Creators add a niche, audience size, engagement rate and tags. These are the fields the matcher reads.' },
            { name: 'Discover', text: 'Search and filter creators, or open AI Match and describe what you need.' },
            { name: 'Invite or propose', text: 'A form collects the campaign name, deliverables, platforms, deadline and notes. The collaboration is saved as invited, and an email goes out through Resend.' },
            { name: 'Respond', text: 'The recipient accepts or declines from the email. The status becomes agreed or rejected, and both sides get a confirmation email.' },
            { name: 'Talk', text: 'An accepted collaboration opens a conversation automatically, and messages arrive live through Supabase Realtime.' },
            { name: 'Track', text: 'The Collaborations page shows each one by stage: proposal sent, invited, agreed, in progress, content submitted, approved, completed or declined.' },
          ],
        },
        output: {
          eyebrow: 'Chapter 5 · The match score',
          title: 'A score you can explain.',
          intro: 'AI Match is a weighted score, not a black box. Your goal changes how much each factor counts, and every result shows its breakdown.',
          chips: ['Niche match', 'Followers', 'Engagement', 'Rating', 'Tag overlap'],
          chipLabel: 'Scored on',
          items: [
            { image: '/projects/collab/aimatch.webp', natural: true, url: 'collab-platform-ruddy.vercel.app/find-creators', title: 'Describe what you need', text: 'Choose content categories and tags, a minimum audience and engagement rate, and one of four goals: Reach, Engagement, Niche Fit or Balanced. Reach weights followers at 40%, Engagement weights engagement at 45%, and Niche Fit weights the category at 45%. Scores of 75 and up read as an Excellent Match.' },
          ],
        },
        stack: {
          eyebrow: 'Chapter 6 · The stack',
          title: 'Built with',
          groups: [
            { label: 'Frontend', items: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'], note: 'App Router pages, server routes for the API, and a dark interface with animated sections.' },
            { label: 'Backend', items: ['Supabase', 'PostgreSQL', 'Row Level Security'], note: 'Auth, five tables (profiles, campaigns, collaborations, conversations, messages) and per-table access policies. Chat uses Realtime.' },
            { label: 'Email and hosting', items: ['Resend', 'Vercel'], note: 'Five email templates for invites, proposals, accepts and declines, and deployment on Vercel.' },
          ],
        },
        cta: { title: 'Take a look.', text: 'Open the live site and try Find Creators and AI Match.', button: 'Visit Live Project' },
      },
      sheet: {
        eyebrow: 'Personal project',
        title: 'Creator & Brand Collaboration Platform',
        subtitle: 'Full-stack platform',
        image: '/projects/collab.webp',
        paragraphs: ['A full-stack platform where brands launch campaigns, match with creators and send proposals, and creators manage invites and collaborations.'],
        groups: [{ label: 'Built with', items: ['Next.js', 'Supabase', 'Resend'] }],
      },
    },
    {
      title: 'WebsiteExtractor',
      icon: '🧰',
      short: 'WebsiteExtractor',
      accent: '#a855f7',
      gradient: 'radial-gradient(120% 80% at 15% 0%, #f0c9ff 0%, transparent 55%), radial-gradient(90% 70% at 100% 100%, #9d2fd6 0%, transparent 60%), linear-gradient(165deg, #c26bff, #7a2fc0)',
      image: '/projects/extractor.webp',
      stack: 'Next.js · Express · Playwright',
      legend: 'Website to ZIP tool',
      // Opens the full case-study page instead of the small popup. Everything here comes from the live app
      // (https://website-extractor-pi.vercel.app) and a real extraction run; screenshots are in public/projects/websiteextractor/.
      caseStudy: {
        slug: 'websiteextractor',
        liveUrl: 'https://website-extractor-pi.vercel.app/',
        kicker: 'Case study · Personal project',
        title: 'Website',
        highlight: 'Extractor',
        tagline: 'Paste any public website URL and download a ZIP of its colors, fonts, images, content and tech stack.',
        meta: [
          { label: 'My role', value: 'Design and development' },
          { label: 'Type', value: 'Full-stack web app' },
          { label: 'Built with', value: 'Next.js · Express · Playwright' },
          { label: 'Status', value: 'Live' },
        ],
        stats: [
          { value: '30s', label: 'average extraction time, as shown in the app' },
          { value: '6+', label: 'asset types in every ZIP' },
          { value: '1-click', label: 'ZIP download, no account' },
        ],
        overview: {
          eyebrow: 'Chapter 1 · The idea',
          title: 'A website\'s design system, from one URL.',
          paragraphs: [
            'Pulling the colors, fonts, images and copy out of an existing site usually means opening DevTools and collecting everything by hand.',
            'Website Extractor does that in one step. You paste a public URL, it opens the site in a headless browser, collects what it finds, and hands you a tidy ZIP.',
            'There is no sign-up and no setup. It works on any public URL.',
          ],
        },
        screens: {
          eyebrow: 'Chapter 2 · The app',
          title: 'Three screens. One job.',
          intro: 'Real screenshots from the live app.',
          items: [
            { image: '/projects/websiteextractor/landing.webp', title: 'Start', text: 'A single field and one button. The headline numbers sit right under the pitch.' },
            { image: '/projects/websiteextractor/processing.webp', title: 'Progress', text: 'A seven-step tracker with a live percentage, so the wait never feels like a black box.' },
            { image: '/projects/websiteextractor/complete.webp', title: 'Done', text: 'The ZIP downloads automatically, and the screen lists exactly what is inside.' },
          ],
        },
        features: {
          eyebrow: 'Chapter 3 · What it does',
          title: 'Everything on the page, in one download.',
          items: [
            { icon: '🔗', title: 'Any public URL', text: 'Paste a link and go. No account, no API key, no install.' },
            { icon: '📈', title: 'Live progress', text: 'Seven named steps and an overall percentage while it works.' },
            { icon: '🎨', title: 'Color palette', text: 'Brand, accent and background colors as palette.json and a visual palette.html.' },
            { icon: '🔤', title: 'Typography', text: 'The fonts in use, with a specimen page for headings and body text.' },
            { icon: '🖼️', title: 'Content and images', text: 'Headings, paragraphs, buttons, links and image URLs, saved as JSON and HTML.' },
            { icon: '🧩', title: 'Design system preview', text: 'A generated React-style page (index.html and styles.css) built from the extracted tokens.' },
          ],
        },
        workflow: {
          eyebrow: 'Chapter 4 · The workflow',
          title: 'Seven steps from URL to ZIP.',
          intro: 'These are the exact steps the app shows while it runs.',
          steps: [
            { name: 'Opening website', text: 'Loads the page in a headless browser so it sees what a visitor sees.' },
            { name: 'Extracting images', text: 'Collects logos, hero and product images.' },
            { name: 'Detecting color palette', text: 'Finds the brand, accent and background colors.' },
            { name: 'Analyzing typography', text: 'Reads the fonts used for headings and body text.' },
            { name: 'Extracting content', text: 'Pulls headings, paragraphs, buttons and links.' },
            { name: 'Generating React SPA', text: 'Builds a design-system preview page from the tokens it found.' },
            { name: 'Building ZIP file', text: 'Packages every folder with a README and starts the download.' },
          ],
        },
        output: {
          eyebrow: 'Chapter 5 · The output',
          title: 'What lands in the ZIP.',
          intro: 'Real files from an extraction of example.com. Each folder opens as a ready-to-read page.',
          folders: ['Images', 'Colour Palette', 'Typography', 'Content', 'Design System', 'Tech Stack', 'README.md'],
          items: [
            { image: '/projects/websiteextractor/palette.webp', file: 'Colour Palette / palette.html', title: 'Color palette', text: 'Brand colors with their hex codes, plus every color found.' },
            { image: '/projects/websiteextractor/typography.webp', file: 'Typography / typography.html', title: 'Typography', text: 'The primary brand font and the heading typeface, as type specimens.' },
            { image: '/projects/websiteextractor/design.webp', file: 'Design System / index.html', title: 'Design system preview', text: 'A rebuilt page that uses the extracted colors and fonts.' },
          ],
        },
        stack: {
          eyebrow: 'Chapter 6 · The stack',
          title: 'Built with',
          groups: [
            { label: 'Frontend', items: ['Next.js', 'React', 'TypeScript'], note: 'Landing, progress and result screens.' },
            { label: 'Backend', items: ['Express', 'Playwright'], note: 'Headless-browser extraction behind an /api/extract endpoint.' },
            { label: 'Hosting', items: ['Vercel', 'Render'], note: 'Frontend on Vercel, extraction API on Render.' },
          ],
        },
        cta: { title: 'Try it yourself.', text: 'Paste a URL and see what comes back.', button: 'Visit Live Project' },
      },
      sheet: {
        eyebrow: 'Personal project',
        title: 'WebsiteExtractor',
        subtitle: 'Website to ZIP tool',
        image: '/projects/extractor.webp',
        paragraphs: ['Paste any website URL and download a ZIP of its colors, fonts, images, content and tech stack.'],
        groups: [{ label: 'Built with', items: ['Next.js', 'Express', 'Playwright', 'TypeScript'] }],
      },
    },
    {
      title: 'TicTacToe for VS Code',
      icon: '🎮',
      short: 'TicTacToe for VS Code',
      accent: '#0ea5e9',
      gradient: 'radial-gradient(90% 60% at 0% 0%, #ffd24d 0%, transparent 55%), radial-gradient(90% 70% at 100% 100%, #ee4b73 0%, transparent 60%), linear-gradient(165deg, #3aa6e0, #1667a8)',
      image: '/projects/tictactoe.webp',
      stack: 'TypeScript · Webview API',
      legend: 'VS Code extension',
      // Case study page. Facts come from the extension's own source (C:\TicTacToe) and its live Marketplace listing.
      // Screenshots (public/projects/tictactoe/) are real: the game page from the extension's source, played with real clicks, plus the listing.
      caseStudy: {
        slug: 'tictactoe',
        liveUrl: 'https://marketplace.visualstudio.com/items?itemName=soundaryanadupuru.tictactoe-sn',
        frameUrl: 'TicTacToe · webview page',
        heroImage: '/projects/tictactoe/win.webp',
        kicker: 'Case study · Published VS Code extension',
        title: 'TicTacToe',
        highlight: 'for VS Code',
        tagline: 'A two-player Tic Tac Toe game that opens inside VS Code, for a two-minute break without leaving the editor.',
        meta: [
          { label: 'My role', value: 'Design and development' },
          { label: 'Type', value: 'VS Code extension' },
          { label: 'Built with', value: 'TypeScript · VS Code Webview API' },
          { label: 'Status', value: 'Published · v0.0.1' },
        ],
        stats: [
          { value: '1', label: 'command to start a game: Play TicTacToe' },
          { value: '8', label: 'winning lines checked after every move' },
          { value: '0', label: 'runtime dependencies: one self-contained page' },
        ],
        overview: {
          eyebrow: 'Chapter 1 · The idea',
          title: 'A game break without leaving the editor.',
          paragraphs: [
            'Sometimes you want a two-minute break, and opening a browser or another app can pull you out of the flow.',
            'TicTacToe by Soundarya puts a 3×3 board inside VS Code. Run Play TicTacToe from the Command Palette and the game opens as a panel in your editor, ready for two players on one machine.',
            'The whole game is one small self-contained page with its own styles and script. It needs no server and no network.',
          ],
        },
        screens: {
          eyebrow: 'Chapter 2 · The game',
          title: 'A clean board, three states.',
          intro: 'Real screenshots of the extension’s game page, played with real clicks.',
          items: [
            { image: '/projects/tictactoe/board.webp', url: 'TicTacToe · webview page', title: 'Ready to play', text: 'A dark, minimal board, a status line that says whose turn it is, and a Restart button. Player X always starts.' },
            { image: '/projects/tictactoe/play.webp', url: 'TicTacToe · webview page', title: 'Take turns', text: 'X and O alternate on the same machine. Open cells light up under the cursor, and played cells keep their colour: pink for X, blue for O.' },
            { image: '/projects/tictactoe/win.webp', url: 'TicTacToe · webview page', title: 'A win', text: 'Three in a row outlines the winning cells in green and the status turns gold: "Player X wins!". The board then locks.' },
          ],
        },
        features: {
          eyebrow: 'Chapter 3 · What it does',
          title: 'Small, and complete.',
          items: [
            { icon: '🎮', title: 'One command', text: 'Open the Command Palette with Ctrl + Shift + P and run Play TicTacToe.' },
            { icon: '🪟', title: 'Lives in a Webview panel', text: 'The board is rendered in a VS Code Webview, right inside the editor.' },
            { icon: '👥', title: 'Two players', text: 'Turn-based play for X and O on one machine, with the current player always shown.' },
            { icon: '🏆', title: 'Win detection', text: 'All eight winning lines are checked after each move, and the winning cells are highlighted.' },
            { icon: '🤝', title: 'Draw detection', text: 'A full board with no winner ends the game as a draw.' },
            { icon: '🔁', title: 'Restart', text: 'One click clears the board, the turn and the status for a new round.' },
          ],
        },
        workflow: {
          eyebrow: 'Chapter 4 · The workflow',
          title: 'From command to a finished game.',
          intro: 'What happens, in the order the extension runs it.',
          progress: false,
          steps: [
            { name: 'Open the Command Palette', text: 'Press Ctrl + Shift + P in VS Code.' },
            { name: 'Run Play TicTacToe', text: 'This fires the tictactoe.startGame command.' },
            { name: 'A panel opens, or comes forward', text: 'If a game panel already exists, it is brought to the front instead of opening a second one.' },
            { name: 'The board renders', text: 'The Webview loads one self-contained page with its own styles and script.' },
            { name: 'Players take turns', text: 'Click a cell to place X or O. The mark is drawn and the turn switches.' },
            { name: 'The game checks the result', text: 'After every move it looks for one of the eight winning lines, or a full board, and locks the game when it finds one.' },
            { name: 'Restart or close', text: 'Restart resets everything. Closing the panel clears the state, so the next run starts fresh.' },
          ],
        },
        output: {
          eyebrow: 'Chapter 5 · The other ending',
          title: 'And when nobody wins.',
          intro: 'A draw is detected too, and the extension is live on the Visual Studio Marketplace.',
          chips: ['Play TicTacToe', 'Webview panel', 'Win detection', 'Draw detection', 'Restart'],
          chipLabel: 'Features',
          items: [
            { image: '/projects/tictactoe/draw.webp', url: 'TicTacToe · webview page', title: 'A draw', text: 'When all nine cells are filled with no winner, the status reads "It\'s a draw!" in orange and the board locks.' },
            { image: '/projects/tictactoe/listing.webp', url: 'marketplace.visualstudio.com', title: 'On the Marketplace', text: 'Published as TicTacToe by Soundarya, free, with the feature list and a short how-to on the listing.' },
          ],
        },
        stack: {
          eyebrow: 'Chapter 6 · The stack',
          title: 'Built with',
          groups: [
            { label: 'Language', items: ['TypeScript', 'JavaScript'], note: 'The extension in TypeScript, and the game logic as a small script inside the Webview.' },
            { label: 'Platform', items: ['VS Code Extension API', 'Webview API'], note: 'A registered command and a Webview panel that opens and is reused.' },
            { label: 'Tooling', items: ['tsc', 'ESLint'], note: 'Compiled with the TypeScript compiler, linted with ESLint and packaged as a .vsix.' },
          ],
        },
        cta: { title: 'Take a break.', text: 'Install it from the Visual Studio Marketplace.', button: 'Visit Live Project' },
      },
      sheet: {
        eyebrow: 'Personal project',
        title: 'TicTacToe for VS Code',
        subtitle: 'VS Code extension',
        image: '/projects/tictactoe.webp',
        paragraphs: ['A VS Code extension that adds a "Play TicTacToe" command and opens a two-player game in a webview panel, with win and draw detection.'],
        groups: [{ label: 'Built with', items: ['TypeScript', 'VS Code Webview API'] }],
      },
    },
    {
      title: 'Notion Sync for VS Code',
      icon: '📝',
      short: 'Notion Sync for VS Code',
      accent: '#1f2937',
      gradient: 'radial-gradient(120% 80% at 15% 0%, #9aa3b2 0%, transparent 55%), radial-gradient(90% 70% at 100% 100%, #111827 0%, transparent 60%), linear-gradient(165deg, #4b5563, #1f2937)',
      image: '/projects/notionsync.webp',
      stack: 'TypeScript · Notion API',
      legend: 'Published VS Code extension',
      // Case study page. Facts come from the extension's own source (C:\NotionSync) and its live Marketplace listing.
      // Screenshots (public/projects/notionsync/) are real: the Marketplace page and the sync result in VS Code.
      caseStudy: {
        slug: 'notionsync',
        liveUrl: 'https://marketplace.visualstudio.com/items?itemName=soundaryanadupuru.notion-sync-sn',
        frameUrl: 'marketplace.visualstudio.com',
        icon: '/projects/notionsync/icon.png',
        heroImage: '/projects/notionsync/listing.webp',
        kicker: 'Case study · Published VS Code extension',
        title: 'Notion',
        highlight: 'Sync',
        tagline: "Sync your project's README and docs folder to Notion with one command, right from VS Code.",
        meta: [
          { label: 'My role', value: 'Design and development' },
          { label: 'Type', value: 'VS Code extension' },
          { label: 'Built with', value: 'TypeScript · VS Code API · Notion API' },
          { label: 'Status', value: 'Published · v0.1.3' },
        ],
        stats: [
          { value: '300', label: 'installs on the Visual Studio Marketplace' },
          { value: '5.0', label: 'average rating from 4 reviews' },
          { value: '5', label: 'versions published in two days (May 25–26, 2026)' },
        ],
        overview: {
          eyebrow: 'Chapter 1 · The idea',
          title: 'Docs that follow your code.',
          paragraphs: [
            'Keeping project docs in Notion usually means copying them out of the repo, pasting them in, and doing it all again after the next change.',
            'Notion Sync removes that loop. One command reads your README.md and the Markdown files in your docs folder, turns them into Notion blocks, and creates pages under a parent page you choose.',
            'A daily reminder pops up at a time you set, so the docs in Notion never drift far from the docs in the repo.',
          ],
        },
        screens: {
          eyebrow: 'Chapter 2 · The extension',
          title: 'Live on the Marketplace.',
          intro: 'Real screenshots: the published listing, the result of a sync, and the release history.',
          items: [
            { image: '/projects/notionsync/listing.webp', url: 'marketplace.visualstudio.com', title: 'The listing', text: 'Notion Sync by Soundarya, free to install, with the one-line pitch and the live install count and rating.' },
            { image: '/projects/notionsync/result.webp', natural: true, url: 'VS Code · Output · Notion Sync', title: 'A real sync', text: 'The Output panel after a run: README synced as 51 blocks, the project guide as 72, and "2 synced, 0 failed".' },
            { image: '/projects/notionsync/versions.webp', url: 'marketplace.visualstudio.com · Version History', title: 'Shipped fast, then steadily', text: 'Five releases from 0.0.9 to 0.1.3 across May 25 and 26, each one a fix or an improvement from using it.' },
          ],
        },
        features: {
          eyebrow: 'Chapter 3 · What it does',
          title: 'Everything one command needs.',
          items: [
            { icon: '🪄', title: 'One-command sync', text: 'Run Sync to Notion from the Command Palette, or press Ctrl + Alt + N.' },
            { icon: '📄', title: 'Finds your docs', text: 'Picks up README.md and every Markdown file in docs/, and titles each page from its filename.' },
            { icon: '🧱', title: 'Markdown to Notion blocks', text: 'Headings, lists, code and links become native Notion blocks, not one big text blob.' },
            { icon: '📦', title: 'Handles API limits', text: 'Long docs upload in batches of 100 blocks, so big files never hit the Notion limit.' },
            { icon: '⏰', title: 'Daily reminder', text: 'A popup at your chosen time with Sync Now and Dismiss. The default is 10:30.' },
            { icon: '🔐', title: 'One-time setup', text: 'Asks for your token (hidden as you type) and page ID once, then remembers them. A reset command clears them.' },
          ],
        },
        workflow: {
          eyebrow: 'Chapter 4 · The workflow',
          title: 'From setup to a synced page.',
          intro: 'The steps, in the order the extension runs them.',
          progress: false,
          steps: [
            { name: 'Create a Notion integration', text: 'Make an integration on notion.so/my-integrations and copy its token.' },
            { name: 'Connect it to a page', text: 'Share the page you want your docs under with the integration, and copy the page ID from its URL.' },
            { name: 'Run Sync to Notion', text: 'Use the Command Palette or Ctrl + Alt + N from any project folder.' },
            { name: 'First-run setup', text: 'The extension asks for the token and page ID once and saves them in your settings.' },
            { name: 'Find the docs', text: 'It looks for README.md and every .md file in docs/, and skips anything that is missing, with a note in the Output panel.' },
            { name: 'Clean and convert', text: 'Anchor, relative and localhost links are tidied first, then the Markdown becomes Notion blocks.' },
            { name: 'Upload in batches', text: 'The first 100 blocks create the page and the rest are appended 100 at a time. The result shows in the Output panel.' },
          ],
        },
        output: {
          eyebrow: 'Chapter 5 · The listing',
          title: 'What you see before installing.',
          intro: 'The Marketplace page lists the features, setup steps, settings and commands.',
          chips: ['Sync to Notion', 'Notion Sync: Reset Settings', 'Ctrl + Alt + N', 'Daily reminder', 'Output panel'],
          chipLabel: 'Commands and features',
          items: [
            { image: '/projects/notionsync/features.webp', url: 'marketplace.visualstudio.com', title: 'Features at a glance', text: 'The listing opens with the pitch, the six features, and the first setup step, so a new user knows what they are getting.' },
          ],
        },
        stack: {
          eyebrow: 'Chapter 6 · The stack',
          title: 'Built with',
          groups: [
            { label: 'Language', items: ['TypeScript', 'Node.js'], note: 'The whole extension, compiled to JavaScript for VS Code.' },
            { label: 'Platform', items: ['VS Code Extension API', 'Notion API'], note: 'Commands, keybinding, settings, input prompts, reminders and the Output channel.' },
            { label: 'Libraries', items: ['@notionhq/client', '@tryfabric/martian'], note: 'The official Notion client, and a Markdown to Notion block converter.' },
          ],
        },
        cta: { title: 'Try it yourself.', text: 'Install it from the Visual Studio Marketplace.', button: 'Visit Live Project' },
      },
      sheet: {
        eyebrow: 'Personal project',
        title: 'Notion Sync for VS Code',
        subtitle: 'Published VS Code extension',
        image: '/projects/notionsync.webp',
        paragraphs: ["A published VS Code extension that syncs a project's README and docs folder to Notion in one command. It converts Markdown to Notion blocks, handles API batch limits and sends a daily reminder."],
        groups: [{ label: 'Built with', items: ['TypeScript', 'VS Code Extension API', 'Notion API'] }],
      },
    },
    {
      title: 'MyOTT: Android TV Streaming App',
      icon: '📺',
      short: 'MyOTT: Android TV',
      accent: '#ee5a2b',
      gradient: 'radial-gradient(120% 80% at 15% 0%, #ffc9a8 0%, transparent 55%), radial-gradient(90% 70% at 100% 100%, #e8402a 0%, transparent 60%), linear-gradient(165deg, #ff9a6b, #f25a38)',
      image: '/projects/project5.webp',
      stack: 'Android TV · Streaming',
      legend: 'Android TV streaming app',
      // Case study page. Facts come from the app's source (C:\Androidprojects\MyOTTApp). Screenshots
      // (public/projects/myott/) are real: captured from the app running on an Android TV emulator.
      caseStudy: {
        slug: 'myott',
        liveUrl: 'https://github.com/Soundaryam94-dev/androidtvottapp',
        topLink: 'View code',
        frameUrl: 'MyOTT · Android TV (1920×1080)',
        heroImage: '/projects/myott/hero.webp',
        heroNatural: true,
        kicker: 'Case study · Personal project',
        title: 'MyOTT',
        highlight: 'on Android TV',
        tagline: 'A streaming app built for the living-room remote: browse a hero carousel and rows of titles, open a detail page, search, save to My List and play, all with the D-pad.',
        meta: [
          { label: 'My role', value: 'Design and development' },
          { label: 'Type', value: 'Android TV app' },
          { label: 'Built with', value: 'Kotlin · Jetpack Compose' },
          { label: 'Status', value: 'Source on GitHub' },
        ],
        stats: [
          { value: '3', label: 'local Room tables: cached movies, watch history and My List' },
          { value: '500 ms', label: 'search debounce, with a two-character minimum' },
          { value: 'HLS', label: 'streams played with ExoPlayer, resuming from saved progress' },
        ],
        overview: {
          eyebrow: 'Chapter 1 · The idea',
          title: 'Streaming, designed for a remote.',
          paragraphs: [
            'A TV has no touch screen. Everything has to work with four arrow keys, Select and Back, and you always need to know where focus is. I built MyOTT to learn how to design for that.',
            'The home screen opens on a featured-title carousel with Play and More Info, then rows such as Continue Watching, Trending Now and Popular Movies. Titles and ratings come from the TMDB API, and results are cached locally with Room.',
            'Every card, button and menu is focusable. The focused card lifts and gets an orange outline, so the next move is always clear from the couch.',
          ],
        },
        screens: {
          eyebrow: 'Chapter 2 · The app',
          title: 'Four screens, one remote.',
          intro: 'Real screenshots, captured from the app running on an Android TV emulator at 1920 × 1080.',
          items: [
            { image: '/projects/myott/hero.webp', natural: true, url: 'MyOTT · Home', title: 'Home and the hero carousel', text: 'A featured title with its rating and year, Play and More Info buttons, carousel dots, and the Continue Watching row below, with a progress bar and time left on each card.' },
            { image: '/projects/myott/home.webp', natural: true, url: 'MyOTT · Home', title: 'Rows of titles', text: 'Scroll down for Trending Now and Popular Movies. Each poster shows its rating and year, and the focused card lifts with an orange outline and a play button.' },
            { image: '/projects/myott/movies.webp', natural: true, url: 'MyOTT · Movies', title: 'Movies', text: 'A dedicated Movies page with Trending Movies and Popular Movies, reached from the top navigation bar next to Home and My List.' },
            { image: '/projects/myott/detail.webp', natural: true, url: 'MyOTT · Detail', title: 'Detail, cast and more', text: 'The backdrop, tagline, synopsis, genres and runtime, then a Cast row with each actor and their role, and a More Like This row of similar titles.' },
          ],
        },
        features: {
          eyebrow: 'Chapter 3 · What it does',
          title: 'Built for the couch.',
          items: [
            { icon: '🎮', title: 'D-pad first', text: 'Arrow keys move focus, Select opens, Back goes up one level. Cards, buttons and tabs all show a clear focus state.' },
            { icon: '🎠', title: 'Hero carousel', text: 'A 16:9 featured-title deck with Play and More Info, and dots that show where you are.' },
            { icon: '▶️', title: 'Continue Watching', text: 'Progress is saved to a local watch-history table, so a title shows time left and resumes where you stopped.' },
            { icon: '🔎', title: 'Search', text: 'Results arrive after you stop typing for 500 ms, from two characters up, and show a poster, synopsis, rating and year.' },
            { icon: '➕', title: 'My List', text: 'Save titles to a list that is stored on the device and shown in its own screen.' },
            { icon: '🎬', title: 'HLS player', text: 'ExoPlayer (Media3) plays .m3u8 streams, with seek controls and auto-resume from saved progress.' },
          ],
        },
        workflow: {
          eyebrow: 'Chapter 4 · The workflow',
          title: 'From launch to playback.',
          intro: 'How a viewer moves through the app, and what runs behind each step.',
          progress: false,
          steps: [
            { name: 'Launch', text: 'A splash screen opens the app, then the login screen. Sign-in is a stub for now, ready for a real backend.' },
            { name: 'Load the catalogue', text: 'A Retrofit client fetches trending and popular titles from TMDB, and Room caches them for the next launch.' },
            { name: 'Browse', text: 'Move between Home, Movies and My List in the top bar, or scroll through the rows with the D-pad.' },
            { name: 'Open a title', text: 'The detail page loads the backdrop, synopsis, cast and similar titles, with Play, Trailer and My List actions.' },
            { name: 'Find something', text: 'Search from the top bar, or pick a popular search such as Action, Drama or Marvel.' },
            { name: 'Play', text: 'ExoPlayer streams the title over HLS and jumps to the saved position if you watched part of it before.' },
            { name: 'Save progress', text: 'Watch progress and My List changes are written to Room, so the Continue Watching row and My List are up to date next time.' },
          ],
        },
        output: {
          eyebrow: 'Chapter 5 · Find and keep',
          title: 'Search and My List.',
          intro: 'The two screens that help a viewer get back to something.',
          chips: ['Home', 'Movies', 'My List', 'Search', 'Notifications', 'Profile', 'Settings'],
          chipLabel: 'Screens in the app',
          items: [
            { image: '/projects/myott/search.webp', natural: true, url: 'MyOTT · Search', title: 'Search results', text: 'Choosing a popular search fills the box and lists matches with a poster, a short description, rating and year, plus a count of how many were found.' },
            { image: '/projects/myott/mylist.webp', natural: true, url: 'MyOTT · My List', title: 'My List', text: 'Saved titles as a poster grid with a count, stored on the device and reachable from the top bar.' },
          ],
        },
        stack: {
          eyebrow: 'Chapter 6 · The stack',
          title: 'Built with',
          groups: [
            { label: 'Interface', items: ['Kotlin', 'Jetpack Compose', 'Navigation Compose'], note: 'Declarative screens, a nav graph and a custom focus system for the remote.' },
            { label: 'Data', items: ['Retrofit', 'Room', 'DataStore', 'Supabase'], note: 'TMDB over REST, a local cache with watch history and My List, saved preferences, and a Supabase client for a hosted catalogue.' },
            { label: 'Media and images', items: ['ExoPlayer (Media3)', 'HLS', 'Coil'], note: 'Adaptive streaming playback and fast poster loading.' },
          ],
        },
        cta: { title: 'Read the code.', text: 'The full Android TV project is on GitHub.', button: 'View on GitHub' },
      },
      sheet: {
        eyebrow: 'Personal project',
        title: 'MyOTT: Android TV Streaming App',
        subtitle: 'Android TV streaming app',
        image: '/projects/project5.webp',
        paragraphs: ['A streaming app for Android TV with a featured-title hero banner, Home, Movies and My List navigation, search, notifications and a profile menu, and Play and More Info actions for each title.'],
        groups: [{ label: 'Features', items: ['Hero banner', 'Home', 'Movies', 'My List', 'Search', 'Notifications', 'Profile menu', 'Play & More Info'] }],
      },
    },
    {
      title: 'Video Editor',
      icon: '🎬',
      short: 'Video Editor',
      accent: '#10b981',
      gradient: 'radial-gradient(120% 80% at 15% 0%, #b6f2d6 0%, transparent 55%), radial-gradient(90% 70% at 100% 100%, #0b8a5f 0%, transparent 60%), linear-gradient(165deg, #34d399, #0f766e)',
      image: '/projects/project6.webp',
      stack: 'Browser · Timeline editing',
      legend: 'Browser-based editor',
      // Case study page. Facts come from the editor's source (C:\Video Editor) and the live app. Screenshots
      // (public/projects/videoeditor/) are real: captured from the live editor with real clips loaded.
      caseStudy: {
        slug: 'videoeditor',
        liveUrl: 'https://video-editor-mauve-pi.vercel.app/',
        frameUrl: 'video-editor-mauve-pi.vercel.app',
        heroImage: '/projects/videoeditor/hero.webp',
        kicker: 'Case study · Personal project',
        title: 'Video',
        highlight: 'Editor',
        tagline: 'A video editor that runs in the browser: arrange clips on a multi-track timeline, add text, shapes and transitions, then export an MP4, with nothing to install.',
        meta: [
          { label: 'My role', value: 'Design and development' },
          { label: 'Type', value: 'Browser app' },
          { label: 'Built with', value: 'React · FFmpeg (WebAssembly)' },
          { label: 'Status', value: 'Live' },
        ],
        stats: [
          { value: '11', label: 'transitions, from dissolve to wipe and zoom' },
          { value: '15', label: 'canvas presets for social, video and slides' },
          { value: '4', label: 'export quality levels at up to 60 fps' },
        ],
        overview: {
          eyebrow: 'Chapter 1 · The idea',
          title: 'A full editing desk in a browser tab.',
          paragraphs: [
            'Editing video usually means installing heavy software. I wanted the core of an editor to open from a link: bring your clips in, cut them on a timeline, add titles and shapes, and export.',
            'The interface follows the tools people already know: a media bin on the left, a live preview in the middle, a properties panel for the selected clip, and a multi-track timeline underneath.',
            'Exporting also happens in the browser. The app uses FFmpeg compiled to WebAssembly, so your files are processed on your own machine and are not uploaded anywhere to be rendered.',
          ],
        },
        screens: {
          eyebrow: 'Chapter 2 · The editor',
          title: 'One workspace, every kind of media.',
          intro: 'Real screenshots of the live editor, with real clips loaded.',
          items: [
            { image: '/projects/videoeditor/editor.webp', url: 'video-editor-mauve-pi.vercel.app', title: 'The workspace', text: 'Media bin, live preview with playback controls, the selected clip’s properties, and a timeline with a playhead, a ruler and tools for select, cut, ripple, roll, slip and slide.' },
            { image: '/projects/videoeditor/media.webp', url: 'video-editor-mauve-pi.vercel.app', title: 'Upload media', text: 'Click Upload media or drag files in. Videos, images and audio land in the bin with a type badge and duration, and can be filtered by All, Videos, Images, Audio, Stock or Clips.' },
            { image: '/projects/videoeditor/stock.webp', url: 'video-editor-mauve-pi.vercel.app', title: 'Stock library', text: 'The Stock tab searches free stock videos and photos from Pixabay and Pexels. Search a word like “mountains” and the results come back as draggable thumbnails with duration and source, ready to drop on the timeline. It uses an API key you add once.' },
            { image: '/projects/videoeditor/audio.webp', url: 'video-editor-mauve-pi.vercel.app', title: 'Generate AI music', text: 'Pick a mood (Happy, Calm, Energetic, Romantic or Mysterious) and a length, and the editor composes a track in the browser with Tone.js. It needs no account and no key, and you can preview it before adding it.' },
            { image: '/projects/videoeditor/music.webp', url: 'video-editor-mauve-pi.vercel.app', title: 'Music on the timeline', text: 'Add to Timeline places the generated track on an audio track with its waveform, ready to trim, move and mix. Searching Freesound for sound effects is separate and uses your own free Freesound key.' },
            { image: '/projects/videoeditor/color.webp', url: 'video-editor-mauve-pi.vercel.app', title: 'Look and feel controls', text: 'Transform, crop, speed, colour and filters live in collapsible groups. Brightness, contrast, saturation and hue sit beside blur and grayscale, and the preview updates as you drag.' },
            { image: '/projects/videoeditor/text.webp', url: 'video-editor-mauve-pi.vercel.app', title: 'Titles on their own track', text: 'Add Title drops text on the preview and creates a text track at the playhead. Style it with font, size, bold, italic, alignment, colour and opacity, plus stroke, shadow and background.' },
          ],
        },
        features: {
          eyebrow: 'Chapter 3 · What it does',
          title: 'A lot of editor, in one page.',
          items: [
            { icon: '🎞️', title: 'Multi-track timeline', text: 'Video tracks V1 to V4 and audio tracks, with drag to move, edge trim, marquee select and snapping.' },
            { icon: '✂️', title: 'Pro editing tools', text: 'Razor, ripple, rolling, slip and slide tools, mark in and out, lift and extract, and keyboard shortcuts for most of it.' },
            { icon: '✨', title: 'Transitions', text: 'Eleven transitions: dissolve, fade black, slides, wipes and zooms, picked per clip.' },
            { icon: '🔤', title: 'Text and shapes', text: 'Styled titles with entrance and exit animations, plus shapes, outlines, lines, arrows and frames.' },
            { icon: '🎨', title: 'Colour, curves and keyframes', text: 'Brightness, contrast, saturation, hue, curves, blend and keyframed properties.' },
            { icon: '🎵', title: 'Audio and AI music', text: 'An audio mixer with mute and solo, waveforms, and a generator that composes music from a mood.' },
          ],
        },
        workflow: {
          eyebrow: 'Chapter 4 · The workflow',
          title: 'From raw clips to an MP4.',
          intro: 'The path a project takes through the editor.',
          progress: false,
          steps: [
            { name: 'Bring in media', text: 'Upload videos, images and audio, or drag them in. Each file appears in the media bin and lands on the timeline.' },
            { name: 'Arrange on the timeline', text: 'Drag clips into order, trim their edges, and cut with the razor.' },
            { name: 'Refine the clip', text: 'Select a clip to change its scale, rotation, opacity, speed, colour and filters in the Properties panel.' },
            { name: 'Add titles, shapes and transitions', text: 'Text goes on its own track. Shapes come from the Elements panel, and a transition is picked per clip.' },
            { name: 'Set the canvas', text: 'Resize to a preset such as Instagram Story, YouTube Video or 4K Ultra HD, or type a custom size.' },
            { name: 'Save your work', text: 'Undo and redo as you go, and save the project as a file you can load again later.' },
            { name: 'Export', text: 'Choose the file name, resolution, quality and frame rate. FFmpeg renders the MP4 in your browser.' },
          ],
        },
        output: {
          eyebrow: 'Chapter 5 · Getting it out',
          title: 'Presets, transitions and export.',
          intro: 'Fifteen canvas presets, eleven transitions, and a simple export dialog.',
          chips: ['Instagram Story', 'TikTok', 'YouTube', 'Twitter/X', '4K Ultra HD', 'Cinematic', 'Presentation'],
          chipLabel: 'Canvas presets',
          items: [
            { image: '/projects/videoeditor/resize.webp', url: 'Resize canvas', title: 'Resize for any platform', text: 'Presets for social, video and presentation sizes, with search, or a custom width and height with an aspect lock.' },
            { image: '/projects/videoeditor/transitions.webp', url: 'Transitions', title: 'Eleven transitions', text: 'A grid of previews: None, Dissolve, Fade Black, four slides, two wipes and two zooms, applied to the selected clip.' },
            { image: '/projects/videoeditor/export.webp', url: 'Export Video', title: 'Export', text: 'File name, resolution, four quality levels from Draft to High, and 24, 25, 30 or 60 fps. The dialog is honest that overlay tracks V2 to V4 are not yet composited.' },
          ],
        },
        stack: {
          eyebrow: 'Chapter 6 · The stack',
          title: 'Built with',
          groups: [
            { label: 'Interface', items: ['React', 'Zustand', 'Vite'], note: 'Component panels, a shared editor store with undo and redo, and a fast build.' },
            { label: 'Media', items: ['FFmpeg (WebAssembly)', 'Canvas'], note: 'Export runs in the browser. Text and shapes are drawn to canvas and composited into the video.' },
            { label: 'Audio', items: ['Tone.js', 'Magenta'], note: 'Generated music, waveforms and the audio mixer.' },
          ],
        },
        cta: { title: 'Try the editor.', text: 'Open it, drop in a clip and start cutting.', button: 'Visit Live Project' },
      },
      sheet: {
        eyebrow: 'Personal project',
        title: 'Video Editor',
        subtitle: 'Browser-based editor',
        image: '/projects/project6.webp',
        paragraphs: ['A browser-based video editor where you upload media, preview it in a player and arrange clips on a multi-track timeline with tools such as trim, split and zoom, plus text, elements and transitions.'],
        groups: [{ label: 'Features', items: ['Upload media', 'Player preview', 'Multi-track timeline', 'Trim', 'Split', 'Zoom', 'Text', 'Elements', 'Transitions'] }],
      },
    },
  ],
}

// The "My Stack" section: the same tools as the popup above, each with a tile and a one-line note.
// `mark` is the text on the tile, `bg` / `fg` its colours. Swap marks for real logos any time.
export const stackSection = {
  eyebrow: 'My stack',
  title: 'Everything I know,',
  highlight: 'unwrapped.',
  hint: 'Tap to unwrap',
  caption: 'My toolkit. Hover a tool to see what it is.',
  tag: 'S.',
  tools: [
    { name: 'Claude', cat: 'AI', logo: 'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z', bg: '#d97757', fg: '#fff', note: 'AI assistant for thinking through problems, writing and building faster.' },
    { name: 'ChatGPT', cat: 'AI', logo: 'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z', bg: '#fff', fg: '#000', note: 'AI assistant for brainstorming, quick research and first drafts.' },
    { name: 'Antigravity', cat: 'AI', img: '/stack/antigravity.svg', bg: '#fff', fg: '#3186ff', note: 'Agent-first coding environment that takes on the busywork.' },
    { name: 'Google Gemini', cat: 'AI', logo: 'M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81', bg: 'linear-gradient(135deg, #4796e3, #9168c0 55%, #d96570)', fg: '#fff', note: "Google's AI assistant for answers, ideas and summaries." },
    { name: 'Git', cat: 'DEV TOOL', logo: 'M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187', bg: '#f05032', fg: '#fff', note: 'Version control: every change tracked, every experiment safe.' },
    { name: 'GitHub', cat: 'DEV TOOL', logo: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12', bg: '#181717', fg: '#fff', note: 'Where code lives: repositories, pull requests and reviews.' },
    { name: 'VS Code', cat: 'DEV TOOL', logo: 'M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z', bg: '#007acc', fg: '#fff', note: 'The editor where most of my code gets written.' },
    { name: 'Figma', cat: 'DESIGN', img: '/stack/figma.svg', bg: '#fff', fg: '#a259ff', note: 'Design tool for interfaces, layouts and prototypes before they are built.' },
    { name: 'Vercel', cat: 'HOSTING', logo: 'M24 22.525H0l12-21.05 12 21.05z', bg: '#000', fg: '#fff', note: 'Hosting and deployment: where several of my projects go live.' },
    { name: 'React', cat: 'FRAMEWORK', logo: 'M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z', bg: '#61dafb', fg: '#20232a', note: 'Component-based UI: this portfolio is built with it.' },
    { name: 'Next.js', cat: 'FRAMEWORK', logo: 'M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z', bg: '#000', fg: '#fff', note: 'React framework for full-stack apps, routing and rendering.' },
    { name: 'Tailwind CSS', cat: 'FRAMEWORK', logo: 'M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z', bg: '#06b6d4', fg: '#fff', note: 'Utility-first CSS for building interfaces quickly.' },
    { name: 'MySQL', cat: 'DATABASE', logo: 'M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.978-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22a.754.754 0 00.3-.615c0-.33-.23-.61-.648-.845-.388-.213-1.163-.657-1.163-.657-.422-.307-.632-.636-.632-1.177 0-.45.157-.81.47-1.085.315-.278.72-.415 1.22-.415.512 0 .98.136 1.4.41l-.213.476a2.726 2.726 0 00-1.064-.23c-.283 0-.502.068-.654.206a.685.685 0 00-.248.524c0 .328.234.61.666.85.393.215 1.187.67 1.187.67.433.305.648.63.648 1.168zm9.382-5.852c-.535-.014-.95.04-1.297.188-.1.04-.26.04-.274.167.055.053.063.14.11.214.08.134.218.313.346.407.14.11.28.216.427.31.26.16.555.255.81.416.145.094.293.213.44.313.073.05.12.14.214.172v-.02c-.046-.06-.06-.147-.105-.214-.067-.067-.134-.127-.2-.193a3.223 3.223 0 00-.695-.675c-.214-.146-.682-.35-.77-.595l-.013-.014c.146-.013.32-.066.46-.106.227-.06.435-.047.67-.106.106-.027.213-.06.32-.094v-.06c-.12-.12-.21-.283-.334-.395a8.867 8.867 0 00-1.104-.823c-.21-.134-.476-.22-.697-.334-.08-.04-.214-.06-.26-.127-.12-.146-.19-.34-.275-.514a17.69 17.69 0 01-.547-1.163c-.12-.262-.193-.523-.34-.763-.69-1.137-1.437-1.826-2.586-2.5-.247-.14-.543-.2-.856-.274-.167-.008-.334-.02-.5-.027-.11-.047-.216-.174-.31-.235-.38-.24-1.364-.76-1.644-.072-.18.434.267.862.422 1.082.115.153.26.328.34.5.047.116.06.235.107.356.106.294.207.622.347.897.073.14.153.287.247.413.054.073.146.107.167.227-.094.136-.1.334-.154.5-.24.757-.146 1.693.194 2.25.107.166.362.534.703.393.3-.12.234-.5.32-.835.02-.08.007-.133.048-.187v.015c.094.188.188.367.274.555.206.328.566.668.867.895.16.12.287.328.487.402v-.02h-.015c-.043-.058-.1-.086-.154-.133a3.445 3.445 0 01-.35-.4 8.76 8.76 0 01-.747-1.218c-.11-.21-.202-.436-.29-.643-.04-.08-.04-.2-.107-.24-.1.146-.247.273-.32.453-.127.288-.14.642-.188 1.01-.027.007-.014 0-.027.014-.214-.052-.287-.274-.367-.46-.2-.475-.233-1.238-.06-1.785.047-.14.247-.582.167-.716-.042-.127-.174-.2-.247-.303a2.478 2.478 0 01-.24-.427c-.16-.374-.24-.788-.414-1.162-.08-.173-.22-.354-.334-.513-.127-.18-.267-.307-.368-.52-.033-.073-.08-.194-.027-.274.014-.054.042-.075.094-.09.088-.072.335.022.422.062.247.1.455.194.662.334.094.066.195.193.315.226h.14c.214.047.455.014.655.073.355.114.675.28.962.46a5.953 5.953 0 012.085 2.286c.08.154.115.295.188.455.14.33.313.663.455.982.14.315.275.636.476.897.1.14.502.213.682.286.133.06.34.115.46.188.23.14.454.3.67.454.11.076.443.243.463.378z', bg: '#00758f', fg: '#fff', note: 'Relational database for structured, queryable data.' },
    { name: 'Supabase', cat: 'DATABASE', logo: 'M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z', bg: '#3ecf8e', fg: '#fff', note: 'Backend as a service: database, auth and storage in one place.' },
  ],
}

// Closing section. Tiles use profile.links (GitHub, LinkedIn, Resume) and profile.email.
export const contactSection = {
  title: "Let's build something",
  highlight: 'together.',
  sub: 'Open to roles and projects. Say hi, or send me something to work on.',
  tiles: [
    { key: 'M', kind: 'mail', icon: 'mail', color: '#ff6b4a', title: 'Email', text: 'Roles, projects, or just hi.' },
    { key: 'G', link: 'GitHub', icon: 'github', color: '#3b3f4a', title: 'GitHub', text: 'The code behind the work.' },
    { key: 'L', link: 'LinkedIn', icon: 'linkedin', color: '#2f7fd8', title: 'LinkedIn', text: "Let's connect." },
    { key: 'R', link: 'Resume', icon: 'file', color: '#10b981', title: 'Resume', text: 'My story, one click away.' },
  ],
}

