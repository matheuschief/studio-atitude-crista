(() => {
  'use strict';
  const categories = {roupas:'Roupas', perfumaria:'Perfumaria', acessorios:'Acessórios', leitura:'Bíblias e livros'};
  const photo = (file, alt) => ({src:`/assets/loja/${file}.webp`, alt});
  const products = [
    {id:'AC01',name:'Camiseta Fé que Dança',category:'roupas',description:'Estampa nas costas com a frase “Fé que dança”. Consulte os tamanhos disponíveis.',photos:[photo('camiseta-fe','Camiseta roxa com estampa Fé que Dança nas costas.')]},
    {id:'AC02',name:'Camiseta Foi por Você',category:'roupas',description:'Modelo preto com estampa nas costas em rosa e branco.',photos:[photo('camiseta-voce','Camiseta preta com estampa de cruz e a frase Foi por Você nas costas.')]},
    {id:'AC03',name:'Camiseta Cultura do Reino',category:'roupas',description:'Modelo branco com arte em tons de roxo nas costas.',photos:[photo('camiseta-cultura','Vista das costas de uma camiseta branca com arte roxa e a frase Cultura do Reino.')]},
    {id:'AC04',name:'Camiseta Arte que Adora',category:'roupas',description:'Modelo marrom com mensagem estampada nas costas. Consulte tamanhos com a equipe.',photos:[photo('camiseta-arte','Vista das costas de uma camiseta marrom com a frase Arte que Adora.')]},
    {id:'AC05',name:'Camiseta Jesus',category:'roupas',description:'Camiseta preta com a palavra Jesus estampada na frente.',photos:[photo('camiseta-jesus','Camiseta preta no cabide com estampa Jesus em destaque.')]},
    {id:'AC06',name:'Camiseta Escolhida',category:'roupas',description:'Modelo em tom claro com estampa floral e a palavra Escolhida.',photos:[photo('camiseta-escolhida','Camiseta clara com a palavra Escolhida e desenho de flores.')]},
    {id:'AC07',name:'Camisetas lisas',category:'roupas',description:'Veja as fotos dos modelos marrom, bege e rosa. Informe a cor e o tamanho de interesse para consultar o estoque.',photos:[photo('camiseta-lisa-marrom','Camiseta lisa marrom no cabide.'),photo('camiseta-lisa-bege','Camiseta lisa bege no cabide.'),photo('camiseta-lisa-rosa','Camiseta lisa rosa no cabide.')]},
    {id:'AC08',name:'Regata cinza',category:'roupas',description:'Modelo sem mangas em cinza. Consulte os tamanhos disponíveis.',photos:[photo('regata','Regata cinza no cabide.')]},
    {id:'AC09',name:'Conjunto infantil',category:'roupas',description:'Conjunto com blusa estampada, detalhe de laço rosa e shorts. Consulte os tamanhos.',photos:[photo('conjunto-infantil','Conjunto infantil com blusa de estampa colorida, laço e shorts rosa.')]},
    {id:'AC10',name:'Camiseta Jesus, o Maior Amor',category:'roupas',description:'Modelo em tom vinho com mensagem estampada na frente.',photos:[photo('camiseta-amor','Camiseta em tom vinho com a frase Jesus, o Maior Amor.')]},
    {id:'AC11',name:'Bem Me Quer',category:'perfumaria',description:'Confira a apresentação na foto. Consulte o valor atual e a disponibilidade.',photos:[photo('perfume-bem-me-quer','Frasco e embalagem rosa e amarela de Bem Me Quer, com etiqueta fotografada na caixa.')]},
    {id:'AC12',name:'Fléur Rosé',category:'perfumaria',description:'Frasco e embalagem fotografados na loja. Consulte os detalhes com a equipe.',photos:[photo('perfume-fleur','Frasco rosa de Fléur Rosé sobre a embalagem preta.')]},
    {id:'AC13',name:'Air Altitude',category:'perfumaria',description:'Modelo da linha Air. Consulte o valor e a apresentação disponíveis.',photos:[photo('perfume-air','Frasco verde com identificação Air Altitude.')]},
    {id:'AC14',name:'Larissa Manoela Laços',category:'perfumaria',description:'Confira o modelo na foto e consulte a equipe antes de comprar.',photos:[photo('perfume-lacos','Frasco de Larissa Manoela Laços com detalhe de laço preto.')]},
    {id:'AC15',name:'Relógios',category:'acessorios',description:'Uma seleção dos modelos expostos na loja. Informe o estilo de que você gostou para consultar as opções.',photos:[photo('relogios','Relógios em caixas de exposição, com modelos em diferentes cores.')]},
    {id:'AC16',name:'Bonés com mensagens',category:'acessorios',description:'Modelos com bordados e mensagens cristãs. Consulte as cores e as peças disponíveis.',photos:[photo('bones','Expositor com bonés de diferentes cores e bordados com mensagens cristãs.')]},
    {id:'AC17',name:'Meias Atitude Cristã',category:'acessorios',description:'Modelos com a identidade do Studio. Consulte cores e numerações.',photos:[photo('meias','Meias do Studio Atitude Cristã em branco, preto e rosa.')]},
    {id:'AC18',name:'Bíblias',category:'leitura',description:'Diferentes capas e apresentações na loja. Consulte as versões, os valores e os modelos disponíveis.',photos:[photo('biblias','Bíblias com diferentes capas expostas em uma prateleira.')]},
    {id:'AC19',name:'Livros e devocionais',category:'leitura',description:'Opções de leitura e publicações infantis. A equipe ajuda a encontrar o título de interesse.',photos:[photo('livros','Livros e publicações infantis em exposição na loja.')]}
  ];
  const $ = id => document.getElementById(id);
  const grid = $('shop-products'), productDialog = $('shop-product-dialog'), cartDialog = $('shop-cart-dialog');
  const cart = [];
  let selectedProduct = null, activeCategory = 'all';
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function showPhoto(product,index) {
    $('product-image').src = product.photos[index].src;
    $('product-image').alt = product.photos[index].alt;
    [...$('product-thumbnails').children].forEach((button,i) => button.setAttribute('aria-pressed',String(i === index)));
  }
  function openProduct(product) {
    selectedProduct = product;
    $('product-title').textContent = product.name;
    $('product-category').textContent = categories[product.category];
    $('product-description').textContent = product.description;
    $('product-code').textContent = `Referência para atendimento: ${product.id}`;
    $('product-quantity').value = '1'; $('product-preference').value = '';
    $('product-preference').placeholder = product.category === 'roupas' ? 'Tamanho, cor ou modelo de interesse' : 'Modelo ou detalhe de interesse';
    const thumbnails = $('product-thumbnails'); thumbnails.replaceChildren();
    product.photos.forEach((image,index) => {
      const button = element('button'); button.type = 'button'; button.setAttribute('aria-label',`Ver foto ${index+1}: ${image.alt}`);
      const thumb = element('img'); thumb.src = image.src; thumb.alt = ''; thumb.loading = 'lazy';
      button.append(thumb); button.addEventListener('click',() => showPhoto(product,index)); thumbnails.append(button);
    });
    thumbnails.hidden = product.photos.length < 2;
    showPhoto(product,0); productDialog.showModal();
  }
  function renderProducts() {
    const term = normalize($('shop-search').value.trim());
    const visible = products.filter(product => (activeCategory === 'all' || product.category === activeCategory) && normalize(`${product.name} ${categories[product.category]} ${product.description}`).includes(term));
    grid.replaceChildren();
    visible.forEach(product => {
      const card = element('article','shop-card'); card.id = `produto-${product.id.toLowerCase()}`;
      const imageButton = element('button','shop-card-image'); imageButton.type = 'button'; imageButton.setAttribute('aria-label',`Ver detalhes de ${product.name}`);
      const image = element('img'); image.src = product.photos[0].src; image.alt = product.photos[0].alt;
      image.width = 700; image.height = 900; image.loading = 'lazy'; image.decoding = 'async'; imageButton.append(image);
      if (product.photos.length > 1) imageButton.append(element('span','shop-card-gallery-tag',`${product.photos.length} fotos`));
      imageButton.addEventListener('click',() => openProduct(product));
      const action = element('button','button','Ver e escolher'); action.type = 'button'; action.setAttribute('aria-label',`Ver e escolher: ${product.name}`); action.addEventListener('click',() => openProduct(product));
      card.append(imageButton,element('span','shop-card-category',categories[product.category]),element('h3','',product.name),element('p','',product.description),element('p','shop-card-price','Consulte valores e disponibilidade'),action); grid.append(card);
    });
    $('catalog-count').textContent = `${visible.length} ${visible.length === 1 ? 'produto na vitrine' : 'produtos na vitrine'}`;
    $('shop-empty').hidden = visible.length > 0;
  }
  function message() {
    const lines = ['Olá! Vim pela loja do Espaço Moda Atitude Cristã e gostaria de consultar estes produtos:',''];
    cart.forEach(item => {lines.push(`• ${item.quantity} × ${item.product.name} (ref. ${item.product.id})`); if (item.preference) lines.push(`  Preferências: ${item.preference}`);});
    lines.push('','Podem confirmar os valores, tamanhos/modelos disponíveis e as condições da compra?','','Vitrine: https://studio-atitude-crista.vercel.app/loja/');
    return lines.join('\n');
  }
  function renderCart() {
    const count = cart.reduce((sum,item) => sum + item.quantity,0);
    $('shop-cart-count').textContent = String(count); $('shop-cart-count').setAttribute('aria-label',`${count} ${count === 1 ? 'item' : 'itens'}`);
    const items = $('shop-cart-items'); items.replaceChildren();
    cart.forEach((item,index) => {
      const row = element('article','cart-row'), image = element('img'); image.src = item.product.photos[0].src; image.alt = ''; image.width = 62; image.height = 82;
      const detail = element('div'); detail.append(element('h3','',item.product.name),element('p','',`Quantidade: ${item.quantity} · Ref. ${item.product.id}`));
      if (item.preference) detail.append(element('p','',`Preferências: ${item.preference}`));
      const remove = element('button','','Remover'); remove.type = 'button'; remove.setAttribute('aria-label',`Remover ${item.product.name} do pedido`);
      remove.addEventListener('click',() => {const name = item.product.name; cart.splice(index,1); renderCart(); $('shop-announcement').textContent = `${name} removido do pedido.`; ($('shop-cart-items').querySelector('button') || cartDialog.querySelector('.dialog-close')).focus();});
      detail.append(remove); row.append(image,detail); items.append(row);
    });
    $('shop-cart-empty').hidden = cart.length > 0; $('shop-cart-actions').hidden = cart.length === 0;
    if (cart.length) $('shop-whatsapp').href = `https://wa.me/5517992212928?text=${encodeURIComponent(message())}`;
    else $('shop-whatsapp').removeAttribute('href');
  }
  document.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click',() => {activeCategory = button.dataset.category; document.querySelectorAll('[data-category]').forEach(filter => filter.setAttribute('aria-pressed',String(filter === button))); renderProducts();}));
  $('shop-search').addEventListener('input',renderProducts);
  $('product-form').addEventListener('submit',event => {
    event.preventDefault(); if (!selectedProduct || !$('product-form').reportValidity()) return;
    const quantity = Number($('product-quantity').value); if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) return;
    const preference = $('product-preference').value.trim().replace(/\s+/g,' ').slice(0,160);
    const existing = cart.find(item => item.product.id === selectedProduct.id && item.preference === preference);
    if (existing) existing.quantity += quantity; else cart.push({product:selectedProduct,quantity,preference});
    renderCart(); productDialog.close(); $('shop-announcement').textContent = `${selectedProduct.name} adicionado ao pedido.`; $('shop-cart-open').focus();
  });
  $('shop-cart-open').addEventListener('click',() => {renderCart(); cartDialog.showModal();});
  document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click',() => $(button.dataset.close).close()));
  renderProducts(); renderCart();
})();
