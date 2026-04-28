// --- Lógica de Navegação ---
function mostrarTab(tab) {
    const secaoCv = document.getElementById('secao-cv');
    const secaoPrompt = document.getElementById('secao-prompt');
    const navItems = document.querySelectorAll('.nav-item');

    if (tab === 'curriculo') {
        secaoCv.style.display = 'grid';
        secaoPrompt.style.display = 'none';
        navItems[0].classList.add('active');
        navItems[1].classList.remove('active');
    } else {
        secaoCv.style.display = 'none';
        secaoPrompt.style.display = 'block';
        navItems[1].classList.add('active');
        navItems[0].classList.remove('active');
    }
}

// --- Lógica do Currículo ---
function atualizarPreview() {
    document.getElementById('p-nome').innerText = document.getElementById('nome').value || "Seu Nome";
    document.getElementById('p-cargo').innerText = document.getElementById('cargo').value || "Cargo Pretendido";
    document.getElementById('p-contato').innerText = document.getElementById('email').value || "email@exemplo.com";
    document.getElementById('p-resumo').innerText = document.getElementById('resumo').value || "Resumo profissional aparecerá aqui...";

    // Habilidades
    const skillsInput = document.getElementById('habilidades').value;
    const skillsContainer = document.getElementById('p-habilidades');
    skillsContainer.innerHTML = "";
    
    if (skillsInput) {
        skillsInput.split(',').forEach(skill => {
            if (skill.trim()) {
                const span = document.createElement('span');
                span.className = 'skill-tag';
                span.innerText = skill.trim();
                skillsContainer.appendChild(span);
            }
        });
    }
}

function baixarPDF() {
    const element = document.getElementById('cv-final');
    const opt = {
        margin: 0,
        filename: 'curriculo_zltech.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}

// --- Lógica do Gerador de Prompt (Processo Seletivo) ---
function gerarPrompt() {
    const vaga = document.getElementById('vaga-nome').value;
    const nivel = document.getElementById('vaga-nivel').value;
    const skills = document.getElementById('vaga-skills').value;

    if (!vaga) {
        alert("Por favor, informe o nome da vaga.");
        return;
    }

    const promptBase = `Atue como um Especialista em Recrutamento e Seleção Tech. 
Analise o currículo que enviarei a seguir para a vaga de **${vaga}** (Nível: ${nivel}).

**Critérios de Avaliação:**
1. Hard Skills Obrigatórias: ${skills}.
2. Verifique se o candidato demonstra experiência prática nestas tecnologias.
3. Classifique o candidato de 0 a 10 com base no fit cultural e técnico.

**Saída esperada:**
Forneça um resumo dos pontos fortes, pontos fracos e 3 perguntas técnicas personalizadas para a entrevista deste candidato específico.`;

    document.getElementById('texto-prompt').innerText = promptBase;
    document.getElementById('resultado-prompt').style.display = 'block';
}

function copiarPrompt() {
    const texto = document.getElementById('texto-prompt').innerText;
    navigator.clipboard.writeText(texto).then(() => {
        alert("Prompt copiado para a área de transferência!");
    });
}

