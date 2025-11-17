  document.addEventListener("DOMContentLoaded", () => {
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("class", "sr-only");
    document.body.appendChild(liveRegion);

    function announce(msg) {
      liveRegion.textContent = msg;
}
    function init() {
      iniciarGaveta(); 
      iniciarAltoContraste();
      iniciarModoEscuro();
      iniciarHamburger();
      iniciarSubmenu(); 
      iniciarSubmenuAcessivel();
      iniciarCarrossel();
      iniciarMascaras();
      iniciarCEP();
      iniciarFormulario();
    }

    /* Ferramenta: DOM shortcuts */
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    /* Responsividade (hamburger) */
function iniciarHamburger() {
  const buttons = document.querySelectorAll(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  buttons.forEach(btn => {
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "menu-principal");

    const toggleMenu = () => {
      nav.classList.toggle("open");
      const aberto = nav.classList.contains("open");
      nav.style.display = aberto ? "block" : "";
      btn.setAttribute("aria-expanded", aberto);
    };

    btn.addEventListener("click", toggleMenu);

    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMenu();
      }
    });
  });
}

    /* Submenu desktop + Mobile */
    function iniciarSubmenu() {
      const items = document.querySelectorAll(".has-submenu");

      items.forEach(li => {
        li.addEventListener("mouseenter", () => {
          if (window.innerWidth > 800) {
            const submenu = li.querySelector(".submenu");
            if (submenu) submenu.style.display = "block";
          }
        });

        li.addEventListener("mouseleave", () => {
          if (window.innerWidth > 800) {
            const submenu = li.querySelector(".submenu");
            if (submenu) submenu.style.display = "none";
          }
        });
      });
    }

    function iniciarSubmenuAcessivel() {
  document.querySelectorAll(".has-submenu > a").forEach(link => {
    const submenu = link.parentElement.querySelector(".submenu");
    if (!submenu) return;

    link.setAttribute("aria-expanded", "false");
    link.setAttribute("aria-haspopup", "true");

    link.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        submenu.style.display = "block";
        link.setAttribute("aria-expanded", "true");
        submenu.querySelector("a").focus();
      }

      if (e.key === "Escape") {
        submenu.style.display = "none";
        link.setAttribute("aria-expanded", "false");
        link.focus();
      }
    });
  });
}

    /* Carrossel (index.html) */
  function iniciarCarrossel() {
    const carousels = $$(".carousel");
    carousels.forEach(car => {
      const track = $(".carousel-track", car);
      const items = $$(".carousel-item", track);
      const prev = $(".carousel-prev", car);
      const next = $(".carousel-next", car);
      let idx = 0;
      const update = () => {
        track.style.transform = `translateX(-${idx * 100}%)`;
      };
      items.forEach((it, i) => {
      it.setAttribute("aria-hidden", i !== idx);
      });
      if (prev) prev.addEventListener("click", () => { idx = (idx - 1 + items.length) % items.length; update(); });
      if (next) next.addEventListener("click", () => { idx = (idx + 1) % items.length; update(); });
      let autoplay = setInterval(() => { idx = (idx + 1) % items.length; update(); }, 4000);
      car.addEventListener("mouseenter", () => clearInterval(autoplay));
      car.addEventListener("mouseleave", () => autoplay = setInterval(() => { idx = (idx + 1) % items.length; update(); }, 4000));
    });
  }
  // OBS: Certifique-se de que esta função está no escopo correto, onde o init() possa alcançá-la.

  // A função iniciarCarrossel estava faltando o seu próprio corpo de função no seu arquivo.
    /* Máscaras: CPF, telefone, CEP */
    const formatCPF = v => {
      v = (v || "").replace(/\D/g, "").slice(0, 11);
      if (v.length <= 3) return v;
      if (v.length <= 6) return v.replace(/(\d{3})(\d+)/, "$1.$2");
      if (v.length <= 9) return v.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
      return v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
    };
    const formatTel = v => {
      v = (v || "").replace(/\D/g, "").slice(0, 11);
      if (v.length <= 2) return v;
      if (v.length <= 6) return v.replace(/(\d{2})(\d+)/, "($1) $2");
      if (v.length <= 10) return v.replace(/(\d{2})(\d{4})(\d+)/, "($1) $2-$3");
      return v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    };
    const formatCEP = v => {
      v = (v || "").replace(/\D/g, "").slice(0, 8);
      if (v.length <= 5) return v;
      return v.replace(/(\d{5})(\d+)/, "$1-$2");
    };

    const cpfInput = $("#cpf");
    const telInput = $("#telefone");
    const cepInput = $("#cep");

    if (cpfInput) cpfInput.addEventListener("input", e => e.target.value = formatCPF(e.target.value));
    if (telInput) telInput.addEventListener("input", e => e.target.value = formatTel(e.target.value));
    if (cepInput) cepInput.addEventListener("input", e => e.target.value = formatCEP(e.target.value));

    /* Alerts (central) */
    const showAlert = (msg, type = "sucesso") => {
      const a = document.createElement("div");
      a.className = `alerta ${type === "erro" ? "erro" : type === "sucesso" ? "sucesso" : ""}`;
      a.textContent = msg;
      document.body.appendChild(a);
      setTimeout(() => { a.classList.add("hide"); a.style.opacity = "0"; }, 2500);
      setTimeout(() => a.remove(), 3200);
    };

    /* Exibição dinâmica: Voluntário / Doador */
    const tipoRadios = $$('input[name="tipo"]');
    // Novos Fieldsets para exibir
    const dadosPessoaisFieldset = $("#dadosPessoaisFieldset");
    const enderecoFieldset = $("#enderecoFieldset");
    const avisoObrigatorio = $("#avisoObrigatorio");
    
    const infoAdicional = $("#infoAdicional");
    const areaContainer = $("#areaInteresseContainer");
    const valorContainer = $("#valorDoacaoContainer");
    const mensagemLabel = $("#mensagemLabel");
    const avisoSelecao = $("#avisoSelecao");

    if (tipoRadios.length > 0) {
      tipoRadios.forEach(radio => {
        radio.addEventListener("change", () => {
          // Mostra os fieldsets de Dados Pessoais e Endereço
          if (dadosPessoaisFieldset) dadosPessoaisFieldset.style.display = "block";
          if (enderecoFieldset) enderecoFieldset.style.display = "block"; 
          if (avisoObrigatorio) avisoObrigatorio.style.display = "block";

          // mostra o bloco de informações adicionais
          if (infoAdicional) infoAdicional.style.display = "block";
          if (avisoSelecao) avisoSelecao.style.display = "none";

          if (radio.value === "voluntario") {
            if (areaContainer) areaContainer.style.display = "block";
            if (valorContainer) valorContainer.style.display = "none";
            if (mensagemLabel) mensagemLabel.textContent = 'Por que deseja ser voluntário?';
            if ($("#area")) $("#area").required = true;
            if ($("#valor_doacao")) $("#valor_doacao").required = false;
          } else if (radio.value === "doador") {
            if (valorContainer) valorContainer.style.display = "block";
            if (areaContainer) areaContainer.style.display = "none";
            if (mensagemLabel) mensagemLabel.textContent = 'Por que deseja ser doador?';
            if ($("#valor_doacao")) $("#valor_doacao").required = true;
            if ($("#area")) $("#area").required = false;
          }
        });
      });
    }

    /* Auto-preenchimento de endereço pelo CEP (API ViaCEP) */
    if (cepInput) {
      cepInput.addEventListener("blur", async () => {
        const cep = cepInput.value.replace(/\D/g, "");
        if (cep.length === 8) {
          try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await res.json();
            if (!data.erro) {
              $("#endereco").value = data.logradouro || "";
              if ($("#bairro")) $("#bairro").value = data.bairro || "";
              $("#cidade").value = data.localidade || "";
              $("#estado").value = data.uf || "";
            }
          } catch (e) {
            console.error("Erro ao buscar CEP:", e);
          }
        }
      });
    }

    /* Formulário: validação + localStorage */
    const form = $("#cadastroForm");
    
    let isListVisible = false; 

    const listaVoluntarios = $("#lista-voluntarios") || (() => {
      const d = document.createElement("div");
      d.id = "lista-voluntarios";
      const formSection = $(".form-section");
      if (formSection) formSection.after(d);
      else document.body.appendChild(d);
      
      d.style.display = 'none'; 
      
      return d;
    })();

    const readVoluntarios = () => JSON.parse(localStorage.getItem("voluntarios") || "[]");
    const saveVoluntarios = arr => localStorage.setItem("voluntarios", JSON.stringify(arr));

    const deleteVoluntario = (index) => {
      if (!confirm("Tem certeza que deseja excluir este cadastro?")) return;
      const arr = readVoluntarios();
      if (index >= 0 && index < arr.length) {
        arr.splice(index, 1); 
        saveVoluntarios(arr);
        showAlert("Cadastro excluído.", "erro"); 
        renderVoluntarios();
      } else {
        showAlert("Erro ao excluir. Índice inválido.", "erro");
      }
    };

    /* renderVoluntarios: exibe todas as informações + Botão Excluir Individual */
    const renderVoluntarios = () => {
      const arr = readVoluntarios();
      listaVoluntarios.innerHTML = "";

      if (arr.length === 0) {
        listaVoluntarios.innerHTML = "<p style='text-align:center;color:var(--muted)'>Nenhum voluntário cadastrado.</p>";
        return;
      }

      const cont = document.createElement("p");
      cont.className = "contador";
      cont.innerHTML = `👥 Total: <strong>${arr.length}</strong>`;
      listaVoluntarios.appendChild(cont);

      arr.forEach((v, i) => {
        const card = document.createElement("div");
        card.className = "voluntario-card";

        card.innerHTML = `
          <div class="card-header">
              <h3>Cadastro ${i + 1}</h3>
              <button class="btn-excluir" data-index="${i}" data-action="delete">✖ Excluir</button>
          </div>

          <p><strong>Tipo:</strong> ${v.tipo || "Não informado"}</p>
          <p><strong>Nome:</strong> ${v.nome || "Não informado"}</p>
          <p><strong>E-mail:</strong> ${v.email || "Não informado"}</p>
          <p><strong>Telefone:</strong> ${v.telefone || "Não informado"}</p>
          <p><strong>CPF (formatado):</strong> ${v.cpf || "Não informado"}</p>
          <p><strong>CPF (apenas dígitos):</strong> ${v.cpf_clean || "Não informado"}</p>
          <p><strong>Nascimento:</strong> ${v.nascimento || "Não informado"}</p>

          <p><strong>Endereço:</strong> ${v.endereco || "Não informado"}</p>
          <p><strong>Bairro:</strong> ${v.bairro || "Não informado"}</p>
          <p><strong>CEP:</strong> ${v.cep || "Não informado"}</p>
          <p><strong>Cidade:</strong> ${v.cidade || "Não informado"} - ${v.estado || ""}</p>

          ${v.tipo === "voluntario" ? `
            <p><strong>Área de interesse:</strong> ${v.area || "Não informado"}</p>
          ` : ""}

          ${v.tipo === "doador" ? `
            <p><strong>Valor da doação:</strong> R$ ${v.valor_doacao ? Number(v.valor_doacao).toFixed(2).replace('.', ',') : "0,00"}</p>
          ` : ""}

          <p><strong>Mensagem:</strong> ${v.mensagem || "Nenhuma"}</p>
        `;

        listaVoluntarios.appendChild(card);
      });
    };

    /* Event Delegation para lidar com cliques nos botões de Excluir individual */
    listaVoluntarios.addEventListener("click", (e) => {
      const target = e.target;
      if (target.matches('.btn-excluir[data-action="delete"]')) {
        const index = parseInt(target.dataset.index, 10);
        deleteVoluntario(index);
      }
    });

    /* Modo Alto Contraste */
  function iniciarAltoContraste() {
    const btn = document.querySelector("#toggle-contrast");
    if (!btn) {
      console.warn("Botão de alto contraste não encontrado");
      return;
    }

    /* Carrega preferência */
    if (localStorage.getItem("high-contrast") === "on") {
      document.body.classList.add("high-contrast");
    }

    btn.addEventListener("click", () => {
      document.body.classList.toggle("high-contrast");

      const isActive = document.body.classList.contains("high-contrast");
      localStorage.setItem("high-contrast", isActive ? "on" : "off");
    });
  }

  /* Modo Escuro */
  function iniciarModoEscuro() {
  const btn = document.querySelector("#toggle-dark");
  if (!btn) return;

  if (localStorage.getItem("dark-mode") === "on") {
    document.body.classList.add("dark");
  }

  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const active = document.body.classList.contains("dark");
    localStorage.setItem("dark-mode", active ? "on" : "off");
  });
}

