/**
 * Terminal Component - Interactive Shell
 */

import React, { useState, useRef, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { profile, projects } from '../data/portfolioData';

const renderProjectList = () => projects.map((project, index) => {
  const liveHint = project.demoUrl ? ' • live' : '';
  return `│  [${index + 1}] ${project.title}${liveHint}
│      ${project.category}`;
}).join('\n│                                                  │\n');

const commands = {
  help: () => `
Available commands:
  help      - Show this help message
  about     - Learn more about me
  skills    - Display my technical skills
  projects  - View my projects
  contact   - Get my contact information
  social    - Show social media links
  clear     - Clear the terminal
  date      - Display current date/time
  whoami    - Display visitor info
  echo      - Echo back your message
  sudo      - Try your luck!
  matrix    - Enter the matrix...

Type any command and press Enter.`,

  about: () => `
┌─────────────────────────────────────────────────┐
│                    ABOUT ME                     │
├─────────────────────────────────────────────────┤
│  Name: ${profile.name}                           │
│  Role: ${profile.tagline}                        │
│  GitHub: ${profile.handle}                       │
│                                                 │
│  I build public projects in JavaScript,         │
│  TypeScript, and Python.                        │
│                                                 │
│  This portfolio highlights live demos,          │
│  backend work, security tools, and forks.       │
│                                                 │
│  Mission: Keep shipping useful software.        │
└─────────────────────────────────────────────────┘`,

  skills: () => `
╔══════════════════════════════════════════════════╗
║                 TECHNICAL SKILLS                 ║
╠══════════════════════════════════════════════════╣
║ Frontend & UI:                                   ║
║   ► HTML5, CSS3, SASS        ████████████░ 95%  ║
║   ► JavaScript, TypeScript   █████████████░ 90% ║
║   ► React, Component Design  ████████████░ 88%  ║
║   ► Bootstrap, Responsive UI ████████████░ 92%  ║
║                                                  ║
║ Backend & APIs:                                  ║
║   ► Node.js, Express         █████████████░ 90% ║
║   ► Python, FastAPI          ████████████░ 85% ║
║   ► REST API Design          ████████████░ 87% ║
║   ► JSON / File Handling     ███████████░░ 84% ║
║                                                  ║
║ Security & Productivity:                         ║
║   ► Authentication          ███████████░░ 78%  ║
║   ► File Utilities / CSV     ████████████░ 84% ║
║   ► Deployment / Hosting     ███████████░░ 82% ║
║                                                  ║
║ Tools & Workflow:                                ║
║   ► Git / GitHub             █████████████░ 95% ║
║   ► Vercel / Deployment      ███████████░░ 84% ║
║   ► Debugging / Refactoring   ███████████░░ 86% ║
╚══════════════════════════════════════════════════╝`,

  projects: () => `
┌──────────────────────────────────────────────────┐
│                   MY PROJECTS                    │
├──────────────────────────────────────────────────┤
│                                                  │
${renderProjectList()}
│                                                  │
│  Visit GitHub for the full source:               │
│  ${profile.githubUrl}                            │
└──────────────────────────────────────────────────┘`,

  contact: () => `
┌──────────────────────────────────────────────────┐
│                CONTACT INFORMATION               │
├──────────────────────────────────────────────────┤
│                                                  │
│  📧 Email:    ${profile.email}                    │
│  📍 Location: ${profile.location}                │
│  🕐 Status:   Open to collaborations             │
│                                                  │
│  Feel free to reach out about projects,          │
│  collaborations, or feedback.                    │
│                                                  │
└──────────────────────────────────────────────────┘`,

  social: () => `
┌──────────────────────────────────────────────────┐
│                  SOCIAL LINKS                    │
├──────────────────────────────────────────────────┤
│                                                  │
│  GitHub:     ${profile.githubUrl}                │
│  LinkedIn:   ${profile.linkedInUrl}               │
│  Email:      mailto:${profile.email}             │
│                                                  │
│  Let's connect and build something amazing!      │
│                                                  │
└──────────────────────────────────────────────────┘`,

  date: () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  },

  whoami: () => `
visitor@portfolio
├── Role: Potential Collaborator / Recruiter
├── Status: Exploring Portfolio
├── Access Level: Guest
└── Session: Active

Welcome to my portfolio! Feel free to explore.`,

  sudo: () => `
[sudo] password for visitor: ********
Sorry, visitor is not in the sudoers file.
This incident will be reported. 😄

Just kidding! You're awesome for trying though!`,

  matrix: () => `
Wake up, Neo...
The Matrix has you...
Follow the white rabbit.

        ╔═══════════════════════════════╗
        ║  KNOCK KNOCK                  ║
        ║                               ║
        ║  Take the red pill and see    ║
        ║  how deep the rabbit hole     ║
        ║  goes... or hire me! 😎       ║
        ╚═══════════════════════════════╝`,

  ls: () => `
drwxr-xr-x  about/
drwxr-xr-x  projects/
drwxr-xr-x  skills/
-rw-r--r--  github-profile.txt
-rw-r--r--  public-projects.json
-rwxr-xr-x  hire_me.sh`,

  pwd: () => '/home/visitor/portfolio',

  uname: () => 'PortfolioOS 1.0.0 x86_64 Web/Browser',

  neofetch: () => `
        .--.         visitor@portfolio
       |o_o |        ─────────────────
       |:_/ |        OS: PortfolioOS 1.0
      //   \\ \\       Host: Web Browser
     (|     | )      Kernel: React 18+
    /'\\_   _/\\\\      Shell: Custom Terminal v1.0
    \\___)=(___/      Theme: Cyberpunk Dark
                     Icons: Bootstrap Icons
                     Terminal: Glass Morphism
                     CPU: Powered by Coffee ☕
                     Memory: Unlimited Ideas`,

  fortune: () => {
    const fortunes = [
      'A clean codebase is a happy codebase.',
      'The best code is no code at all.',
      'First, solve the problem. Then, write the code.',
      'Code is like humor. When you have to explain it, it\'s bad.',
      'Simplicity is the soul of efficiency.',
      'Any fool can write code that a computer can understand.',
      'Programming is thinking, not typing.',
      'The only way to learn is by doing.',
      'Debugging is twice as hard as writing the code.',
      'Stay curious, keep learning, never stop building!'
    ];
    return fortunes[Math.floor(Math.random() * fortunes.length)];
  },

  cowsay: (args) => {
    const message = args.length > 0 ? args.join(' ') : 'Hire Sourav!';
    const border = '─'.repeat(message.length + 2);
    return `
 ┌${border}┐
 │ ${message} │
 └${border}┘
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
  }
};

const aliases = {
  cls: 'clear',
  hi: 'about',
  hello: 'about',
  info: 'about',
  '?': 'help',
  skill: 'skills',
  project: 'projects',
  work: 'projects',
  portfolio: 'projects',
  email: 'contact',
  connect: 'social',
  time: 'date',
  now: 'date'
};

const easterEggs = {
  rm: 'Nice try! 😏 rm is disabled for safety.',
  exit: 'exit: You can check out any time you like, but you can never leave! 🎸',
  quit: 'quit: Why would you want to quit? Stay a while!',
  vim: 'vim: How do I exit this? Press :q! ... wait, wrong terminal!',
  emacs: 'emacs: C-x C-c to exit... just kidding, this isn\'t emacs!',
  nano: 'nano: ^X to exit... or just enjoy the portfolio!',
  cd: 'cd: You\'re already in the best directory! 🏠'
};

function Terminal() {
  const [ref, isVisible] = useScrollReveal();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = (inputValue) => {
    const trimmed = inputValue.trim();
    if (!trimmed) return null;

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (cmd === 'clear') {
      setHistory([]);
      return null;
    }

    if (aliases[cmd]) {
      return processCommand(`${aliases[cmd]} ${args.join(' ')}`.trim());
    }

    if (easterEggs[cmd]) {
      return easterEggs[cmd];
    }

    if (cmd === 'echo') {
      return args.length > 0 ? args.join(' ') : 'Usage: echo <message>';
    }

    if (cmd === 'cat') {
      if (args.length === 0) return 'Usage: cat <filename>';
      const filename = args[0].toLowerCase();
      const files = {
        'contact.txt': commands.contact(),
        'github-profile.txt': `GitHub: ${profile.githubUrl}\nHandle: ${profile.handle}\nEmail: ${profile.email}`,
        'public-projects.json': JSON.stringify(projects.map((project) => ({
          title: project.title,
          category: project.category,
          repoUrl: project.repoUrl,
          demoUrl: project.demoUrl || null
        })), null, 2),
        'hire_me.sh': '#!/bin/bash\necho "Let\'s build something amazing together!"\nexit 0'
      };
      return files[filename] || `cat: ${args[0]}: No such file or directory`;
    }

    if (cmd === 'cowsay') {
      return commands.cowsay(args);
    }

    if (commands[cmd]) {
      return commands[cmd](args);
    }

    return `bash: ${cmd}: command not found\nType 'help' to see available commands.`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const response = processCommand(input);

    setHistory((prev) => [...prev, { command: input, response }]);
    setCommandHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const handleClear = () => {
    setHistory([]);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <section id="terminal" className="terminal-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">&lt; Terminal /&gt;</span>
          <h2 className="section-title">$ Interactive Shell</h2>
          <div className="section-line"></div>
          <p className="section-subtitle">Type 'help' to see available commands</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div
              ref={ref}
              className={`interactive-terminal glass-card scroll-reveal ${isVisible ? 'revealed' : ''}`}
              onClick={focusInput}
            >
              <div className="terminal-header">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
                <span className="terminal-title">visitor@portfolio ~ bash</span>
                <div className="terminal-controls">
                  <button className="terminal-btn" onClick={handleClear} title="Clear">
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              </div>

              <div className="terminal-body" ref={bodyRef}>
                <div className="terminal-welcome">
                  <pre className="ascii-art">{`
 ____            _    __       _ _       
|  _ \\ ___  _ __| |_ / _| ___ | (_) ___  
| |_) / _ \\|'__| __| |_ / _ \\| | |/ _ \\ 
|  __/ (_) | |  | |_|  _| (_) | | | (_) |
|_|   \\___/|_|   \\__|_|  \\___/|_|_|\\___/ 
                                          `}</pre>
                  <p>Welcome to my interactive portfolio terminal!</p>
                  <p>Type <span className="text-accent">'help'</span> to see available commands.</p>
                </div>

                <div id="terminalOutput">
                  {history.map((item, index) => (
                    <div key={index} className="command-output">
                      <div className="terminal-line">
                        <span className="prompt">visitor@portfolio:~$</span>
                        <span className="command-text"> {item.command}</span>
                      </div>
                      {item.response && (
                        <div className="output-response">
                          <pre>{item.response}</pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="terminal-input-line">
                  <span className="prompt">visitor@portfolio:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    className="terminal-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    spellCheck="false"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Terminal;
