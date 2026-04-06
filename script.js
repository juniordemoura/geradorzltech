// ================================================
//   GERADOR DE CURRÍCULO — MJR DEV
//   script.js — Lógica completa
// ================================================

// ---- ESTADO ----
let experiencias = [];
let educacoes    = [];
let contExp = 0;
let contEdu = 0;

// ---- BOOT ----
document.addEventListener('DOMContentLoaded', () => {
  preencherExemplo();
  initAbas();
  initInputs();
  initNavbar();
  renderizarCV();
});

// ================================================
//   DADOS DE EXEMPLO (Mauricio Junior)
// ================================================
function preencherExemplo() {
  definir('nome',      'Mauricio Junior');
  definir('cargo',     'Futuro Desenvolvedor de Software | Estudante de ADS');
  definir('email',     'mauricio@email.com');
  definir('telefone',  '(11) 99999-0000');
  definir('cidade',    'São Paulo, SP');
  definir('linkedin',  'linkedin.com/in/mauricio-de-moura-junior');
  definir('github',    'github.com/mauriciomourajuniordev');
  definir('instagram', 'instagram.com/mrjr.dv');
  definir('resumo',
    'Profissional em transição de carreira para a área de Tecnologia, ' +
    'com graduação em Análise e Desenvolvimento de Sistemas (ADS) iniciada em 2026. ' +
    'Possuo sólidos conhecimentos em desenvolvimento Front-End: HTML5, CSS3 e JavaScript. ' +
    'Trago trajetória consolidada no setor industrial, com foco em qualidade, trabalho em equipe ' +
    'e cumprimento de metas. Busco minha primeira oportunidade como Estagiário ou Desenvolvedor Júnior.'
  );
  definir('habilidades', 'HTML5, CSS3, JavaScript, Git, GitHub, VS Code, Responsive Design');
  definir('idiomas',     'Português (Nativo), Inglês (Básico)');
  definir('cursos',      'HTML5\nCSS3\nJavaScript\nGit e GitHub\nLógica de Programação');
  definir('mensagem',
    'Sou apaixonado por transformar lógica em interfaces funcionais. ' +
    'Como estudante de ADS, migrei da indústria para a tecnologia trazendo o foco ' +
    'em resultados e a pontualidade típicos de ambientes de alta produção. ' +
    'Minha rotina é movida por código e aprendizado contínuo. ' +
    'Determinado a construir uma carreira sólida como Desenvolvedor, ' +
    'busco minha primeira oportunidade para contribuir e crescer em projetos desafiadores.'
  );

  adicionarExperiencia(
    'Texa Alumínio',
    'Operador de Máquina – Setor de Expedição',
    'Jan 2025 – Dez 2025',
    'Operação de máquinas no setor de expedição com foco em qualidade, cumprimento de metas e trabalho em equipe em ambiente de alta produção.'
  );
  adicionarExperiencia(
    'Nambei Fios e Cabos',
    'Op. Skaltec – Medição de Fios',
    'Jul 2021 – Mar 2024',
    'Ferraz de Vasconcelos, SP. Medição e controle de qualidade de fios, atuando com atenção a padrões técnicos rigorosos. 2 anos e 9 meses de experiência.'
  );
  adicionarEducacao(
    'Análise e Desenvolvimento de Sistemas (ADS)',
    'Instituição de Ensino Superior',
    '2026 – Em andamento'
  );
}

function definir(id, valor) {
  const el = document.getElementById(id);
  if (el) el.value = valor;
}

