document.addEventListener("DOMContentLoaded", () => {
  // --- Theme Toggle ---
  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;
  
  // Check local storage or default to dark
  const savedTheme = localStorage.getItem("theme") || "dark";
  htmlElement.setAttribute("data-theme", savedTheme);
  
  themeToggle.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    htmlElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    
    // Notify terminal if open
    addTerminalLine("system", `Theme toggled to ${newTheme} mode.`);
  });

  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navMenu = document.getElementById("nav-menu");
  
  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking link
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      
      // Update active state
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // --- Subtitle Typing Animation ---
  const typingElement = document.getElementById("typing-text");
  const roles = [
    "Computer Science Student @ UBC",
    "Full-Stack Developer",
    "Systems Programming Enthusiast",
    "AI/ML Developer & QA Evaluator"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeRole() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1500; // Pause at full string
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next
    }

    setTimeout(typeRole, typingSpeed);
  }
  
  if (typingElement) {
    typeRole();
  }

  // --- Projects Grid & Filtering ---
  const projectsGrid = document.getElementById("projects-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  
  let currentCategoryFilter = "all";

  function renderProjects() {
    projectsGrid.innerHTML = "";
    
    const filtered = projectsData.filter(project => {
      // Category Match
      return currentCategoryFilter === "all" || project.category === currentCategoryFilter;
    });

    if (filtered.length === 0) {
      projectsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-tertiary);">
          <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">No projects found matching the criteria.</p>
          <button class="btn btn-secondary" id="reset-grid-filters" style="padding: 0.5rem 1rem; font-size: 0.85rem; margin-top: 0.5rem;">Reset Filters</button>
        </div>
      `;
      document.getElementById("reset-grid-filters")?.addEventListener("click", resetAllFilters);
      return;
    }

    filtered.forEach(project => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.setAttribute("data-id", project.id);
      
      // Build Tech chips
      const techChipsHTML = project.tech.slice(0, 4).map(t => `<span class="tech-chip">${t}</span>`).join("");
      
      // Build Metrics preview
      const metricsPreviewHTML = Object.entries(project.metrics).slice(0, 2).map(([label, val]) => {
        return `<span class="metric-pill">${label}: ${val}</span>`;
      }).join("");

      // Build Link icons
      let githubLinkHTML = "";
      if (project.github) {
        githubLinkHTML = `
          <a href="${project.github}" target="_blank" class="project-link-icon" title="View Source on GitHub">
            <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        `;
      }

      let demoLinkHTML = "";
      if (project.demo) {
        demoLinkHTML = `
          <a href="${project.demo}" target="_blank" class="project-link-icon" title="View Live Demo">
            <svg viewBox="0 0 24 24"><path d="M14 0v2h5.59l-9.92 9.92 1.41 1.41 9.92-9.92v5.59h2v-9h-9zm-12 4v18h18v-10h-2v8h-14v-14h8v-2h-10z"/></svg>
          </a>
        `;
      }

      card.innerHTML = `
        <div class="project-card-header">
          <span class="project-category">${project.category}</span>
          <div class="project-links">
            ${githubLinkHTML}
            ${demoLinkHTML}
          </div>
        </div>
        <div class="project-card-body">
          <h3 class="project-title">${project.title}</h3>
          <span class="project-subtitle">${project.subtitle || ""}</span>
          <p class="project-desc">${project.shortDesc}</p>
          <div class="project-metrics-preview">${metricsPreviewHTML}</div>
          <div class="project-tech">${techChipsHTML}</div>
        </div>
        <div class="project-card-footer">
          <span class="project-date">${project.date}</span>
          <button class="btn-details" data-id="${project.id}">
            Learn More
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      `;

      projectsGrid.appendChild(card);
    });

    // Rebind details buttons
    document.querySelectorAll(".btn-details").forEach(btn => {
      btn.addEventListener("click", () => {
        const pId = btn.getAttribute("data-id");
        openProjectModal(pId);
      });
    });
  }

  function resetAllFilters() {
    currentCategoryFilter = "all";
    
    // Update Category UI
    filterButtons.forEach(btn => {
      btn.classList.remove("active");
      if (btn.getAttribute("data-filter") === "all") btn.classList.add("active");
    });

    renderProjects();
  }

  // Bind Category Buttons
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      
      currentCategoryFilter = button.getAttribute("data-filter");
      renderProjects();
    });
  });

  // Initial projects load
  renderProjects();

  // --- Project Modal Logic ---
  const modalOverlay = document.getElementById("project-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalTitle = document.getElementById("modal-title");
  const modalSubtitle = document.getElementById("modal-subtitle");
  const modalTechTags = document.getElementById("modal-tech-tags");
  const modalGithubLink = document.getElementById("modal-github");
  const modalDemoLink = document.getElementById("modal-demo");
  const modalMetricsGrid = document.getElementById("modal-metrics");
  
  // Tab buttons
  const modalTabBtns = document.querySelectorAll(".modal-tab-btn");
  const modalTabContents = document.querySelectorAll(".modal-tab-content");
  
  // Content blocks
  const modalOverviewContent = document.getElementById("modal-overview-content");
  const modalStarContent = document.getElementById("modal-star-content");

  let activeProject = null;

  function openProjectModal(projectId) {
    activeProject = projectsData.find(p => p.id === projectId);
    if (!activeProject) return;

    // Fill basic details
    modalTitle.textContent = activeProject.title;
    modalSubtitle.textContent = activeProject.subtitle || activeProject.date;
    
    // Fill links
    if (activeProject.github) {
      modalGithubLink.href = activeProject.github;
      modalGithubLink.style.display = "inline-flex";
    } else {
      modalGithubLink.style.display = "none";
    }
    
    if (activeProject.demo) {
      modalDemoLink.href = activeProject.demo;
      modalDemoLink.style.display = "inline-flex";
    } else {
      modalDemoLink.style.display = "none";
    }

    // Fill tech chips
    modalTechTags.innerHTML = activeProject.tech.map(t => `<span class="tech-chip">${t}</span>`).join("");

    // Fill Metrics Grid
    modalMetricsGrid.innerHTML = Object.entries(activeProject.metrics).map(([label, val]) => {
      return `
        <div class="modal-metric-card">
          <div class="modal-metric-val">${val}</div>
          <div class="modal-metric-label">${label}</div>
        </div>
      `;
    }).join("");

    // Populate Overview
    modalOverviewContent.innerHTML = `
      <div class="modal-overview-text">
        <h3>Project Scope</h3>
        <p>${activeProject.overview}</p>
      </div>
    `;

    // Populate STAR bullets
    modalStarContent.innerHTML = `
      <ul class="star-bullets-list">
        ${activeProject.starBullets.map(bullet => `<li>${bullet}</li>`).join("")}
      </ul>
    `;



    // Reset back to Overview tab
    modalTabBtns.forEach(btn => btn.classList.remove("active"));
    modalTabContents.forEach(content => content.classList.remove("active"));
    
    document.querySelector('.modal-tab-btn[data-tab="overview"]').classList.add("active");
    modalOverviewContent.classList.add("active");

    // Open modal view
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  }

  function closeProjectModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = ""; // Re-enable background scroll
    activeProject = null;
  }

  // Modal close binding
  modalCloseBtn.addEventListener("click", closeProjectModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeProjectModal();
  });
  
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeProjectModal();
    }
  });

  // Modal tab switching
  modalTabBtns.forEach(button => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab");
      
      modalTabBtns.forEach(btn => btn.classList.remove("active"));
      modalTabContents.forEach(content => content.classList.remove("active"));
      
      button.classList.add("active");
      document.getElementById(`modal-${tabId}-content`).classList.add("active");
    });
  });

  // --- Interactive Terminal Logic ---
  const terminalBody = document.getElementById("terminal-body");
  const termInput = document.getElementById("terminal-input");
  
  // Set focus on terminal input when terminal is clicked
  const terminalElement = document.querySelector(".terminal");
  if (terminalElement) {
    terminalElement.addEventListener("click", () => {
      termInput.focus();
    });
  }

  function addTerminalLine(type, text, command = "") {
    const line = document.createElement("div");
    line.className = "terminal-line";
    
    if (type === "input") {
      line.innerHTML = `<span class="prompt-symbol">tanishq@ubc:~$</span> <span class="command-text">${command}</span>`;
    } else if (type === "output") {
      line.innerHTML = `<div class="output-text">${text}</div>`;
    } else if (type === "system") {
      line.innerHTML = `<div class="output-text" style="color: var(--text-tertiary); font-style: italic;">[${text}]</div>`;
    }
    
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight; // Auto-scroll
  }

  // Pre-fill terminal lines on load
  setTimeout(() => {
    addTerminalLine("output", "Welcome to Tanishq's Interactive Terminal v1.2.0");
    addTerminalLine("output", "Type <span class='highlight'>help</span> to view available commands.");
    addTerminalLine("input", "", "about");
    addTerminalLine("output", "Computer Science student @ UBC (GPA: 84.2%) with experience in full-stack web, C++ networking, and LLM evaluation rubrics at Turing.");
  }, 500);

  termInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const rawInput = termInput.value.trim();
      termInput.value = "";
      
      if (!rawInput) return;
      
      const parts = rawInput.split(" ");
      const cmd = parts[0].toLowerCase();
      const arg = parts.slice(1).join(" ");
      
      // Log input line
      addTerminalLine("input", "", rawInput);
      
      // Execute command
      executeTerminalCommand(cmd, arg);
    }
  });

  function executeTerminalCommand(cmd, arg) {
    switch (cmd) {
      case "help":
        addTerminalLine("output", `
Available commands:
  <span class="highlight">about</span>      - Quick technical profile
  <span class="highlight">skills</span>     - Show core technologies
  <span class="highlight">projects</span>   - List and describe main projects
  <span class="highlight">experience</span> - Professional summary timeline
  <span class="highlight">contact</span>    - Show developer links
  <span class="highlight">theme</span>      - Toggle light/dark layout theme
  <span class="highlight">clear</span>      - Clear terminal screen
        `);
        break;
        
      case "about":
        addTerminalLine("output", "Computer Science Undergraduate at the University of British Columbia. Specialized in systems programming (C/C++), embedded firmware & RTOS (STM32, FreeRTOS), and full-stack web architectures (Next.js, Supabase, Postgres).");
        break;
        
      case "skills":
        addTerminalLine("output", `
<span class="highlight">Languages:</span> C, C++, Java, Python, TypeScript, SQL, R, Bash
<span class="highlight">Web Stack:</span> Next.js, React, Node.js, Express, Tailwind, PostgreSQL
<span class="highlight">Systems:</span> STM32, FreeRTOS, Sockets, std::thread, WebAssembly, Makefiles, Linux
<span class="highlight">AI/ML:</span> Neural Networks (from scratch NumPy), Gemini API
        `);
        break;
        
      case "projects":
        addTerminalLine("output", `
Interactive Projects:
  - <span class="highlight">STM32 Embedded Firmware</span> (Bare-metal & FreeRTOS multitasking in C)
  - <span class="highlight">Canvas AI</span> (Next.js study companion using Google Gemini API & Supabase)
  - <span class="highlight">HTTP Server</span> (High-performance multithreaded C++ socket server)
  - <span class="highlight">Sudoku Solver</span> (C solving engine compiled to WebAssembly, 33,750x speedup)
  - <span class="highlight">MNIST Classifier</span> (Vectorized 4-layer neural net using NumPy only)
  
*Tip: Click the project cards below for detailed STAR descriptions.*
        `);
        break;
        
      case "experience":
        addTerminalLine("output", `
- <span class="highlight">Data Annotator & QA Analyst Intern — Turing</span> (Sept - Dec 2025)
  Contributed to safety and performance evaluation pipelines for LLMs. Created custom System Instructions (SI), JSON evaluation rubrics, and adversarial stress-testing.
- <span class="highlight">UBC Computer Science Studies</span>
  Covering algorithms, systems, networking, database structures, and statistical inference.
        `);
        break;
        
      case "contact":
        addTerminalLine("output", `
Connect with Tanishq:
  - Email: tanishq38123@gmail.com
  - GitHub: github.com/Tanishqkumarpatel
  - Portfolio: tanishqkumarpatel.github.io
        `);
        break;
        
      case "theme":
        const currentTheme = htmlElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        addTerminalLine("output", `Theme switched to: ${newTheme}`);
        break;
        
      case "clear":
        terminalBody.innerHTML = "";
        break;
        
      default:
        addTerminalLine("output", `Command not found: ${cmd}. Type <span class="highlight">help</span> for a list of commands.`);
    }
  }

  // --- Contact Form Handling ---
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      formStatus.style.display = "block";
      formStatus.className = "form-status loading";
      formStatus.textContent = "Sending message...";
      
      const formData = new FormData(contactForm);
      
      // Post to Web3Forms API
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
      .then(async (response) => {
        const json = await response.json();
        if (response.status === 200) {
          formStatus.className = "form-status success";
          formStatus.textContent = "Message sent successfully! Thanks for reaching out.";
          contactForm.reset();
        } else {
          console.error(json);
          formStatus.className = "form-status error";
          formStatus.textContent = json.message || "Something went wrong. Please try again.";
        }
      })
      .catch((error) => {
        console.error(error);
        formStatus.className = "form-status error";
        formStatus.textContent = "Connection error. Please try again later.";
      })
      .finally(() => {
        setTimeout(() => {
          formStatus.style.display = "none";
        }, 5000);
      });
    });
  }
});
