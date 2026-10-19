(()=>{
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const clear=()=>document.getElementById('page-transition')?.remove();
addEventListener('pageshow',clear);
document.addEventListener('click',event=>{
 const a=event.target.closest('a[data-transition]');
 if(!a||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||a.target==='_blank'||a.hasAttribute('download')||reduced.matches)return;
 const url=new URL(a.href,location.href);
 if(url.origin!==location.origin||url.pathname.replace(/\/$/,'')===location.pathname.replace(/\/$/,''))return;
 event.preventDefault();if(document.getElementById('page-transition'))return;
 const layer=document.createElement('div');layer.id='page-transition';layer.setAttribute('aria-hidden','true');
 layer.style.cssText='position:fixed;inset:0;z-index:10000;background:radial-gradient(ellipse at 60% 35%,#432648,#211426 75%);color:#f8f3f7;display:grid;place-items:center;opacity:0;transition:opacity 550ms ease;pointer-events:all';
 const box=document.createElement('div');box.style.cssText='max-width:700px;padding:35px;text-align:center';
 const logo=document.createElement('img');logo.src='/assets/logo-atitude-crista-transparente.png';logo.alt='';logo.width=105;logo.height=105;logo.style.cssText='object-fit:contain;margin-bottom:24px';
 const caption=document.createElement('p');caption.style.cssText='font:italic clamp(26px,5vw,42px)/1.25 Georgia;margin:0;color:#f8f3f7';
 caption.textContent=url.pathname.startsWith('/parceiros')?'Juntos, escrevemos o próximo capítulo.':url.pathname.startsWith('/loja')?'Um novo espaço está chegando.':url.pathname.startsWith('/espaco-de-beleza')?'Um momento para cuidar de você.':'Técnica, arte e fé.';
 const line=document.createElement('div');line.style.cssText='height:1px;width:90px;margin:28px auto 0;background:#e8c3ce;transform:scaleX(0);transform-origin:left;transition:transform 1100ms cubic-bezier(.2,.65,.3,1)';
 box.append(logo,caption,line);layer.append(box);document.body.append(layer);
 requestAnimationFrame(()=>requestAnimationFrame(()=>{layer.style.opacity='1';line.style.transform='scaleX(1)'}));
 setTimeout(()=>location.assign(url.href),1500);
});
})();
