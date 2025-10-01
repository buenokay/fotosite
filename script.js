// Dados de portfólio (amostras pequenas)
const portfolio = [
  { id: 'p1', titulo:'Retrato Editorial', tag:'retrato', preco: 350, cor:'#E8F0C2' },
  { id: 'p2', titulo:'Produto Minimalista', tag:'produto', preco: 420, cor:'#DCE7A3' },
  { id: 'p3', titulo:'Casal ao Entardecer', tag:'casal', preco: 600, cor:'#E7F1D1' },
  { id: 'p4', titulo:'Lifestyle Urbano', tag:'lifestyle', preco: 480, cor:'#E3EDC2' },
  { id: 'p5', titulo:'Close de Textura', tag:'produto', preco: 280, cor:'#D8E8A5' },
  { id: 'p6', titulo:'Retrato com Folhagens', tag:'retrato', preco: 390, cor:'#EAF3D4' },
];

// Ideias (referências pesquisáveis)
const ideias = [
  { id:'i1', titulo:'Retrato com luz natural lateral', tags:['luz natural','retrato','suave'], prompt:'Retrato em luz natural lateral, fundo neutro, tons terrosos, expressão relaxada, 50mm, abertura ampla.' },
  { id:'i2', titulo:'Produto em fundo minimalista', tags:['produto','minimalista'], prompt:'Foto de produto em fundo off-white, sombra suave, destaque para textura, composição central limpa.' },
  { id:'i3', titulo:'Golden hour ao ar livre', tags:['golden hour','exterior','casal'], prompt:'Casal ao pôr do sol, contraluz, bokeh quente, roupas em tons oliva e bege, movimento leve.' },
  { id:'i4', titulo:'Lifestyle com café', tags:['lifestyle','cotidiano'], prompt:'Cena de lifestyle em cafeteria, luz de janela, copo de café em foco, ambiente aconchegante e natural.' },
  { id:'i5', titulo:'Detalhe de mãos e produto', tags:['produto','close'], prompt:'Close das mãos segurando o produto, fundo desfocado, atenção a pele e textura, paleta orgânica.' },
  { id:'i6', titulo:'Retrato com folhagens', tags:['retrato','natureza'], prompt:'Retrato suave parcialmente encoberto por folhas, jogo de luz e sombra, sensação orgânica.' },
];

// Utilidades
const money = (v) => v.toLocaleString('pt-BR',{style:'currency', currency:'BRL'});

// Referências DOM
const tabPortfolio = document.getElementById('tabPortfolio');
const tabIdeias = document.getElementById('tabIdeias');
const sectionPortfolio = document.getElementById('sectionPortfolio');
const sectionIdeias = document.getElementById('sectionIdeias');
const gridPortfolio = document.getElementById('gridPortfolio');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalTag = document.getElementById('modalTag');
const modalArt = document.getElementById('modalArt');
const modalPrice = document.getElementById('modalPrice');
const modalClose = document.getElementById('modalClose');
const btnOrcamento = document.getElementById('btnOrcamento');
const btnVerMais = document.getElementById('btnVerMais');
const btnCopiarBrief = document.getElementById('btnCopiarBrief');
const btnContato = document.getElementById('btnContato');
const toast = document.getElementById('toast');
const searchIdeas = document.getElementById('searchIdeas');
const clearSearch = document.getElementById('clearSearch');
const listIdeias = document.getElementById('listIdeias');

// Estilos dinâmicos de tabs/chips
function setActiveTab(btn){
  document.querySelectorAll('.tab-btn').forEach(b=>{
    if(b===btn){
      b.classList.add('bg-white','text-[var(--ink)]','shadow');
      b.classList.remove('text-white');
    } else {
      b.classList.remove('bg-white','text-[var(--ink)]','shadow');
      b.classList.add('text-white');
    }
  });
}

function setActiveChip(target){
  document.querySelectorAll('.chip').forEach(c=>{
    if(c===target){
      c.classList.add('bg-[var(--sand)]','text-[var(--ink)]');
      c.classList.remove('bg-white/15','text-white');
    } else {
      c.classList.remove('bg-[var(--sand)]','text-[var(--ink)]');
      c.classList.add('bg-white/15','text-white');
    }
  });
}

