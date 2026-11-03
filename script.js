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

  // DICIONÁRIO DE TRADUÇÕES COMPLETO
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
      aboutText2: "Luego creé MPY Corporation, uma empresa para creación de sitios web, landing pages y sistemas. Soy nuevo en el área, pero hay mucho por venir."
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

  // FUNÇÃO DE TRADUÇÃO DA PÁGINA
  function traduzirPagina(lang) {
    const t = translations[lang];
    if (!t) return;

    const elementsToTranslate = document.querySelectorAll("[data-i18n]");
    elementsToTranslate.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (t[key]) {
        const icon = el.querySelector("i");
        if (icon) {
          const iconHTML = icon.outerHTML;
          el.innerHTML = `${iconHTML} ${t[key]}`;
        } else {
          el.textContent = t[key];
        }
      }
    });

    localStorage.setItem("preferredLanguage", lang);
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

  // Carrega o idioma guardado ao abrir
  const savedLang = localStorage.getItem("preferredLanguage") || "pt";
  if (currentLang) {
    currentLang.textContent = savedLang.toUpperCase();
  }
  traduzirPagina(savedLang);

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

  // 3. ANIMAÇÃO DE PARTÍCULAS
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

  // 4. ANIMAÇÃO DE ENTRADA AO FAZER SCROLL (INTERSECTION OBSERVER)
  const animatedElements = document.querySelectorAll(
    ".particulas-content, .white-section-content, .fade-content, .black-section-content, .tech-content, .services-content, .custom-black-content, .projects-content"
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

  // 5. CARROSSEL 3D AUTOMÁTICO
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

  // 6. FILTRAGEM DE PROJETOS POR CATEGORIA
  const catButtons = document.querySelectorAll('.cat-btn');
  const projectCards = document.querySelectorAll('.project-item-card');

  if (catButtons.length > 0 && projectCards.length > 0) {
    catButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        catButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category');

          if (filter === 'todos' || category === filter) {
            card.style.display = 'flex';
            card.style.opacity = '0';
            setTimeout(() => { card.style.opacity = '1'; }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 7. SEGUIDOR DE CURSOR (BOLINHA INTELIGENTE)
  const cursor = document.querySelector('.custom-cursor');

  if (cursor) {
    window.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // Centra a bolinha perfeitamente no ponteiro (24px / 2 = 12px)
      cursor.style.left = `${x - 12}px`;
      cursor.style.top = `${y - 12}px`;

      // Deteta o elemento debaixo do cursor para inverter a cor nas secções brancas
      const elementoSobRato = document.elementFromPoint(x, y);

      if (elementoSobRato) {
        const seccaoBranca = elementoSobRato.closest('.section-white-bg');

        if (seccaoBranca) {
          cursor.classList.add('dark-cursor');
        } else {
          cursor.classList.remove('dark-cursor');
        }
      }
    });
  }
});