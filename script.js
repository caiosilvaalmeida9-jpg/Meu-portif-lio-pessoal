document.addEventListener("DOMContentLoaded", () => {
  // 1. SELETOR DE IDIOMAS
  const langBtn = document.getElementById("lang-btn");
  const langSelector = document.querySelector(".lang-selector");
  const langDropdown = document.getElementById("lang-dropdown");
  const currentLang = document.getElementById("current-lang");

  if (langBtn && langSelector) {
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langSelector.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!langSelector.contains(e.target)) {
        langSelector.classList.remove("active");
      }
    });
  }

  if (langDropdown) {
    const options = langDropdown.querySelectorAll("li");
    options.forEach((opt) => {
      opt.addEventListener("click", (e) => {
        e.stopPropagation();
        const selectedLang = opt.getAttribute("data-lang");

        if (currentLang) {
          currentLang.textContent = selectedLang.toUpperCase();
        }

        langSelector.classList.remove("active");
        traduzirPagina(selectedLang);
      });
    });
  }

  // 2. MODAL DE LOGIN
  const btnLoginModal = document.getElementById("btn-login-modal");
  const modalLogin = document.getElementById("modal-login");
  const btnCloseModal = document.getElementById("btn-close-modal");
  const formLogin = document.getElementById("form-login");

  if (btnLoginModal && modalLogin) {
    btnLoginModal.addEventListener("click", () => {
      modalLogin.classList.add("active");
    });
  }

  if (btnCloseModal && modalLogin) {
    btnCloseModal.addEventListener("click", () => {
      modalLogin.classList.remove("active");
    });

    modalLogin.addEventListener("click", (e) => {
      if (e.target === modalLogin) {
        modalLogin.classList.remove("active");
      }
    });
  }

  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("login-email").value;
      const nomeUsuario = emailInput.split("@")[0] || "Cliente MyP";

      if (modalLogin) modalLogin.classList.remove("active");

      if (btnLoginModal) {
        btnLoginModal.innerHTML = `<i class="fa-solid fa-user-check"></i> ${nomeUsuario}`;
      }
    });
  }

  // 3. TRADUÇÃO MYP
  function traduzirPagina(lang) {
    const dicionario = {
      pt: { navInicio: "Início", navContato: "Contato" },
      en: { navInicio: "Home", navContato: "Contact" },
      es: { navInicio: "Inicio", navContacto: "Contacto" },
      fr: { navInicio: "Accueil", navContato: "Contact" }
    };

    const t = dicionario[lang];
    if (!t) return;

    const navLinks = document.querySelectorAll(".nav a");
    if (navLinks.length >= 2) {
      navLinks[0].textContent = t.navInicio;
      navLinks[1].textContent = t.navContato;
    }
  }

  // 4. ANIMAÇÃO DE PARTÍCULAS
  const canvas = document.getElementById("particulas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particulas = [];

    function ajustarCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class Particula {
      constructor() {
        this.reset(true);
      }

      reset(inicial = false) {
        this.x = Math.random() * canvas.width;
        this.y = inicial ? Math.random() * canvas.height : canvas.height + 10;
        this.tamanho = Math.random() * 4 + 2; 
        this.velocidade = Math.random() * 1.2 + 0.4;
        this.opacidade = Math.random() * 0.6 + 0.3;
      }

      desenhar() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacidade})`;
        ctx.fill();
      }

      atualizar() {
        this.y -= this.velocidade;
        this.opacidade -= 0.001;

        if (this.y < -10 || this.opacidade <= 0) {
          this.reset(false);
        }
      }
    }

    function criarParticulas() {
      particulas = [];
      for (let i = 0; i < 300; i++) {
        particulas.push(new Particula());
      }
    }

    function animar() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particulas.forEach((p) => {
        p.atualizar();
        p.desenhar();
      });
      requestAnimationFrame(animar);
    }

    ajustarCanvas();
    criarParticulas();
    animar();

    window.addEventListener("resize", () => {
      ajustarCanvas();
      criarParticulas();
    });
  }

  

  // 5. ANIMAÇÃO DE ENTRADA AO FAZER SCROLL (INTERSECTION OBSERVER UNIFICADO)
  const animatedElements = document.querySelectorAll(
    ".particulas-content, .white-section-content, .fade-content, .black-section-content, .tech-content, .custom-black-content"
  
  );
  if (animatedElements.length > 0) {
    const observerOptions = {
      root: null,
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach((el) => observer.observe(el));
  }

  // 6. CARROSSEL 3D AUTOMÁTICO
  const cards = document.querySelectorAll(".project-card");
  if (cards.length > 0) {
    let currentIndex = 0;

    function atualizarCarrossel() {
      cards.forEach((card, index) => {
        card.classList.remove("active", "prev", "next");

        if (index === currentIndex) {
          card.classList.add("active");
        } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
          card.classList.add("prev");
        } else if (index === (currentIndex + 1) % cards.length) {
          card.classList.add("next");
        }
      });
    }

    function proximoCard() {
      currentIndex = (currentIndex + 1) % cards.length;
      atualizarCarrossel();
    }

    atualizarCarrossel();
    setInterval(proximoCard, 5000);
  }
});

// ANIMAÇÃO DE ENTRADA AO FAZER SCROLL (INTERSECTION OBSERVER UNIFICADO)
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".particulas-content, .white-section-content, .fade-content, .black-section-content, .tech-content, .services-content, .custom-black-content, .projects-content"

  );
  if (animatedElements.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => observer.observe(el));
});

// FILTRAGEM DE PROJETOS POR CATEGORIA
  const catButtons = document.querySelectorAll('.cat-btn');
  const projectCards = document.querySelectorAll('.project-item-card');

  if (catButtons.length > 0 && projectCards.length > 0) {
    catButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Remove a classe active de todos e coloca no clicado
        catButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category');

          if (filter === 'todos' || category === filter) {
            card.style.display = 'flex';
            // Pequeno efeito de transição ao reaparecer
            card.style.opacity = '0';
            setTimeout(() => { card.style.opacity = '1'; }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // SEGUIDOR DE CURSOR (BOLINHA)
  const cursor = document.querySelector('.custom-cursor');

  if (cursor) {
    window.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // Subtrai 12px (metade de 24px) para centrar perfeitamente
      cursor.style.left = `${x - 12}px`;
      cursor.style.top = `${y - 12}px`;
    });
  }

    // Encontra todos os elementos com o atributo data-i18n e substitui o texto
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    
    elementsToTranslate.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });

    // Guarda a preferência do utilizador no navegador (opcional)
    localStorage.setItem('preferredLanguage', lang);


  // (Opcional) Carrega o idioma guardado quando o site abre
  window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'pt';
    switchLanguage(savedLang);
  });

  // 1. DICIONÁRIO DE TRADUÇÕES COMPLETO
  const translations = {
    pt: {
      navInicio: "Início",
      navSobre: "Sobre",
      navServicos: "Serviços",
      navProjetos: "Projetos",
      navContato: "Contato",
      btnContato: "Contato",
      heroEyebrow: "Minha história começa aqui",
      heroTitle: "Bem vindos ao meu Portifólio",
      heroText: "Criado e desenvolvido com intuito de mostrar meus projetos, planos e minhas experiencias com desenvolvimento web",
      aboutEyebrow: "Conheça Mais",
      aboutTitle: "Sobre Mim",
      aboutText1: "Oi! Sou desenvolvedor de sites a pouco tempo, digamos a menos de um ano, posso dizer que seguir essa área de web desenvolvimento tem sido uma dos meus passa tempos preferidos, aprendi muito desde então.",
      aboutText2: "E então criei a MPY corporation, uma empresa para criação de sites, landing pages, gerenciamento de negócios, criação de aplicativos e de também sistemas, mas voltando a mim, sou novo na área mas a muito o que vir."
    },
    en: {
      navInicio: "Home",
      navSobre: "About",
      navServicos: "Services",
      navProjetos: "Projects",
      navContato: "Contact",
      btnContato: "Contact",
      heroEyebrow: "My story starts here",
      heroTitle: "Welcome to my Portfolio",
      heroText: "Created and developed to showcase my projects, plans, and web development experiences.",
      aboutEyebrow: "Learn More",
      aboutTitle: "About Me",
      aboutText1: "Hi! I've been a web developer for a short time, less than a year. Following this path has become one of my favorite hobbies, and I've learned a lot since then.",
      aboutText2: "Then I created MPY Corporation, a company focused on building websites, landing pages, business management tools, apps, and systems. But back to me: I'm new to the field, but there's much more to come."
    },
    es: {
      navInicio: "Inicio",
      navSobre: "Sobre mí",
      navServicos: "Servicios",
      navProjetos: "Proyectos",
      navContato: "Contacto",
      btnContato: "Contacto",
      heroEyebrow: "Mi historia empieza aquí",
      heroTitle: "Bienvenidos a mi Portafolio",
      heroText: "Creado y desarrollado con el fin de mostrar mis proyectos, planes y experiencias en desarrollo web",
      aboutEyebrow: "Conoce Más",
      aboutTitle: "Sobre Mí",
      aboutText1: "¡Hola! Soy desarrollador web desde hace poco tiempo, menos de un año. Seguir este camino se ha convertido en uno de mis pasatiempos favoritos.",
      aboutText2: "Luego creé MPY Corporation, una empresa para creación de sitios web, landing pages y sistemas. Soy nuevo en el área, pero hay mucho por venir."
    },
    fr: {
      navInicio: "Accueil",
      navSobre: "À propos",
      navServicos: "Services",
      navProjetos: "Projets",
      navContato: "Contact",
      btnContato: "Contact",
      heroEyebrow: "Mon histoire commence ici",
      heroTitle: "Bienvenue sur mon Portfolio",
      heroText: "Créé et développé pour présenter mes projets, mes plans et mon expérience en développement web",
      aboutEyebrow: "En savoir plus",
      aboutTitle: "À propos de moi",
      aboutText1: "Salut! Je suis développeur web depuis moins d'un an. Suivre cette voie est devenu l'un de mes loisirs préférés.",
      aboutText2: "J'ai ensuite créé MPY Corporation, une entreprise de création de sites web et de systèmes."
    }
  };

  // 2. FUNÇÃO DE TRADUÇÃO DA PÁGINA
  function traduzirPagina(lang) {
    const t = translations[lang];
    if (!t) return;

    // Procura todos os elementos com o atributo data-i18n e substitui o texto
    const elementsToTranslate = document.querySelectorAll("[data-i18n]");
    elementsToTranslate.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (t[key]) {
        // Preserva os ícones caso existam dentro do botão/link
        const icon = el.querySelector("i");
        if (icon) {
          const iconHTML = icon.outerHTML;
          el.innerHTML = `${iconHTML} ${t[key]}`;
        } else {
          el.textContent = t[key];
        }
      }
    });

    // Guarda a preferência de idioma no navegador
    localStorage.setItem("preferredLanguage", lang);
  }

  // 3. EVENTO DE CLIQUE NO DROPDOWN DE IDIOMAS
  if (langDropdown) {
    const options = langDropdown.querySelectorAll("li");
    options.forEach((opt) => {
      opt.addEventListener("click", (e) => {
        e.stopPropagation();
        const selectedLang = opt.getAttribute("data-lang");

        if (currentLang) {
          currentLang.textContent = selectedLang.toUpperCase();
        }

        langSelector.classList.remove("active");
        traduzirPagina(selectedLang);
      });
    });
  }

  // 4. CARREGAR IDIOMA GUARDADO AO ABRIR A PÁGINA
  window.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("preferredLanguage") || "pt";
    if (currentLang) {
      currentLang.textContent = savedLang.toUpperCase();
    }
    traduzirPagina(savedLang);
  });

  // MUDAR A COR DO CURSOR NAS SECÇÕES DE FUNDO BRANCO
  const whiteSections = document.querySelectorAll('.section-white-bg');
  const customCursor = document.querySelector('.custom-cursor');

  if (customCursor && whiteSections.length > 0) {
    whiteSections.forEach((section) => {
      section.addEventListener('mouseenter', () => {
        customCursor.classList.add('dark-cursor');
      });
      
      section.addEventListener('mouseleave', () => {
        customCursor.classList.remove('dark-cursor');
      });
    });
  }