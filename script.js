// =====================================================
// PRELOADER
// =====================================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 800);
});

// =====================================================
// CUSTOM CURSOR
// =====================================================
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

if (cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
    });
}

// =====================================================
// SCROLL PROGRESS + NAV + ACTIVE LINK
// =====================================================
const nav = document.getElementById('nav');
const scrollProgress = document.getElementById('scrollProgress');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
    }

    if (nav) {
        nav.classList.toggle('scrolled', scrollTop > 50);
    }

    // Active nav link
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollTop >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// =====================================================
// MOBILE MENU
// =====================================================
const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.getElementById('navLinks');

if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('open');
        menuToggle.classList.toggle('active');
    });

    navLinksContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('open');
            menuToggle.classList.remove('active');
        });
    });
}

// =====================================================
// TYPING TEXT ROTATOR
// =====================================================
const typingText = document.getElementById('typingText');
if (typingText) {
    const phrases = [
        'Desenvolvedor Full Stack',
        'Engenheiro de Computação',
        'Especialista em IA & Machine Learning',
        'Automação & Sistemas Inteligentes'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex <= 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 400);
                return;
            }

            setTimeout(type, 30);
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(type, 2000);
                return;
            }

            setTimeout(type, 90);
        }
    }

    setTimeout(type, 1200);
}

// =====================================================
// PARTICLES
// =====================================================
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    const particleCount = window.innerWidth < 768 ? 15 : 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.opacity = Math.random() * 0.3 + 0.1;

        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        particlesContainer.appendChild(particle);
    }
}

// =====================================================
// COUNTERS
// =====================================================
const counters = document.querySelectorAll('[data-counter]');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-counter'));
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeOutQuart * target);

        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

// =====================================================
// SKILL BARS
// =====================================================
const skillBars = document.querySelectorAll('.skill-bar span');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

// =====================================================
// STACK DATA + MARQUEE + GRID
// =====================================================
const stackItems = [
    { name: 'JavaScript', icon: 'JS', color: '#f7df1e', level: 'Avançado' },
    { name: 'TypeScript', icon: 'TS', color: '#3178c6', level: 'Avançado' },
    { name: 'Python', icon: 'PY', color: '#3776ab', level: 'Avançado' },
    { name: 'React', icon: '⚛', color: '#61dafb', level: 'Avançado' },
    { name: 'Node.js', icon: 'N', color: '#339933', level: 'Avançado' },
    { name: 'FastAPI', icon: 'F', color: '#009688', level: 'Intermediário' },
    { name: 'Docker', icon: 'D', color: '#2496ed', level: 'Avançado' },
    { name: 'Git', icon: 'G', color: '#f05032', level: 'Avançado' },
    { name: 'Linux', icon: '🐧', color: '#f7df1e', level: 'Avançado' },
    { name: 'SQL', icon: 'DB', color: '#e38c00', level: 'Intermediário' },
    { name: 'TensorFlow', icon: 'TF', color: '#ff6f00', level: 'Intermediário' },
    { name: 'PyTorch', icon: 'PT', color: '#ee4c2c', level: 'Intermediário' },
    { name: 'Llama.cpp', icon: 'L', color: '#7c6aff', level: 'Avançado' },
    { name: 'OpenCV', icon: 'OC', color: '#5c3ee8', level: 'Intermediário' },
    { name: 'GitHub Actions', icon: 'GA', color: '#2496ed', level: 'Intermediário' },
    { name: 'Vite', icon: 'V', color: '#646cff', level: 'Avançado' }
];

const stackTrack = document.getElementById('stackTrack');
const stackGrid = document.getElementById('stackGrid');

if (stackTrack) {
    const trackItems = [...stackItems, ...stackItems];
    stackTrack.innerHTML = trackItems.map(item => `
        <div class="stack-item">
            <span class="stack-dot" style="background: ${item.color}"></span>
            ${item.name}
        </div>
    `).join('');
}

if (stackGrid) {
    stackGrid.innerHTML = stackItems.map(item => `
        <div class="stack-tile">
            <div class="stack-tile-icon" style="background: ${item.color}18; color: ${item.color}">${item.icon}</div>
            <div>
                <div class="stack-tile-name">${item.name}</div>
                <div class="stack-tile-level">${item.level}</div>
            </div>
        </div>
    `).join('');
}