/* Gaveta Lateral */
function iniciarGaveta() {
  const drawer = document.getElementById("accessibilityDrawer");
  const toggle = document.getElementById("drawerToggle");

  if (!drawer || !toggle) return;

  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "accessibilityDrawer");

  const toggleDrawer = () => {
    const isOpen = drawer.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);

    if (isOpen) {
      drawer.querySelector("button.drawer-btn").focus();
    }
  };

  toggle.addEventListener("click", toggleDrawer);

  toggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleDrawer();
    }
  });
}

    /* Buttons ver/limpar injetados */
    const btnVer = document.createElement("button");
    btnVer.className = "btn";
    btnVer.textContent = "Ver cadastros";

    btnVer.addEventListener("click", () => {
      if (isListVisible) {
        listaVoluntarios.style.display = 'none';
        btnVer.textContent = "Ver cadastros";
        isListVisible = false;
      } else {
        renderVoluntarios(); 
        listaVoluntarios.style.display = 'block';
        btnVer.textContent = "Esconder cadastros";
        isListVisible = true;
        
        window.scrollTo({ top: listaVoluntarios.offsetTop - 20, behavior: "smooth" });
      }
    });
    document.body.appendChild(btnVer);

    const btnLimpar = document.createElement("button");
    btnLimpar.className = "btn btn-ghost";
    btnLimpar.textContent = "Limpar cadastros";
    btnLimpar.addEventListener("click", () => {
      if (!confirm("Confirma exclusão de TODOS os cadastros?")) return;
      localStorage.removeItem("voluntarios");
      if (isListVisible) {
        renderVoluntarios();
      }
      showAlert("Cadastros apagados.", "erro");
    });
    document.body.appendChild(btnLimpar);

    if (form) {
      form.addEventListener("submit", (ev) => {
        ev.preventDefault();

        const required = form.querySelectorAll("[required]");
        let ok = true;
        required.forEach(inp => {
          if (inp.closest('#dadosPessoaisFieldset') && inp.closest('#dadosPessoaisFieldset').style.display === 'none') return;
          if (inp.closest('#enderecoFieldset') && inp.closest('#enderecoFieldset').style.display === 'none') return;
          
          if (!inp.value || inp.value.trim() === "") {
            inp.classList.add("invalid");
            ok = false;
          } else {
            inp.classList.remove("invalid");
          }
        });

        if (!ok) {
          showAlert("Por favor, preencha os campos destacados.", "erro");
          announce("Erros no formulário. Preencha os campos obrigatórios.");
          return;
        }


        const tipo = form.querySelector('input[name="tipo"]:checked')?.value || "voluntario";

        const cpfRaw = form.cpf?.value || "";
        const cpf_clean = cpfRaw.replace(/\D/g, "");
        const cpf_formatted = formatCPF(cpfRaw);

        const data = {
          tipo,
          nome: form.nome.value.trim(),
          email: form.email.value.trim(),
          cpf: cpf_formatted,
          cpf_clean, 
          telefone: form.telefone.value.trim(),
          nascimento: form.data_nascimento?.value || "",
          endereco: form.endereco?.value || "",
          bairro: form.bairro?.value || "",
          cep: form.cep?.value || "",
          cidade: form.cidade?.value || "",
          estado: form.estado?.value || "",
          mensagem: form.mensagem?.value || "",
          area: tipo === "voluntario" ? (form.area?.value || "") : "",
          valor_doacao: tipo === "doador" ? (form.valor_doacao?.value || "") : ""
        };

        const arr = readVoluntarios();
        arr.push(data);
        saveVoluntarios(arr);
        showAlert("Cadastro realizado com sucesso!");
        form.reset();

        // Reinicia estados visuais e oculta todos os campos adicionais
        if (dadosPessoaisFieldset) dadosPessoaisFieldset.style.display = "none"; 
        if (enderecoFieldset) enderecoFieldset.style.display = "none";           
        if (avisoObrigatorio) avisoObrigatorio.style.display = "none";
        if (infoAdicional) infoAdicional.style.display = "none";
        if (areaContainer) areaContainer.style.display = "none";
        if (valorContainer) valorContainer.style.display = "none";
        if (avisoSelecao) avisoSelecao.style.display = "block";

        if (isListVisible) {
          renderVoluntarios();
        }
      });

      form.addEventListener("input", (e) => {
        if (e.target.matches("input, textarea, select")) e.target.classList.remove("invalid");
      });
    }

    // A lista não é renderizada nem mostrada inicialmente (isListVisible = false)

    /* Acessibilidade: Navegação por teclado para carrossel (esquerda/direita) */
    document.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft") {
        $$(".carousel").forEach(car => { const prev = $(".carousel-prev", car); if (prev) prev.click(); });
      } else if (e.key === "ArrowRight") {
        $$(".carousel").forEach(car => { const next = $(".carousel-next", car); if (next) next.click(); });
      }
    });

    /* SPA enhancement: carrega <main> via fetch e mantém histórico */
    $$(".main-nav a").forEach(a => {
      a.addEventListener("click", (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        const href = a.getAttribute("href");
        if (!href || href.startsWith("http")) return;
        e.preventDefault();
        fetch(href).then(r => r.text()).then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const newMain = doc.querySelector("main");
          if (newMain) {
            document.querySelector("main").innerHTML = newMain.innerHTML;
            window.history.pushState({}, "", href);

            /* SPA (SEM reload) */
            init();
          } else {
            window.location.href = href;
          }
        }).catch(()=>{ window.location.href = href; });
      });
    });

    window.addEventListener("popstate", () => {
      init(); // reaplica eventos sem recarregar página
    });

    /* Chama init() na carga inicial */
    init();
  });

  /* Submenu Mobile */
  document.querySelectorAll(".has-submenu > a").forEach(btn => {
    btn.addEventListener("click", e => {
      if (window.innerWidth <= 800) {
        e.preventDefault();
        const submenu = btn.parentElement.querySelector(".submenu");
        submenu.style.display =
          submenu.style.display === "block" ? "none" : "block";
      }
    });
  });


