import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDown, ArrowUpRight, Check, Code2, Copy, Download, FileSpreadsheet, Mail, Menu, Phone, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

type Track = 'coding' | 'excel';
type Project = { id: string; title: string; type: string; description: string; tags: string[]; className?: string; link?: string; note?: string };

const queryClient = new QueryClient();
const resumePath = '/resources/ujef-khan-resume.pdf';

const codingProjects: Project[] = [
  { id: 'portfolio', title: 'Portfolio Website', type: 'Practice build', description: 'A responsive personal site that brings together practical development work, clear information, and a considered visual system.', tags: ['HTML', 'CSS', 'JavaScript'], className: 'coding' },
  { id: 'restaurant', title: 'Restaurant Website', type: 'Practice build', description: 'A focused web experience for a restaurant concept, shaped around menu clarity, mobile readability, and simple navigation.', tags: ['Bootstrap', 'JavaScript', 'Responsive'], className: 'coding' },
  { id: 'commerce', title: 'E-commerce Website', type: 'Practice build', description: 'An e-commerce interface exercise exploring product presentation, categories, and a clean path from browsing to action.', tags: ['React.js', 'Django', 'Git'], className: 'coding' },
];
const excelProjects: Project[] = [
  { id: 'school', title: 'CBSE School Management System', type: 'Portfolio project', description: 'A structured school data system concept for organizing records and making routine information easier to manage.', tags: ['Excel', 'Data validation', 'Reports'], className: 'excel' },
  { id: 'invoice', title: 'Client Invoice System', type: 'Portfolio project', description: 'An editable invoice workflow practice project designed around repeatable entries, clean totals, and useful output.', tags: ['Formulas', 'Formatting', 'Workflow'], className: 'excel' },
  { id: 'ai-practice', title: 'AI-Assisted Formula & Automation Practice', type: 'Ongoing practice', description: 'A growing set of experiments using ChatGPT and Copilot to explore formula suggestions, checks, and practical automation ideas.', tags: ['ChatGPT', 'Copilot', 'VBA'], className: 'practice', note: 'Clearly marked as ongoing practice rather than client or commercial experience.' },
];
const workbookProjects: Project[] = [
  { id: 'shop', title: 'Small Shop Sales & Profit Manager', type: 'Practice / Portfolio Project', description: 'A small-business workbook concept for tracking sales, cost, profit, and product performance in one place.', tags: ['Sales', 'Profit', 'KPI'], link: '/resources/small-shop-sales-profit-manager.xlsx', className: 'excel' },
  { id: 'inventory', title: 'Inventory Auto Reorder System', type: 'Practice / Portfolio Project', description: 'A stock view with reorder signals, inventory value, potential sales, and potential profit.', tags: ['Inventory', 'Reorder', 'Formulas'], link: '/resources/inventory-auto-reorder-system.xlsx', className: 'excel' },
  { id: 'attendance', title: 'Employee Attendance & Salary Calculator', type: 'Practice / Portfolio Project', description: 'A structured attendance and salary calculator including overtime and final salary calculations.', tags: ['Attendance', 'Salary', 'Overtime'], link: '/resources/employee-attendance-salary-calculator.xlsx', className: 'excel' },
  { id: 'dashboard', title: 'Sales Data Analysis Dashboard', type: 'Practice / Portfolio Project', description: 'A dashboard workbook practice project for looking at revenue, cost, profit, orders, and business insights.', tags: ['Dashboard', 'Charts', 'Analysis'], link: '/resources/sales-data-analysis-dashboard.xlsx', className: 'wide excel' },
  { id: 'cleaning', title: 'PDF-to-Excel Data Cleaning', type: 'Practice / Portfolio Project', description: 'Before-and-after examples that demonstrate how messy information can be cleaned, standardized, and prepared for use.', tags: ['Cleaning', 'TRIM', 'Standardize'], link: '/resources/pdf-to-excel-data-cleaning.xlsx', className: 'tall practice' },
];