// Render SVG "foto" abstrata
function photoSVG(accent='#E8F0C2'){
  const leaf = '#6B8E23';
  return `
    <svg viewBox="0 0 320 240" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${accent}"/>
          <stop offset="100%" stop-color="#cddda0"/>
        </linearGradient>
      </defs>
      <rect width="320" height="240" fill="url(#g)"/>
      <circle cx="70" cy="65" r="28" fill="white" opacity="0.85"/>
      <path d="M0,210 L80,155 L140,195 L210,140 L320,210 L320,240 L0,240 Z" fill="${leaf}" opacity="0.28"/>
      <path d="M0,200 C60,170 110,220 160,190 C210,160 260,210 320,180 L320,240 L0,240 Z" fill="#3f4b1d" opacity="0.20"/>
      <rect x="16" y="16" width="288" height="208" rx="14" ry="14" stroke="${leaf}" stroke-width="3" fill="transparent" opacity="0.35"/>
    </svg>
  `;
}

// Render cards do portfólio
function renderPortfolio(list){
  // Atualização seletiva: limpa e re-renderiza itens conforme filtro
  gridPortfolio.innerHTML = '';
  list.forEach(item=>{
    const card = document.createElement('div');
    card.className = 'pop bg-[var(--cream)] rounded-2xl overflow-hidden border border-black/5 soft-shadow';
    card.innerHTML = `
      <div class="w-full aspect-[4/3] bg-[var(--mint)]">${photoSVG(item.cor)}</div>
      <div class="p-4">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">${item.titulo}</h3>
          <span class="text-xs px-2 py-0.5 rounded-full bg-[var(--mint)] text-[var(--olive-dark)] capitalize">${item.tag}</span>
        </div>
        <div class="mt-2 flex items-center justify-between">
          <p class="text-[var(--olive-dark)] font-semibold">${money(item.preco)}</p>
          <div class="flex items-center gap-2">
            <button data-id="${item.id}" class="btn-detalhes text-sm">Detalhes</button>
            <button data-id="${item.id}" class="btn-favoritar text-sm">❤</button>
          </div>
        </div>
      </div>
    `;
    gridPortfolio.appendChild(card);
  });
}

