(()=>{
// Add only original company assets and approved URLs. No reconstructed logos.
const sponsors2026=[];
const grid=document.getElementById('sponsor-grid');
for(const sponsor of sponsors2026){const card=document.createElement(sponsor.approvedUrl?'a':'div');card.className='sponsor-card';card.title='Patrocinador Oficial - A Grande Jornada 2026';if(sponsor.approvedUrl){card.href=sponsor.approvedUrl;card.target='_blank';card.rel='noopener'}const image=document.createElement('img');image.src=sponsor.logo;image.alt=sponsor.name+' — patrocinador de A Grande Jornada 2026';image.loading='lazy';card.append(image);grid.append(card)}
if(sponsors2026.length){grid.hidden=false;document.getElementById('sponsor-pending').hidden=true}
document.querySelectorAll('[data-interest]').forEach(a=>a.addEventListener('click',()=>document.getElementById('partnership-interest').value=a.dataset.interest));
// Update only with consolidated figures approved by the Studio. null means not supplied.
const impactFigures=[null,null,null,null,null];
document.querySelectorAll('[data-impact]').forEach(el=>{const n=impactFigures[Number(el.dataset.impact)];if(Number.isFinite(n)&&n>=0){el.textContent=new Intl.NumberFormat('pt-BR').format(n);el.removeAttribute('aria-label')}});
const archiveContent={
'2026':['2026 · A Grande Jornada','Conheça o espetáculo e o espaço dedicado às empresas que participam desta temporada.'],
'2027':['Temporada 2027','Ainda não há registros publicados para esta temporada.'],
'social':['Projetos sociais','Este espaço reunirá os registros dos projetos sociais e das empresas participantes, após confirmação pelo Studio.'],
'eventos':['Eventos','Os registros de eventos e de seus parceiros serão organizados aqui.'],
'institucional':['Parceiros institucionais','Este espaço é dedicado às empresas que apoiam o Studio com produtos, serviços, estrutura ou recursos. Os registros serão incluídos após confirmação.']
};
document.querySelectorAll('[data-archive]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-archive]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));const panel=document.getElementById('archive-panel'),item=archiveContent[button.dataset.archive];panel.replaceChildren();const heading=document.createElement('h3'),copy=document.createElement('p');heading.textContent=item[0];copy.textContent=item[1];panel.append(heading,copy);if(button.dataset.archive==='2026'){const link=document.createElement('a');link.href='#patrocinadores';link.className='text-link';link.textContent='Ver patrocinadores 2026 ↗';panel.append(link)}}));
document.getElementById('partner-form').addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;const company=document.getElementById('company').value.trim(),name=document.getElementById('contact-name').value.trim(),error=document.getElementById('partner-error');error.textContent='';if(!company||!name){error.textContent='Preencha o nome da empresa e o seu nome.';return}const message='Olá! Conheci a área de patrocinadores no site do Studio de Dança Atitude Cristã e gostaria de receber mais informações sobre as possibilidades de parceria e patrocínio.\n\nEmpresa: '+company+'\nContato: '+name+'\nInteresse: '+document.getElementById('partnership-interest').value;window.open('https://wa.me/5517992212928?text='+encodeURIComponent(message),'_blank','noopener')});
})();