function obter(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

// ================================================
//   ABAS
// ================================================
function initAbas() {
  document.querySelectorAll('.aba').forEach(btn => {
    btn.addEventListener('click', () => {
      const alvo = btn.dataset.aba;
      document.querySelectorAll('.aba').forEach(b => b.classList.remove('aba--ativa'));
      document.querySelectorAll('.aba-conteudo').forEach(c => c.classList.remove('aba-conteudo--ativa'));
      btn.classList.add('aba--ativa');
      const painel = document.getElementById('aba-' + alvo);
      if (painel) painel.classList.add('aba-conteudo--ativa');
    });
  });
}

// ================================================
//   INPUTS → RENDERIZAR AO VIVO
// ================================================
function initInputs() {
  const ids = [
    'nome', 'cargo', 'email', 'telefone', 'cidade',
    'linkedin', 'github', 'instagram', 'resumo',
    'habilidades', 'idiomas', 'cursos', 'mensagem'
  ];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', renderizarCV);
  });

  document.getElementById('btn-exportar')?.addEventListener('click', exportarCV);
}

// ================================================
//   NAVBAR HAMBURGER
// ================================================
function initNavbar() {
  const hb   = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (hb && menu) {
    hb.addEventListener('click', () => menu.classList.toggle('aberto'));
  }
}

function fecharMenu() {
  document.getElementById('mobile-menu')?.classList.remove('aberto');
}

// ================================================
//   EXPERIÊNCIAS
// ================================================
function adicionarExperiencia(empresa = '', cargo = '', periodo = '', descricao = '') {
  contExp++;
  experiencias.push({ id: 'exp-' + contExp, empresa, cargo, periodo, descricao });
  renderizarFormExp();
  renderizarCV();
}

function removerExperiencia(id) {
  experiencias = experiencias.filter(e => e.id !== id);
  renderizarFormExp();
  renderizarCV();
}

function atualizarExp(id, campo, valor) {
  const item = experiencias.find(e => e.id === id);
  if (item) { item[campo] = valor; renderizarCV(); }
}

