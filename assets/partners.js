(()=>{
// Add only original company assets and approved URLs. No reconstructed logos.
const sponsors2026=[];
const grid=document.getElementById('sponsor-grid');
for(const sponsor of sponsors2026){const card=document.createElement(sponsor.approvedUrl?'a':'div');card.className='sponsor-card';card.title='Patrocinador Oficial - A Grande Jornada 2026';if(sponsor.approvedUrl){card.href=sponsor.approvedUrl;card.target='_blank';card.rel='noopener'}const image=document.createElement('img');image.src=sponsor.logo;image.alt=sponsor.name+' — patrocinador de A Grande Jornada 2026';image.loading='lazy';card.append(image);grid.append(card)}
if(sponsors2026.length){grid.hidden=false;document.getElementById('sponsor-pending').hidden=true}
document.querySelectorAll('[data-interest]').forEach(a=>a.addEventListener('click',()=>document.getElementById('partnership-interest').value=a.dataset.interest));
document.getElementById('partner-form').addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;const company=document.getElementById('company').value.trim(),name=document.getElementById('contact-name').value.trim(),error=document.getElementById('partner-error');error.textContent='';if(!company||!name){error.textContent='Preencha o nome da empresa e o seu nome.';return}const message='Olá! Conheci a área de patrocinadores no site do Studio de Dança Atitude Cristã e gostaria de receber mais informações sobre as possibilidades de parceria e patrocínio.\n\nEmpresa: '+company+'\nContato: '+name+'\nInteresse: '+document.getElementById('partnership-interest').value;window.open('https://wa.me/5517992212928?text='+encodeURIComponent(message),'_blank','noopener')});
})();