const codingSkills = ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'React.js', 'Django', 'Basic Python', 'VS Code', 'Git / GitHub'];
const excelSkills = ['VLOOKUP / XLOOKUP', 'INDEX-MATCH', 'Pivot Tables & Charts', 'Conditional Formatting', 'Data Validation', 'Dashboards & Reporting', 'VBA Macros', 'Power Query', 'Power Automate basics', 'ChatGPT / Copilot', 'Python openpyxl / pandas'];

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return (
    <article className={`project-card ${project.className ?? ''}`} data-testid={`card-project-${project.id}`}>
      <div className="project-index"><span>0{project.id === 'dashboard' ? 4 : project.id === 'cleaning' ? 5 : 1}</span><span>{project.type}</span></div>
      <div className="project-visual" aria-hidden="true" />
      <h3 className="display">{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-footer">
        <span className="project-type">{project.type}</span>
        <button className="project-btn" type="button" onClick={() => onOpen(project)} data-testid={`button-open-project-${project.id}`}>
          {project.link ? 'Open workbook' : 'View notes'} <ArrowUpRight size={13} />
        </button>
      </div>
    </article>
  );
}

function Home() {
  const [track, setTrack] = useState<Track>('coding');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const [, setLocation] = useLocation();
  const projects = track === 'coding' ? codingProjects : excelProjects;

  const goTo = (id: string) => {
    setMenuOpen(false);
    setLocation(`/#${id}`);
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 0);
  };
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText('ujefkhan1786@gmail.com'); } catch { /* clipboard can be unavailable in local previews */ }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };
  const openProject = (project: Project) => {
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
      return;
    }
    setSelectedProject(project);
  };

  return (
    <div className="site-shell">
      <header className={`nav ${menuOpen ? 'is-open' : ''}`}>
        <div className="container-wide nav-inner">
          <button className="brand" type="button" onClick={() => goTo('top')} data-testid="button-home">
            <span className="brand-mark">UK</span><span>Ujef Khan</span>
          </button>
          <nav className="nav-links" aria-label="Primary navigation">
            <button type="button" onClick={() => goTo('work')} data-testid="link-work">Work</button>
            <button type="button" onClick={() => goTo('capabilities')} data-testid="link-capabilities">Capabilities</button>
            <button type="button" onClick={() => goTo('about')} data-testid="link-about">About</button>
            <button className="nav-contact" type="button" onClick={() => goTo('contact')} data-testid="link-contact">Let's talk <ArrowUpRight size={14} /></button>
          </nav>
          <button className="mobile-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero container-wide" aria-labelledby="hero-title">
          <div className="hero-grid">
            <div className="reveal">
              <SectionLabel>Self-learning developer / Excel specialist</SectionLabel>
              <h1 id="hero-title" className="display">Making messy<br /><em>information</em> useful.</h1>
              <p className="hero-copy">I’m Ujef Khan, a developer and spreadsheet problem-solver from Uttar Pradesh. I turn business information into clear websites, editable workbooks, dashboards, and automation workflows.</p>
              <div className="hero-actions">
                <button className="btn-primary" type="button" onClick={() => goTo('work')} data-testid="button-explore-work">Explore the work <ArrowDown size={15} /></button>
                <a className="btn-ghost" href={resumePath} target="_blank" rel="noreferrer" data-testid="link-view-resume"><Download size={15} /> View resume</a>
              </div>
              <div className="hero-meta"><span>Based in Uttar Pradesh</span><span>Hindi</span><span>Available for collaboration</span></div>
            </div>
            <div className="scene reveal delay-2" aria-label="Abstract dimensional dashboard illustration">
              <div className="scene-dot" /><div className="scene-grid" /><div className="scene-orbit" />
              <div className="scene-card">
                <div className="scene-label"><span>ujef / studio</span><span>01 — 05</span></div>
                <div className="scene-title">Clarity<br />in the details.</div>
                <div className="scene-bars"><i /><i /><i /><i /><i /></div><span className="scene-tag">working draft</span>
              </div>
              <p className="scene-note">A dimensional workspace for code, cells, and the thinking between them.</p>
            </div>
          </div>
        </section>

        <div className="ticker-wrap" aria-hidden="true"><div className="ticker"><span>Web development <b>+</b></span><span>Excel systems <b>+</b></span><span>Data cleaning <b>+</b></span><span>Clear reporting <b>+</b></span><span>Web development <b>+</b></span><span>Excel systems <b>+</b></span><span>Data cleaning <b>+</b></span><span>Clear reporting <b>+</b></span></div></div>

        <section className="section container-wide" id="work" aria-labelledby="work-title">
          <div className="section-head"><div><SectionLabel>Selected practice</SectionLabel><h2 id="work-title" className="display">Work, in two<br />useful modes.</h2></div><p className="section-intro">Two tracks, one approach: understand the information first, then build something people can actually use.</p></div>
          <div className="switcher-wrap">
            <div className="switcher" role="tablist" aria-label="Portfolio track">
              <button className={track === 'coding' ? 'active' : ''} type="button" role="tab" aria-selected={track === 'coding'} onClick={() => setTrack('coding')} data-testid="button-switch-coding"><Code2 size={15} /> Coding</button>
              <button className={track === 'excel' ? 'active' : ''} type="button" role="tab" aria-selected={track === 'excel'} onClick={() => setTrack('excel')} data-testid="button-switch-excel"><FileSpreadsheet size={15} /> Excel & data</button>
            </div>
          </div>
          <div className="track-content" key={track}>
            <div className="track-intro">
              <h3 className="display">{track === 'coding' ? 'Interfaces with a practical point of view.' : 'Spreadsheets that explain themselves.'}</h3>
              <div><p>{track === 'coding' ? 'I’m building a foundation across front-end and back-end tools, with practice projects that focus on useful structure, responsive behavior, and clear interactions.' : 'I build editable, phone-friendly spreadsheet systems for organizing, calculating, cleaning, and reporting business information with Excel and AI-assisted workflows.'}</p><div className="skill-cloud">{(track === 'coding' ? codingSkills : excelSkills).map((skill) => <span className="skill-pill" key={skill} data-testid={`text-skill-${skill.toLowerCase().replaceAll(' ', '-')}`}>{skill}</span>)}</div></div>
            </div>
            <div className="project-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} onOpen={openProject} />)}</div>
            {track === 'excel' && <><div className="section-head" style={{ marginTop: 106, marginBottom: 28 }}><div><SectionLabel>Workbook shelf</SectionLabel><h2 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)' }}>Practice you can<br />open and inspect.</h2></div><p className="section-intro">These are portfolio workbooks, not claimed client work. Each one is built to be readable, editable, and honest about its status.</p></div><div className="project-grid">{workbookProjects.map((project) => <ProjectCard key={project.id} project={project} onOpen={openProject} />)}</div></>}
          </div>
        </section>

        <section className="section container-wide" id="capabilities" aria-labelledby="capabilities-title">
          <div className="section-head"><div><SectionLabel>What I bring</SectionLabel><h2 id="capabilities-title" className="display">Useful by<br />design.</h2></div><p className="section-intro">A growing toolkit, grounded in care: tidy structure, visible logic, and a willingness to keep learning.</p></div>
          <div className="capability-grid">
            <article className="capability"><span className="capability-number">01 / BUILD</span><h3 className="display">Websites that get to the point.</h3><p>Responsive practice projects across HTML, CSS, Bootstrap, JavaScript, React.js, and Django. The goal is a site that communicates clearly before it tries to impress.</p><div className="capability-list"><span>Responsive UI</span><span>Component thinking</span><span>Basic Python</span></div></article>
            <article className="capability"><span className="capability-number">02 / ORGANIZE</span><h3 className="display">Workbooks with a visible logic.</h3><p>Sales trackers, inventory systems, invoice workflows, dashboards, and data-cleaning examples. I use formulas and formatting to make the next step obvious.</p><div className="capability-list"><span>Dashboards</span><span>Data cleaning</span><span>Reporting</span></div></article>
            <article className="capability"><span className="capability-number">03 / AUTOMATE</span><h3 className="display">Less repetition, more confidence.</h3><p>Exploring VBA, Power Query, Power Automate basics, and Python openpyxl / pandas alongside ChatGPT and Copilot for assisted workflows.</p><div className="capability-list"><span>VBA macros</span><span>Power Query</span><span>AI-assisted</span></div></article>
            <article className="capability"><span className="capability-number">04 / CHECK</span><h3 className="display">Accuracy before handoff.</h3><p>My process includes inspecting the input, testing formulas, checking edge cases, and manually verifying final calculations before delivery.</p><div className="capability-list"><span>Data verification</span><span>Clear handoff</span><span>Documentation</span></div></article>
          </div>
        </section>

        <section className="section container-wide" id="about" aria-labelledby="about-title">
          <div className="about-layout"><div><SectionLabel>About / trajectory</SectionLabel><h2 id="about-title" className="about-statement">Still learning.<br /><span>Already useful.</span></h2><div className="fact-strip"><div className="fact"><strong>02</strong><small>Portfolio tracks</small></div><div className="fact"><strong>09+</strong><small>Core web skills</small></div></div></div><div><p className="about-copy">I’m a self-learning developer and Excel specialist building a practical foundation through focused projects. I enjoy the part where a messy requirement becomes a clean screen, a dependable formula, or a process someone can repeat without asking for help.</p><p className="about-copy">There are no invented client logos or testimonials here. This portfolio shows what I’m practicing, what I know, and how I think about useful work.</p><div className="timeline"><div className="timeline-item"><span className="timeline-year">2025</span><div><h4>12th — UP Board</h4><p>Completed secondary education while continuing to build web and spreadsheet skills.</p></div></div><div className="timeline-item"><span className="timeline-year">2023</span><div><h4>10th — UP Board</h4><p>Completed foundational schooling.</p></div></div><div className="timeline-item"><span className="timeline-year">CERTS</span><div><h4>ADCA · Web Development using React & Django</h4><p>Certification work supporting a growing technical toolkit.</p></div></div></div></div></div>
        </section>

        <section className="section container-wide" id="contact" aria-labelledby="contact-title">
          <div className="contact-card"><SectionLabel>Open to the next useful problem</SectionLabel><h2 id="contact-title" className="display">Have a spreadsheet<br />or site to untangle?</h2><p>Share the context, the current mess, or simply what you wish worked better. I’m available for freelance Excel and data projects, as well as thoughtful web work.</p><div className="hero-actions"><a className="btn-primary" href="mailto:ujefkhan1786@gmail.com" data-testid="link-email-cta">Start with an email <Mail size={15} /></a><a className="btn-ghost" href={resumePath} download data-testid="link-download-resume"><Download size={15} /> Download resume</a></div><div className="contact-links"><a className="contact-link" href="mailto:ujefkhan1786@gmail.com" data-testid="link-email"><Mail size={14} /> ujefkhan1786@gmail.com</a><a className="contact-link" href="tel:9758842011" data-testid="link-phone"><Phone size={14} /> 9758842011</a><button className="contact-link" type="button" onClick={copyEmail} data-testid="button-copy-email">{copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Email copied' : 'Copy email'}</button></div></div>
        </section>
      </main>

      <footer className="footer container-wide"><span>© {new Date().getFullYear()} Ujef Khan — practice, process, progress.</span><button type="button" onClick={() => goTo('top')} data-testid="button-back-top">Back to top <ArrowUpRight size={13} /></button></footer>

      {selectedProject && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" type="button" onClick={() => setSelectedProject(null)} aria-label="Close project details" data-testid="button-close-project"><X size={16} /></button><SectionLabel>{selectedProject.type}</SectionLabel><h3 id="project-modal-title" className="display">{selectedProject.title}</h3><p>{selectedProject.description}</p><div className="modal-meta">{selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{selectedProject.note ? <div className="modal-note">{selectedProject.note}</div> : <div className="modal-note">A practice project presented as part of Ujef’s learning portfolio. Open the conversation if you would like to discuss the structure or a similar problem.</div>}<div className="hero-actions"><button className="btn-primary" type="button" onClick={() => { setSelectedProject(null); goTo('contact'); }} data-testid="button-discuss-project">Discuss a similar project <ArrowUpRight size={15} /></button></div></div></div>}
      {copied && <div className="toast" role="status" data-testid="status-email-copied">Email address copied to clipboard.</div>}
    </div>
  );
}

function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}
function NotFound() { return <main className="site-shell" style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center' }}><div className="display" style={{ textAlign: 'center' }}><p>Page not found.</p><a className="btn-primary" href="/">Return home</a></div></main>; }
function App() { return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>; }

export default App;