// =====================================================
// PROJECTS
// =====================================================
const projects = [
    {
        title: 'Open WebUI & IA Local',
        stars: 128,
        desc: 'Ambiente completo de IA rodando localmente com Llama.cpp, Open WebUI e agentes autônomos — sem dependência de nuvem, com APIs REST personalizadas.',
        tags: ['Llama.cpp', 'Open WebUI', 'Docker', 'FastAPI'],
        language: 'Python',
        langColor: '#3776ab',
        icon: '🧠',
        bg: 'linear-gradient(135deg, #7c6aff, #4f8cff)',
        repoUrl: 'https://github.com/denilsonbomjesus/open-webui-ia-local'
    },
    {
        title: 'Sistema de Triagem Médica com NLP',
        stars: 64,
        desc: 'Modelo de Processamento de Linguagem Natural para classificação e priorização automática de demandas médicas, utilizando Transformers e BioBERT.',
        tags: ['Python', 'Transformers', 'BioBERT', 'Machine Learning'],
        language: 'Python',
        langColor: '#3776ab',
        icon: '🏥',
        bg: 'linear-gradient(135deg, #4affc8, #4f8cff)',
        repoUrl: 'https://github.com/denilsonbomjesus/sistema-triagem-medica-nlp'
    },
    {
        title: 'Stable Diffusion Pipeline',
        stars: 42,
        desc: 'Pipeline otimizado para geração de imagens com Stable Diffusion rodando em hardware próprio, com automação de prompts e otimização de recursos.',
        tags: ['Stable Diffusion', 'Python', 'Docker', 'Automação'],
        language: 'Python',
        langColor: '#3776ab',
        icon: '🎨',
        bg: 'linear-gradient(135deg, #ff6a8a, #7c6aff)',
        repoUrl: 'https://github.com/denilsonbomjesus/stable-diffusion-pipeline'
    },
    {
        title: 'Plataforma Full Stack em React',
        stars: 38,
        desc: 'Aplicação web completa com frontend em React/TypeScript e backend em Python, incluindo autenticação, dashboard e integrações via API.',
        tags: ['React', 'TypeScript', 'FastAPI', 'SQL'],
        language: 'TypeScript',
        langColor: '#3178c6',
        icon: '🚀',
        bg: 'linear-gradient(135deg, #4f8cff, #4affc8)',
        repoUrl: 'https://github.com/denilsonbomjesus/fullstack-react-platform'
    },
    {
        title: 'Local LLM CPU Stack',
        stars: 85,
        desc: 'Stack completo de IA local otimizado para rodar LLMs em CPU, com gerenciamento de memória, código de baixa latência e pipelines de inferência.',
        tags: ['Python', 'Llama.cpp', 'Local', 'CPU', 'IA'],
        language: 'Python',
        langColor: '#3776ab',
        icon: '💻',
        bg: 'linear-gradient(135deg, #2a2a3a, #4a4a5a)',
        repoUrl: 'https://github.com/denilsonbomjesus/local-llm-cpu-stack'
    },
    {
        title: 'OpenCode Agent Factory',
        stars: 52,
        desc: 'Framework para desenvolvimento de agentes autônomos e software de automação, com modelos pré-configurados e orquestração de tarefas.',
        tags: ['Python', 'IA', 'Agentes', 'Automação', 'SDK'],
        language: 'Python',
        langColor: '#ff6b6b',
        icon: '🤖',
        bg: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)',
        repoUrl: 'https://github.com/denilsonbomjesus/opencode-agent-factory'
    },
    {
        title: 'Query CNAT',
        stars: 43,
        desc: 'Sistema de consulta e análise de dados nativos da nuvem, com processamento otimizado de consultas SQL e suporte multi-cloud.',
        tags: ['SQL', 'Nuvem', 'Análise', 'Dados', 'API'],
        language: 'Python',
        langColor: '#4dabf7',
        icon: '☁️',
        bg: 'linear-gradient(135deg, #4dabf7, #74c0fc)',
        repoUrl: 'https://github.com/denilsonbomjesus/query-cnat'
    },
    {
        title: 'Automação de Tarefas & Scripts',
        stars: 25,
        desc: 'Coleção de scripts e ferramentas de automação para otimização de fluxos de trabalho, processamento de dados e integração entre sistemas.',
        tags: ['Python', 'Automação', 'Linux', 'Shell'],
        language: 'Python',
        langColor: '#3776ab',
        icon: '⚙️',
        bg: 'linear-gradient(135deg, #febc2e, #ff6a8a)',
        repoUrl: 'https://github.com/denilsonbomjesus/automation-scripts'
    },
    {
        title: 'Projetos Acadêmicos POLI/UPE',
        stars: 18,
        desc: 'Repositório com projetos desenvolvidos durante a graduação em Engenharia de Computação: sistemas embarcados, visão computacional e POO.',
        tags: ['C/C++', 'Sistemas Embarcados', 'OpenCV', 'POO'],
        language: 'C++',
        langColor: '#f34b7d',
        icon: '🎓',
        bg: 'linear-gradient(135deg, #28c840, #4affc8)',
        repoUrl: 'https://github.com/denilsonbomjesus/poli-upe-projects'
    }
];

const projectsGrid = document.getElementById('projectsGrid');
if (projectsGrid) {
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card" data-reveal>
            <div class="project-thumb">
                <div class="project-thumb-bg" style="background: ${project.bg}">${project.icon}</div>
                <div class="project-overlay">
                    <div class="project-overlay-actions">
                        <a href="${project.repoUrl}" target="_blank" rel="noopener" class="project-overlay-btn">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                            Código
                        </a>
                        <a href="#contato" class="project-overlay-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                            Contato
                        </a>
                    </div>
                </div>
            </div>
            <div class="project-body">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-stars">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        ${project.stars}
                    </div>
                </div>
                <p class="project-desc">${project.desc}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-footer">
                    <div class="project-language">
                        <span class="project-lang-dot" style="background: ${project.langColor}"></span>
                        ${project.language}
                    </div>
                    <a href="${project.repoUrl}" target="_blank" rel="noopener" class="project-link">
                        Ver repositório
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// =====================================================
// REVEAL ANIMATIONS
// =====================================================
const revealElements = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// =====================================================
// SMOOTH SCROLL FOR ANCHORS
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// =====================================================
// ESC TO CLOSE MOBILE MENU
// =====================================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinksContainer) {
        navLinksContainer.classList.remove('open');
        if (menuToggle) {
            menuToggle.classList.remove('active');
        }
    }
});

// =====================================================
// TILT EFFECT ON PROJECT CARDS
// =====================================================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;

        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        card.style.transform = `perspective(900px) rotateX(${(y - 0.5) * -6}deg) rotateY(${(x - 0.5) * 6}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});