// Render ideias
function renderIdeias(query=''){
  const q = query.trim().toLowerCase();
  const filtered = ideias.filter(i=>{
    const hay = (i.titulo+' '+i.tags.join(' ')+' '+i.prompt).toLowerCase();
    return hay.includes(q);
  });
  listIdeias.innerHTML = '';
  filtered.forEach(i=>{
    const row = document.createElement('div');
    row.className = 'pop bg-[var(--cream)] rounded-2xl p-3 border border-black/5 soft-shadow';
    row.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="shrink-0 w-12 h-12 rounded-xl bg-[var(--mint)] flex items-center justify-center">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#6B8E23" stroke-width="2"/>
            <path d="M8 12h8M12 8v8" stroke="#6B8E23" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="flex-1">
          <h4 class="font-semibold">${i.titulo}</h4>
          <p class="text-sm text-black/70 mt-1">${i.prompt}</p>
          <div class="flex flex-wrap gap-1 mt-2">
            ${i.tags.map(t=>`<span class="text-[10px] px-2 py-1 rounded-full bg-[var(--mint)]">${t}</span>`).join('')}
          </div>
          <div class="mt-3 flex items-center gap-2">
            <button data-p="${i.prompt}" class="btn-copiar text-xs">Copiar</button>
            <button data-q="${i.titulo}" class="btn-aplicar text-xs">Buscar similares</button>
          </div>
        </div>
      </div>
    `;
    listIdeias.appendChild(row);
  });

  if(filtered.length===0){
    const empty = document.createElement('div');
    empty.className = 'text-center text-white/90 bg-white/10 rounded-2xl p-6';
    empty.textContent = 'Nenhuma ideia encontrada. Tente outras palavras.';
    listIdeias.appendChild(empty);
  }
}

// Toast
let toastTimer;
function showToast(text='Copiado!'){
  const box = toast.querySelector('div');
  box.textContent = text;
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toast.classList.add('hidden'), 1400);
}

// Estado
let currentItem = null;
let favoritos = new Set();

// Inicialização
renderPortfolio(portfolio);
renderIdeias('');

// Tabs
tabPortfolio.addEventListener('click', ()=>{
  sectionPortfolio.classList.remove('hidden');
  sectionIdeias.classList.add('hidden');
  setActiveTab(tabPortfolio);
});
tabIdeias.addEventListener('click', ()=>{
  sectionIdeias.classList.remove('hidden');
  sectionPortfolio.classList.add('hidden');
  setActiveTab(tabIdeias);
});
setActiveTab(tabPortfolio); // padrão

// Chips de filtro
document.querySelectorAll('.chip').forEach(chip=>{
  chip.addEventListener('click', ()=>{
    setActiveChip(chip);
    const f = chip.getAttribute('data-filter');
    if(f==='tudo') renderPortfolio(portfolio);
    else renderPortfolio(portfolio.filter(p=>p.tag===f));
  });
});

// Delegação Portfólio: Detalhes e Favoritar
gridPortfolio.addEventListener('click', (e)=>{
  const btnDet = e.target.closest('.btn-detalhes');
  const btnFav = e.target.closest('.btn-favoritar');
  if(btnDet){
    const id = btnDet.getAttribute('data-id');
    const item = portfolio.find(p=>p.id===id);
    if(item){
      currentItem = item;
      modalTitle.textContent = item.titulo;
      modalTag.textContent = `Categoria: ${item.tag}`;
      modalPrice.textContent = money(item.preco);
      modalArt.innerHTML = photoSVG(item.cor);
      modal.classList.remove('hidden');
    }
  }
  if(btnFav){
    const id = btnFav.getAttribute('data-id');
    if(favoritos.has(id)){ favoritos.delete(id); btnFav.textContent='❤'; }
    else { favoritos.add(id); btnFav.textContent='💚'; }
  }
});

// Modal ações
modalClose.addEventListener('click', ()=> modal.classList.add('hidden'));
modal.addEventListener('click', (e)=> {
  if(e.target === modal) modal.classList.add('hidden');
});

btnOrcamento.addEventListener('click', ()=>{
  if(!currentItem) return;
  showToast('Solicitação registrada (demo)');
});

btnVerMais.addEventListener('click', ()=>{
  if(!currentItem) return;
  // Alterna para portfólio com filtro da tag atual
  modal.classList.add('hidden');
  sectionIdeias.classList.add('hidden');
  sectionPortfolio.classList.remove('hidden');
  setActiveTab(tabPortfolio);
  // Seleciona o chip correspondente
  const chip = Array.from(document.querySelectorAll('.chip')).find(c=>c.getAttribute('data-filter')===currentItem.tag);
  if(chip){ chip.click(); }
});

btnCopiarBrief.addEventListener('click', async ()=>{
  if(!currentItem) return;
  const texto = `Brief rápido — ${currentItem.titulo}\nEstilo: ${currentItem.tag}\nPaleta: verde oliva, tons terrosos\nEntrega: 5 fotos tratadas`;
  try{
    await navigator.clipboard.writeText(texto);
    showToast('Brief copiado!');
  }catch{
    showToast('Não foi possível copiar');
  }
});

// Contato (demo)
btnContato.addEventListener('click', ()=>{
  showToast('Contato de exemplo (demo)');
});

// Busca Ideias
let searchDebounce;
searchIdeas.addEventListener('input', ()=>{
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(()=> renderIdeias(searchIdeas.value), 160);
});
clearSearch.addEventListener('click', ()=>{
  searchIdeas.value='';
  renderIdeias('');
  searchIdeas.focus();
});

// Sugestões rápidas
document.querySelectorAll('.suggest').forEach(s=>{
  s.addEventListener('click', ()=>{
    const v = s.textContent.trim();
    searchIdeas.value = v;
    renderIdeias(v);
    setActiveTab(tabIdeias);
    sectionIdeias.classList.remove('hidden');
    sectionPortfolio.classList.add('hidden');
  });
});

// Delegação Ideias: Copiar / Buscar similares
listIdeias.addEventListener('click', async (e)=>{
  const btnCopy = e.target.closest('.btn-copiar');
  const btnApply = e.target.closest('.btn-aplicar');
  if(btnCopy){
    const text = btnCopy.getAttribute('data-p') || '';
    try{
      await navigator.clipboard.writeText(text);
      showToast('Ideia copiada!');
    }catch{
      showToast('Não foi possível copiar');
    }
  }
  if(btnApply){
    const q = btnApply.getAttribute('data-q') || '';
    searchIdeas.value = q;
    renderIdeias(q);
  }
});