function renderizarFormExp() {
  const container = document.getElementById('lista-experiencias');
  if (!container) return;
  container.innerHTML = '';

  experiencias.forEach((exp, i) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <div class="item-card__topo">
        <span class="item-card__num">Experiência ${i + 1}</span>
        <button class="item-card__rem" onclick="removerExperiencia('${exp.id}')">Remover</button>
      </div>
      <div class="campo">
        <label>Empresa</label>
        <input type="text" value="${esc(exp.empresa)}"
          oninput="atualizarExp('${exp.id}', 'empresa', this.value)"
          placeholder="Nome da empresa" />
      </div>
      <div class="campo-linha">
        <div class="campo">
          <label>Cargo / Função</label>
          <input type="text" value="${esc(exp.cargo)}"
            oninput="atualizarExp('${exp.id}', 'cargo', this.value)"
            placeholder="Seu cargo" />
        </div>
        <div class="campo">
          <label>Período</label>
          <input type="text" value="${esc(exp.periodo)}"
            oninput="atualizarExp('${exp.id}', 'periodo', this.value)"
            placeholder="Jan 2023 – Dez 2024" />
        </div>
      </div>
      <div class="campo">
        <label>Descrição das atividades</label>
        <textarea rows="3"
          oninput="atualizarExp('${exp.id}', 'descricao', this.value)"
          placeholder="Atividades, conquistas, responsabilidades...">${esc(exp.descricao)}</textarea>
      </div>
    `;
    container.appendChild(card);
  });
}

// ================================================
//   EDUCAÇÃO
// ================================================
function adicionarEducacao(curso = '', instituicao = '', periodo = '') {
  contEdu++;
  educacoes.push({ id: 'edu-' + contEdu, curso, instituicao, periodo });
  renderizarFormEdu();
  renderizarCV();
}

function removerEducacao(id) {
  educacoes = educacoes.filter(e => e.id !== id);
  renderizarFormEdu();
  renderizarCV();
}

function atualizarEdu(id, campo, valor) {
  const item = educacoes.find(e => e.id === id);
  if (item) { item[campo] = valor; renderizarCV(); }
}

function renderizarFormEdu() {
  const container = document.getElementById('lista-educacao');
  if (!container) return;
  container.innerHTML = '';

  educacoes.forEach((edu, i) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <div class="item-card__topo">
        <span class="item-card__num">Formação ${i + 1}</span>
        <button class="item-card__rem" onclick="removerEducacao('${edu.id}')">Remover</button>
      </div>
      <div class="campo">
        <label>Curso / Formação</label>
        <input type="text" value="${esc(edu.curso)}"
          oninput="atualizarEdu('${edu.id}', 'curso', this.value)"
          placeholder="Ex: Análise e Desenvolvimento de Sistemas" />
      </div>
      <div class="campo-linha">
        <div class="campo">
          <label>Instituição</label>
          <input type="text" value="${esc(edu.instituicao)}"
            oninput="atualizarEdu('${edu.id}', 'instituicao', this.value)"
            placeholder="Nome da instituição" />
        </div>
        <div class="campo">
          <label>Período</label>
          <input type="text" value="${esc(edu.periodo)}"
            oninput="atualizarEdu('${edu.id}', 'periodo', this.value)"
            placeholder="2023 – 2025" />
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ================================================
//   RENDERIZAR O CURRÍCULO
// ================================================
function renderizarCV() {
  const preview = document.getElementById('cv-preview');
  if (!preview) return;
  preview.innerHTML = gerarHTMLCV(coletarDados());
}

function coletarDados() {
  return {
    nome:        obter('nome'),
    cargo:       obter('cargo'),
    email:       obter('email'),
    telefone:    obter('telefone'),
    cidade:      obter('cidade'),
    linkedin:    obter('linkedin'),
    github:      obter('github'),
    instagram:   obter('instagram'),
    resumo:      obter('resumo'),
    habilidades: obter('habilidades').split(',').map(s => s.trim()).filter(Boolean),
    idiomas:     obter('idiomas').split(',').map(s => s.trim()).filter(Boolean),
    cursos:      obter('cursos').split('\n').map(s => s.trim()).filter(Boolean),
    mensagem:    obter('mensagem'),
    experiencias,
    educacoes
  };
}

function gerarHTMLCV(d) {
  // Contatos
  const contatos = [];
  if (d.email)     contatos.push({ texto: d.email,     href: 'mailto:' + d.email });
  if (d.telefone)  contatos.push({ texto: d.telefone,  href: 'tel:' + d.telefone.replace(/\D/g, '') });
  if (d.cidade)    contatos.push({ texto: d.cidade,    href: null });
  if (d.linkedin)  contatos.push({ texto: d.linkedin,  href: 'https://' + d.linkedin.replace(/^https?:\/\//, '') });
  if (d.github)    contatos.push({ texto: d.github,    href: 'https://' + d.github.replace(/^https?:\/\//, '') });
  if (d.instagram) contatos.push({ texto: d.instagram, href: 'https://' + d.instagram.replace(/^https?:\/\//, '') });

  let html = '';

  // CABEÇALHO
  html += `
  <div class="cv__cabecalho">
    <div>
      <div class="cv__nome">${d.nome || 'Seu Nome Aqui'}</div>
      ${d.cargo ? `<div class="cv__cargo">${d.cargo}</div>` : ''}
    </div>
    <div class="cv__contatos">
      ${contatos.map(c =>
        `<div class="cv__contato">${
          c.href ? `<a href="${c.href}">${c.texto}</a>` : c.texto
        }</div>`
      ).join('')}
    </div>
  </div>`;

  // SOBRE MIM
  if (d.resumo) {
    html += secao('Sobre mim', `<div class="cv__resumo">${d.resumo}</div>`);
  }

  // EXPERIÊNCIAS
  if (d.experiencias.length > 0) {
    const corpo = d.experiencias.map(exp => `
      <div class="cv__exp">
        <div class="cv__exp-topo">
          <span class="cv__exp-empresa">${exp.empresa || 'Empresa'}</span>
          ${exp.periodo ? `<span class="cv__exp-periodo">${exp.periodo}</span>` : ''}
        </div>
        ${exp.cargo    ? `<div class="cv__exp-cargo">${exp.cargo}</div>` : ''}
        ${exp.descricao ? `<div class="cv__exp-desc">${exp.descricao}</div>` : ''}
      </div>
    `).join('');
    html += secao('Experiências profissionais', corpo);
  }

  // EDUCAÇÃO
  if (d.educacoes.length > 0) {
    const corpo = d.educacoes.map(edu => `
      <div class="cv__edu">
        <div class="cv__edu-curso">${edu.curso || 'Curso'}</div>
        ${edu.instituicao ? `<div class="cv__edu-inst">${edu.instituicao}</div>` : ''}
        ${edu.periodo     ? `<div class="cv__edu-periodo">${edu.periodo}</div>` : ''}
      </div>
    `).join('');
    html += secao('Formação acadêmica', corpo);
  }

  // CURSOS
  if (d.cursos.length > 0) {
    html += secao('Cursos e certificados',
      `<div class="cv__cursos">${
        d.cursos.map(c => `<span class="cv__curso">${c}</span>`).join('')
      }</div>`
    );
  }

  // HABILIDADES + IDIOMAS
  const temHab = d.habilidades.length > 0;
  const temIdi = d.idiomas.length > 0;

  if (temHab || temIdi) {
    let cols = '';
    if (temHab) {
      cols += `
        <div class="cv__secao">
          <div class="cv__secao-titulo">Habilidades técnicas</div>
          <div class="cv__habilidades">
            ${d.habilidades.map(h => `<span class="cv__habilidade">${h}</span>`).join('')}
          </div>
        </div>`;
    }
    if (temIdi) {
      cols += `
        <div class="cv__secao">
          <div class="cv__secao-titulo">Idiomas</div>
          ${d.idiomas.map(i => `<div class="cv__idioma">${i}</div>`).join('')}
        </div>`;
    }
    html += `<div class="cv__duas-col">${cols}</div>`;
  }

  // MENSAGEM
  if (d.mensagem) {
    html += secao('Por que devo ser contratado?',
      `<div class="cv__mensagem">${d.mensagem}</div>`
    );
  }

  // RODAPÉ
  html += `
  <div class="cv__rodape">
    Desenvolvido por ${d.nome || 'você'} · ${new Date().getFullYear()}
  </div>`;

  return html;
}

function secao(titulo, conteudo) {
  return `
  <div class="cv__secao">
    <div class="cv__secao-titulo">${titulo}</div>
    ${conteudo}
  </div>`;
}

// ================================================
//   EXPORTAR HTML COMPLETO
// ================================================
function exportarCV() {
  const d = coletarDados();

  if (!d.nome) {
    alert('Preencha pelo menos o campo "Nome completo" antes de exportar!');
    return;
  }

  const corpoCV = gerarHTMLCV(d);

  const arquivo = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Currículo — ${d.nome}</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', 'Segoe UI', sans-serif;
      background: #E5E5E5;
      display: flex;
      justify-content: center;
      padding: 40px 20px;
      min-height: 100vh;
    }
    .cv {
      background: #ffffff;
      color: #1a1a1a;
      padding: 52px 48px;
      max-width: 820px;
      width: 100%;
      box-shadow: 0 4px 40px rgba(0,0,0,.14);
      border-radius: 3px;
      align-self: flex-start;
    }
    .cv__cabecalho {
      display: grid; grid-template-columns: 1fr auto;
      gap: 20px; align-items: start;
      padding-bottom: 20px; margin-bottom: 24px;
      border-bottom: 3px solid #000000;
      position: relative;
    }
    .cv__cabecalho::after {
      content: ''; position: absolute;
      bottom: -6px; left: 0;
      width: 60px; height: 3px;
      background: #887CFF; border-radius: 2px;
    }
    .cv__nome { font-family: 'Playfair Display', Georgia, serif; font-size: 28px; color: #000000; letter-spacing: -.3px; line-height: 1.1; }
    .cv__cargo { font-size: 13px; color: #5D5D5D; margin-top: 4px; }
    .cv__contatos { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
    .cv__contato { font-size: 11px; color: #5D5D5D; }
    .cv__contato a { color: #887CFF; text-decoration: none; }
    .cv__secao { margin-bottom: 22px; }
    .cv__secao-titulo { font-size: 9px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: #887CFF; border-bottom: 1px solid #E5E5E5; padding-bottom: 5px; margin-bottom: 13px; }
    .cv__resumo { font-size: 12.5px; line-height: 1.75; color: #333; }
    .cv__exp { margin-bottom: 14px; }
    .cv__exp-topo { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
    .cv__exp-empresa { font-size: 13.5px; font-weight: 700; color: #000000; }
    .cv__exp-periodo { font-size: 11px; color: #887CFF; font-weight: 600; white-space: nowrap; background: #EDEAFF; padding: 2px 8px; border-radius: 20px; }
    .cv__exp-cargo { font-size: 12px; color: #5D5D5D; margin-top: 2px; font-style: italic; }
    .cv__exp-desc { font-size: 12px; color: #444; line-height: 1.65; margin-top: 5px; }
    .cv__edu { margin-bottom: 12px; }
    .cv__edu-curso { font-size: 13.5px; font-weight: 700; color: #000000; }
    .cv__edu-inst { font-size: 12px; color: #5D5D5D; margin-top: 2px; }
    .cv__edu-periodo { font-size: 11px; color: #887CFF; margin-top: 2px; font-weight: 600; }
    .cv__cursos { display: flex; flex-wrap: wrap; gap: 7px; }
    .cv__curso { font-size: 11px; padding: 4px 12px; background: #F1F9FF; color: #000000; border-radius: 20px; border: 1px solid #D0E8FF; font-weight: 500; }
    .cv__duas-col { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
    .cv__habilidades { display: flex; flex-wrap: wrap; gap: 6px; }
    .cv__habilidade { font-size: 11px; padding: 4px 11px; background: #887CFF; color: #FFFFFF; border-radius: 4px; font-weight: 600; }
    .cv__idioma { font-size: 12.5px; color: #333; margin-bottom: 5px; padding-left: 12px; border-left: 2.5px solid #887CFF; }
    .cv__mensagem { font-size: 12.5px; font-style: italic; color: #444; border-left: 3px solid #887CFF; padding: 12px 16px; background: #F8F6FF; line-height: 1.8; border-radius: 0 6px 6px 0; }
    .cv__rodape { margin-top: 28px; padding-top: 12px; border-top: 1px solid #E5E5E5; font-size: 10px; color: #aaa; text-align: center; letter-spacing: .06em; }
    @media (max-width: 600px) {
      body { padding: 0; }
      .cv { padding: 28px 18px; border-radius: 0; box-shadow: none; }
      .cv__cabecalho { grid-template-columns: 1fr; }
      .cv__contatos { align-items: flex-start; flex-direction: row; flex-wrap: wrap; gap: 6px 14px; }
      .cv__duas-col { grid-template-columns: 1fr; gap: 0; }
    }
    @media print {
      body { background: #fff; padding: 0; }
      .cv { box-shadow: none; padding: 32px; max-width: 100%; border-radius: 0; }
    }
  </style>
</head>
<body>
  <div class="cv">
    ${corpoCV}
  </div>
</body>
</html>`;

  const blob = new Blob([arquivo], { type: 'text/html;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const nome = (d.nome || 'curriculo').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  link.href     = url;
  link.download = 'curriculo-' + nome + '.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ================================================
//   LIMPAR FORMULÁRIO
// ================================================
function limparFormulario() {
  if (!confirm('Tem certeza que deseja limpar todos os dados?')) return;

  ['nome','cargo','email','telefone','cidade','linkedin','github',
   'instagram','resumo','habilidades','idiomas','cursos','mensagem']
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });

  experiencias = [];
  educacoes    = [];
  contExp = 0;
  contEdu = 0;

  renderizarFormExp();
  renderizarFormEdu();
  renderizarCV();
}

// ================================================
//   UTILITÁRIO: escapar HTML
// ================================================
function esc(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
